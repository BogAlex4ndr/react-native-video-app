import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { customButtonPorps } from './CustomButton.type'

const CustomButton: FC<customButtonPorps> = ({
    title,
    extraClassName,
    handlePress,
    isLoading,
    textStyle
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary-100 rounded-xl min-h-[60px] justify-center items-center p-2 min-w-[60px] 
            ${extraClassName} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({})