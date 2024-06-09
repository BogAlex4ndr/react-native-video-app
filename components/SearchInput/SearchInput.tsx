import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { FC, useState } from 'react'
import { icons, images } from '@/constants'
import { router, usePathname } from 'expo-router'
import { SearchInputProps } from './SearchInput.type'

const SearchInput: FC<SearchInputProps> = ({ initialQuery, placeholder }) => {

    const pathName = usePathname()
    const [query, setQuery] = useState(initialQuery || '')

    let StringQuery = query.toString()

    return (

        <View className=' w-full h-16 bg-black-100 rounded-xl border-black-200 border-2 px-4 focus:border-secondary flex-row items-center space-x-4'>
            <TextInput
                className='flex-1 text-white font-pregular text-base w-full h-full'
                value={StringQuery}
                placeholder={placeholder}
                placeholderTextColor='#7b7b8b'
                onChangeText={(e) => setQuery(e.toString())}
            />
            <TouchableOpacity onPress={() => {
                if (!query) {
                    return Alert.alert('Missing quert', 'please input somethin')
                }
                if (pathName.startsWith('/search')) {
                    router.setParams({ StringQuery })
                } else {
                    router.push(`/search/${query}`)
                }
            }}>
                <Image className='w-5 h-5' resizeMode='contain' source={icons.search} />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput