import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: process.env.ENDPOINT,
    platform: process.env.PLATFORM,
    projetId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
    usersCollectionId: process.env.USERS_COLLECTION_ID,
    videoCollectionId: process.env.VIDEO_COLLECTION_ID,
    storageId: process.env.STORAGE_ID,
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projetId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

console.log("STORAGE",storage)
// Register User

export const createUser = async (username, email, password) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw Error;

        const avatarUrl = avatar.getInitials(username)

        await signIn(email,password)

       const newUser =  await databases.createDocument(
        config.databaseId,
        config.usersCollectionId, 
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
       })
       return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
try {
    const session = await account.createEmailPasswordSession(email,password)
    return session;
} catch (error) {
    throw new Error(error);
}
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId, 
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
} 

export const logOut = async () => {
    try {
        const session = await account.deleteSession("current");
        console.log("logOut", session)
        
        return session;
      } catch (error) {
        throw new Error(error);
      }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId,config.videoCollectionId);

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}
export const getSearchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    console.log("FILE ID", fileId)
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(config.storageId, fileId)
            
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
        } else {
            throw new Error('invalid file type')
        }

        if (!fileUrl) {
            throw Error;
        }

        return fileUrl; 
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async (file, type) => {



    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    console.log("FILE", file)

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset,
        )

        console.log("UPLOADED FILE",uploadedFile)
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        const fileId = uploadedFile.$id;

        console.log("FILEURL", fileUrl);

        return { fileUrl, fileId };
    } catch (error) {
        throw new Error(error)
    }

}

export const createVideo = async (form) => {
try {
    const [{ fileUrl: thumbnailUrl, fileId: thumbnailId }, { fileUrl: videoUrl, fileId: videoId }] = await Promise.all([
        uploadFile(form.thumbnail, 'image'),
        uploadFile(form.video, 'video'),
    ]);

    console.log("Thumbnail URL:", thumbnailUrl);
    console.log("Thumbnail ID:", thumbnailId);
    console.log("Video URL:", videoUrl);
    console.log("Video ID:", videoId);

    const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
        title: form.title,
        tumbnail: thumbnailUrl,      // Note the correct spelling "thumbnail"
        thumbnail_id: thumbnailId,
        video: videoUrl,
        video_id: videoId,
        creator: form.userId,
    });

    return newPost
    
} catch (error) {
    throw new Error(error)
}
}

export const deleteFile = async (fileId) => {
    
    const result = await storage.deleteFile(
        config.storageId, // bucketId
        fileId // fileId
    );
}

export const deleteVideo = async (documentId, thumbnailId, videoId) => {

    console.log("DOCUMENT",documentId)
    
    const result = await databases.deleteDocument(
        config.databaseId, // databaseId
        config.videoCollectionId, // collectionId
        documentId // documentId
    );

    await Promise.all([
        deleteFile(thumbnailId),
        deleteFile(videoId)
    ]);
    console.log(result)

    return result;

}