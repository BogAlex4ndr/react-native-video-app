import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { deleteVideo } from '@/lib/appwrite'

const VideoCard = ({ video: { $id, video, tumbnail, title, thumbnail_id, video_id, creator: { username, avatar } } }) => {

    console.log($id)
    const [play, setPlay] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    console.log("THUMBNAIL ID",thumbnail_id)

    console.log("Video ID",video_id)

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-satart'>
                <View className=' justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-secondary' numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className='text-white text-xs font-pregular' numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <TouchableOpacity onPress={() => setShowPopUp(!showPopUp)}>
                        <Image source={icons.menu} className='w-4 h-6 border border-red-500' resizeMode='contain' />
                        </TouchableOpacity>
                </View>
               {showPopUp && 
               <View className='absolute right-6 top-2 p-4 bg-black-100'>
                    <TouchableOpacity onPress={() => deleteVideo($id,thumbnail_id,video_id)}>
                        <Text className='text-white'>Delete Video</Text>
                    </TouchableOpacity>
                </View>}
               
            </View>

            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-full h-60 rounded-xl mt-3 bg-white/10"
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image source={{ uri: tumbnail }} className='w-full h-full rounded-xl mt-5' resizeMode='cover' />
                    <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
                </TouchableOpacity>)}
        </View>
    )
}

export default VideoCard