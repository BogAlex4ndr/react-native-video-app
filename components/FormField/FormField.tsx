import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { FC, useState } from 'react'
import { icons, images } from '@/constants'
import { FormFieldProps } from './FormField.type'

const FormField: FC<FormFieldProps> = ({ title, value, extraStyle, handleChangeValue, keyboardType, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 w-full ${extraStyle}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
            <View className=' w-full h-16 bg-black-100 rounded-xl border-black-200 border-2 px-4 focus:border-secondary flex-row items-center'>
                <TextInput
                    className='flex-1 text-white font-pregular text-base w-full h-full'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeValue}
                    secureTextEntry={title === 'password' && !showPassword}
                />
                {title === 'password' &&
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className='w-8 h-8'
                            resizeMode='cover'
                        />
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default FormField