import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import React from 'react';
import { RefetchFunction } from 'axios-hooks';

interface DataErrorProps {
    error: Error;
    loading: boolean;
    refetch: RefetchFunction<any, any>;
}

export default function DataError({ error, loading, refetch }: DataErrorProps) {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
            }
        >
            <Text>Error: {error.message}</Text>
            <Text>Pull down to refresh</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
