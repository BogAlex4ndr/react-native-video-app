import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { openPicker } from '@/helpers/openPicker'
import { Image } from 'react-native'
import { icons } from '@/constants'

const ImageUploadBlock = (form, setForm) => {
    return (
        <View className='mt-7 space-y-2 justify-center items-center'>
            <Text className='text-white text-xl font-psemibold'>Thumbnail Image</Text>
            <View className='flex-row gap-2 px-5'>
                <View className='w-1/2'>
                    <TouchableOpacity className='w-full' onPress={() => openPicker('image', 'library', setForm, form)}>
                        {form.thumbnail
                            ? (<Image source={{ uri: form.thumbnail.uri }} resizeMode='cover' className='w-full h-64 rounded-2xl' />)
                            : (<View
                                className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                                <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                                <Text className='text-white'>Gallery</Text>
                            </View>)}
                    </TouchableOpacity>
                </View>
                <View className='w-1/2'>
                    <TouchableOpacity className='w-full' onPress={() => openPicker('image', 'camera', setForm, form)}>
                        {form.thumbnail
                            ? (<Image source={{ uri: form.thumbnail.uri }} resizeMode='cover' className='w-full h-64 rounded-2xl' />)
                            : (<View
                                className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                                <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                                <Text className='text-white'>Camera</Text>
                            </View>)}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ImageUploadBlock