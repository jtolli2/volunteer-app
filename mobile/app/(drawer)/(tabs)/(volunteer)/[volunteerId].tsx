import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useGetVolunteerDetails } from '../../../../common/service/volunteer-service';
import { View, Text } from '../../../../components/Themed';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
} from 'react-native';
import DataError from '../../../../components/DataError';
import NoData from '../../../../components/NoData';

export default function VolunteerDetails() {
    const { volunteerId } = useLocalSearchParams<{ volunteerId: string }>();
    const [{ loading, data, error }, refetch] = useGetVolunteerDetails(
        volunteerId!
    );

    if (error) {
        return (
            <View style={styles.container}>
                <DataError error={error} loading={loading} refetch={refetch} />
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.container}>
                <NoData loading={loading} refetch={refetch} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                    }}
                    size="large"
                />
            )}
            <Text
                style={styles.title}
            >{`${data.firstName} ${data.lastName}`}</Text>

            <View style={styles.container}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 5,
                        marginTop: 10,
                        textAlign: 'center',
                    }}
                >
                    Shifts
                </Text>
                <FlatList
                    data={data.__shifts__}
                    renderItem={({ item }) => (
                        <Text>{`${item.day} - ${item.time} - ${item.checkinTime ?? 'Not checked in'}`}</Text>
                    )}
                ></FlatList>
            </View>

            <View style={styles.container}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        marginBottom: 5,
                        marginTop: 10,
                        textAlign: 'center',
                    }}
                >
                    Voucher
                </Text>
                <FlatList
                    data={data.__vouchers__}
                    renderItem={({ item }) => (
                        <Text>{`${item.mealsRemaining} - ${item.drinksRemaining}`}</Text>
                    )}
                ></FlatList>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
