import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subtitle, containerStyle, textStyle }) => {
    return (
        <View className={` ${containerStyle}`}>
            <Text className={`text-white text-center font-psemibold ${textStyle}`}>{title}</Text>
            <Text className={`text-white text-sm text-center font-pregular`}>{subtitle}</Text>
        </View>
    )
}

export default InfoBox