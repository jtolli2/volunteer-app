import { FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import data from '@/SampleData.json';
import VolunteerListHeader from './VolunteerListHeader';
import { Text, View } from '@/components/Themed';

interface SampleData {
    firstName: string;
    lastName: string;
    shift: string;
    checkin: boolean;
}

export default function VolunteerList() {
    // const [data, setData] = useState([require('@/SampleData.json')]);

    function renderItem({ item }: { item: SampleData }) {
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.firstName}</Text>
                <Text style={styles.cell}>{item.lastName}</Text>
                <Text style={styles.cell}>{item.shift}</Text>
                <Text style={styles.cell}>{item.checkin ? 'true' : 'false'}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <VolunteerListHeader />
            <FlatList
                data={data}
                keyExtractor={(item: SampleData, index: number) => index.toString()}
                renderItem={renderItem}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
