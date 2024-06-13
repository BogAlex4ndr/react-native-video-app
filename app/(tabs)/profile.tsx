import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getSearchPosts, getUserPosts, logOut } from "../../lib/appwrite";
import VideoCard from "@/components/VideoCard/VideoCard";
import SearchInput from "@/components/SearchInput/SearchInput";
import EmptyState from "@/components/EmptyState/EmptyState";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox/InfoBox";


const Profile = () => {
    const [refreshing, setRefreshing] = useState(false)
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false);
    }


    const logout = async () => {
        await logOut()
        setUser(null)
        setIsLoggedIn(false)

        router.replace('/sign-in')
    }

    const sortedPosts = posts.sort((a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={sortedPosts}
                keyExtractor={(item) => item?.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="flex mt-6 mb-12 px-4 w-full justify-center items-center">
                            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
                                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
                            </TouchableOpacity>
                            <View className="w-24 h-24 border-2 border-secondary-100 rounded-lg justify-center items-center bg-secondary-100">
                                <Image
                                    source={{ uri: user?.avatar }}
                                    className="w-[90%] h-[90%] rounded-md"
                                    resizeMode="contain"
                                />
                            </View>
                            <View>
                                <InfoBox title={user?.username} subtitle='' containerStyle='mt-5' textStyle='text-xl' />
                            </View>
                            <View className="flex-row justify-center items-center">
                                <InfoBox title={posts.length || 0} subtitle='posts' containerStyle='mr-10' textStyle='text-xl' />
                                <InfoBox title='1.2k' subtitle='followers' containerStyle='ml-10' textStyle='text-xl' />
                            </View>
                        </View>
                    </>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

export default Profile;