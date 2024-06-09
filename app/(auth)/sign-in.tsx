import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField/FormField'
import CustomButton from '@/components/CustomButton/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const SignIn = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isSubmitting, setSubmitting] = useState(false);

    const submitForm = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields')
        }
        setSubmitting(true)
        try {
            await signIn(form.email, form.password)
            const result = getCurrentUser()
            setUser(result)
            setIsLoggedIn(true)

            router.replace('/home')
        } catch (error) {
            Alert.alert(error)
        }
        finally {
            setSubmitting(false)
        }
    }
    return (
        <SafeAreaView className='bg-primary h-full '>
            <ScrollView>
                <View className='w-full h-full justify-center items-center px-4 my-6'>
                    <Link className=' h-[50px]' href={'/'}><Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' /></Link>
                    <Text className='text-2xl font-psemibold text-white mt-10'>Login to Aora</Text>
                    <FormField
                        title="email"
                        placeholder='enter email'
                        value={form.email}
                        handleChangeValue={(e: string) => setForm({ ...form, email: e })}
                        extraStyle={'mt-7 max-w-[80vw]'}
                        keyboardType='email-address'
                    />
                    <FormField
                        title="password"
                        placeholder='enter password'
                        value={form.password}
                        handleChangeValue={(e: string) => setForm({ ...form, password: e })}
                        extraStyle={'mt-7 max-w-[80vw]'}
                        keyboardType='password'
                    />

                    <CustomButton
                        title={'Sign In'}
                        extraClassName='mt-8 w-[80vw]'
                        handlePress={submitForm}
                        isLoading={isSubmitting}
                    />
                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn