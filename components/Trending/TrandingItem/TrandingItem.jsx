import { TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
    from: {
        scale: 0.9,
    },
    to: {
        scale: 1.1,
    },
};

const zoomOut = {
    from: {
        scale: 1.1,
    },
    to: {
        scale: 0.9,
    },
};

const TrandingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false)
    
    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {play
                ? (
                    <Video
                        source={{ uri: item.video }}
                        className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
                        resizeMode={ResizeMode.COVER}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                              setPlay(false);
                            }
                          }}
                    />
                )
                :
                (
                    <TouchableOpacity
                        className='relative justify-center items-center'
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}
                    >
                        <ImageBackground
                            source={{ uri: item.tumbnail }}
                            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black'
                            resizeMode='cover'
                        />
                        <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />

                    </TouchableOpacity>
                )}
        </Animatable.View>
    )
}

export default TrandingItem;