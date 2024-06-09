import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '@/components/CustomButton/CustomButton'
import { StatusBar } from 'expo-status-bar'
import { logOut } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Welcome = () => {
  const { isLoading, isLoggedIn } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  console.log(isLoading, isLoggedIn)
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full flex justify-center items-center h-[85vh] px-4'>
          <Image
            className='w-[130px] h-[80px]'
            resizeMode='contain'
            source={images.logo} />
          <Image
            className='max-w-[380px] w-full max-h-[300px]'
            resizeMode='contain'
            source={images.cards} />
          <View className='relative mt-5'>
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
              source={images.path} />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton extraClassName={'mt-5'} title={'sign in'} handlePress={() => router.push('/sign-in')} />
        </View>

      </ScrollView>
      <StatusBar backgroundColor="#161622" style='light' />
    </SafeAreaView>
  )
}

export default Welcome