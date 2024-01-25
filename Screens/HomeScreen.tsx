import React from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import useGetPosts from "../hooks/useGetPost";

const HomeScreen: React.FC = () => {

    type Posts = {
        id: number,
        title: string
    }

    const { 
        data, 
        isLoading, 
        refetch, 
        hasNextPage, 
        fetchNextPage, 
        isFetchingNextPage
    } = useGetPosts()

    const dataArray = data?.pages?.map(page => page).flat()

    const keyExtractor = (_: any, index: number) => index.toString()

    const onReachEnd = () => {
        if (hasNextPage && !isLoading) {
            fetchNextPage()
        }
    }

    const renderitem = ({ item }: { item: Posts }) => (
        <View style={styles.ItemContainer}>
            <Text> {item.id} </Text>


            <Text> {item.title} </Text>
        </View>
    )

    return (
        <View style={styles.page}>
            {
                isLoading ?
                    <View style={styles.activityindicator}>
                        <ActivityIndicator size={"large"} color={"#000"} />
                    </View>
                    :
                    <View style={styles.maincontainer}>
                        <FlatList
                            data={dataArray}
                            keyExtractor={keyExtractor}
                            renderItem={renderitem}
                        />
                        <TouchableOpacity onPress={onReachEnd} style={styles.button}>
                            {
                                isFetchingNextPage
                                    ? <Text style={styles.buttonText}>Loading more...</Text>
                                    : hasNextPage
                                        ? <Text style={styles.buttonText}>Load More</Text>
                                        : <Text style={styles.buttonText}>Nothing more to load</Text>
                            }
                        </TouchableOpacity>
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        paddingVertical: 10,
        padding: 5,
        marginBottom: 15
    },
    page: {
        paddingVertical: 30,
        height: "100%"
    },
    ItemContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: "gray"
    },
    activityindicator: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    button: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#84b9f2",

    },

    buttonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700"
    }
})

export default HomeScreen;
