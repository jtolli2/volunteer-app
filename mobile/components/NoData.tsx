import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import React from 'react';
import { RefetchFunction } from 'axios-hooks';

interface NoDataProps {
    loading: boolean;
    refetch: RefetchFunction<any, any>;
}

export default function DataError({ loading, refetch }: NoDataProps) {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
            }
        >
            <Text>No data</Text>
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
