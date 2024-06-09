import { FlatList } from 'react-native'
import React, { useState } from 'react'


import TrandingItem from './TrandingItem/TrandingItem'

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0])

    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            horizontal
            renderItem={({ item }) => (
                <TrandingItem activeItem={activeItem} item={item} />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170, y: 0 }}
        />
    )
}

export default Trending