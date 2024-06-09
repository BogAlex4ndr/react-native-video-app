import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getSearchPosts } from "../../lib/appwrite";
import VideoCard from "@/components/VideoCard/VideoCard";
import SearchInput from "@/components/SearchInput/SearchInput";
import EmptyState from "@/components/EmptyState/EmptyState";


const Search = () => {
    const { query } = useLocalSearchParams();
    const { data: posts, refetch } = useAppwrite(() => getSearchPosts(query));

    console.log(query, "POST:", posts)

    useEffect(() => {
        refetch();
    }, [query]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        video={item}
                    />
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="flex my-6 px-4">
                            <Text className="font-pmedium text-gray-100 text-sm">
                                Search Results
                            </Text>
                            <Text className="text-2xl font-psemibold text-white mt-1">
                                {query}
                            </Text>

                            <View className="mt-6 mb-8">
                                <SearchInput initialQuery={query} />
                            </View>
                        </View>
                    </>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Search;