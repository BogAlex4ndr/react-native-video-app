import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllPosts, getLatestPosts, logOut } from '@/lib/appwrite'
import CustomButton from '@/components/CustomButton/CustomButton'
import { useGlobalContext } from '@/context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput/SearchInput'
import Trending from '@/components/Trending/Trending'
import EmptyState from '@/components/EmptyState/EmptyState'

import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '@/components/VideoCard/VideoCard'

const Home = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const [refreshing, setRefreshing] = useState(false)
    const { data: posts, refetch } = useAppwrite(getAllPosts)
    const { data: latestPosts } = useAppwrite(getLatestPosts)

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false);
    }

    return (
        <SafeAreaView className='w-full h-full bg-primary'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<VideoCard video={item} />)}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome Back
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    {user?.username}
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <SearchInput
                            placeholder={'Search here'}
                            initialQuery={''}
                        />
                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-lg font-pregular text-gray-100 mb-3">
                                Latest Videos
                            </Text>

                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>)}
                ListEmptyComponent={() => (
                    <EmptyState
                        title={'No Videos Found'}
                        subtitle={"be the first one to upload the video"}
                    />)
                }
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

        </SafeAreaView>
    )
}

export default Home