import { StyleSheet } from 'react-native';
import React from 'react';
import { View, Text } from '@/components/Themed';

export default function VolunteerListHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>First Name</Text>
            <Text style={styles.heading}>Last Name</Text>
            <Text style={styles.heading}>Shift</Text>
            <Text style={styles.heading}>Checked In</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    heading: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
