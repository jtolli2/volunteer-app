import { FlatList, Pressable, RefreshControl, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import VolunteerListHeader from './VolunteerListHeader';
import { Text, View } from '../components/Themed';
import { Shift } from '../common/entity/Shift';
import { RefetchFunction } from 'axios-hooks';
import { Link } from 'expo-router';

interface VolunteerListProps {
    data: Shift[];
    refetch: RefetchFunction<any, any>;
}

export default function VolunteerList({ data, refetch }: VolunteerListProps) {
    const [refreshing, setRefreshing] = useState(false);

    function renderItem({ item }: { item: Shift }) {
        return (
            <Link href={`/(tabs)/(volunteer)/${item.volunteer.id}`} asChild>
                <Pressable style={styles.row}>
                    <Text style={styles.cell}>{item.volunteer.firstName}</Text>
                    <Text style={styles.cell}>{item.volunteer.lastName}</Text>
                    <Text style={styles.cell}>{item.volunteer.email}</Text>
                    <Text style={styles.cell}>
                        {/* {item.checkin ? 'true' : 'false'} */}
                        {item.id.toString()}
                    </Text>
                </Pressable>
            </Link>
        );
    }

    return (
        <View style={styles.container}>
            <VolunteerListHeader />
            <FlatList
                data={data}
                keyExtractor={(item: Shift) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refetch}
                    />
                }
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
    },
});
