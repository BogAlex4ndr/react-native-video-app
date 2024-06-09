import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.alex.reactnativeAndroid-app",
    projetId: "665c6f00003a258647a6",
    databaseId: "665c7214002aa16aa3e8",
    usersCollectionId: "665c724b000a97fe4227",
    videoCollectionId: "665c72c2003b94587f51",
    storageId: "665c75d40018955d72c7"
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

        console.log("FILEURL", fileUrl)

        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }

}

export const createVideo = async (form) => {
try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, 'image'),
        uploadFile(form.video, 'video'),
    ])

    const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
        title: form.title,
        tumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
    })

    return newPost;
    
} catch (error) {
    throw new Error(error)
}
}
