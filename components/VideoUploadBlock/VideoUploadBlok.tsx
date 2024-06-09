import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av'
import { openPicker } from '@/helpers/openPicker'

const VideoUploadBlok = (form, setForm) => {
    return (
        <View className='mt-7 space-y-2 justify-center items-center px-5'>
            <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
            <View className='w-full flex-row gap-2'>
                <TouchableOpacity className='w-1/2' onPress={() => openPicker('video', 'library', setForm, form)}>
                    {form.video
                        ? (<Video
                            source={{ uri: form.video.uri }}
                            className='w-full h-64 rounded-2xl'
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                        />)
                        : (<View
                            className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                            <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                            </View>
                            <Text className='text-white'>Gallery</Text>
                        </View>)}
                </TouchableOpacity>
                <TouchableOpacity className='w-1/2' onPress={() => openPicker('video', 'camera', setForm, form)}>
                    {form.video
                        ? (<Video
                            source={{ uri: form.video.uri }}
                            className='w-full h-64 rounded-2xl'
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                        />)
                        : (<View
                            className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                            <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                            </View>
                            <Text className='text-white'>Camera</Text>
                        </View>)}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default VideoUploadBlok