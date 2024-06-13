import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {
    const { user } = useGlobalContext()
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        video: null,
        thumbnail: null,
    })

    const openPicker = async (selectType: string, source: string) => {
        let result;

        if (source === 'library') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
                quality: 1,
            });
        } else if (source === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
                quality: 1,
            });
        }

        if (!result.canceled) {
            if (selectType === 'image') {
                setForm({ ...form, thumbnail: result.assets[0] });
            }
            if (selectType === 'video') {
                setForm({ ...form, video: result.assets[0] });
            }
        } else {
            setTimeout(() => {
                Alert.alert('No Document Selected', JSON.stringify(result, null, 2));
            }, 100);
        }
    };

    const submit = async () => {

        if (!form.title || !form.thumbnail || !form.video) {
            Alert.alert('Please fill in all the fields')
        }

        setUploading(true)

        try {
            await createVideo({ ...form, userId: user.$id })
            Alert.alert('Post uploaded successfully')
            router.push('/home')
        } catch (error) {
            Alert.alert('error', error.message)

        } finally {
            setForm({
                title: '',
                video: null,
                thumbnail: null,
            })
            setUploading(false)
        }

    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView className='px-4 my-6'>
                <Text className='text-white text-xl font-psemibold'>Upload Video</Text>
                <FormField
                    title={'video title'}
                    value={form.title}
                    extraStyle='mt-10'
                    handleChangeValue={(e: string) => setForm({ ...form, title: e })}
                    placeholder='Add title'
                />
                <View className='mt-7 space-y-2 justify-center items-center'>
                    <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>

                    {form.video
                        ? (<Video
                            source={{ uri: form.video.uri }}
                            className='w-full h-64 rounded-2xl'
                            useNativeControls
                            resizeMode={ResizeMode.COVER}
                            isLooping
                        />)
                        : (<View className='flex-row w-full justify-center items-center gap-2 p-2'>
                            <TouchableOpacity className='w-1/2' onPress={() => openPicker('video', 'library')}>
                                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                                    <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                        <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />

                                    </View>
                                    <Text className='text-white p-2 font-psemibold'>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity className='w-1/2' onPress={() => openPicker('video', 'camera')}>
                                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                                    <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                        <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />

                                    </View>
                                    <Text className='text-white p-2 font-psemibold'>Camera</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        )}

                </View>
                <View className='mt-7 space-y-2'>
                    <Text className='text-white text-xl font-psemibold'>Thumbnail Image</Text>
                    <View className='flex-row w-full justify-center items-center gap-2 p-2'>
                        {form.thumbnail
                            ? (<>
                                <Image source={{ uri: form.thumbnail.uri }} resizeMode='cover' className='w-full h-64 rounded-2xl' />
                            </>)
                            : (
                                <>
                                    <TouchableOpacity className='w-1/2' onPress={() => openPicker('image', 'library')}>
                                        <View
                                            className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                                            <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                                            <Text className='text-white font-psemibold'>Gallery</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity className='w-1/2' onPress={() => openPicker('image', 'camera')}>
                                        <View
                                            className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center' >
                                            <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                                            <Text className='text-white font-psemibold'>Camera</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )}
                    </View>
                </View>
                <CustomButton
                    title='Submit & Publish'
                    handlePress={submit}
                    extraClassName='mt-7'
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create