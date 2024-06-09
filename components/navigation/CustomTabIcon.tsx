import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons.js'

const CustomTabBarIcon = ({ icon, name, color, focused }): any => {
    return (
        <View className='justify-center items-center gap-2 py-2'>
            <Image
                resizeMode='contain'
                source={icon}
                tintColor={color}
                className='w-6 h-6' />
            <Text
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                style={{ color: color }}>
                {name}
            </Text>
        </View>
    )
}

export default CustomTabBarIcon