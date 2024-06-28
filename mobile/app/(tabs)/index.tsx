import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { Text, View } from '@/components/Themed';
import { SearchBar } from '@rneui/themed';
import VolunteerList from '@/components/VolunteerList';
import { useColorScheme } from '@/components/useColorScheme';
import { useGetShifts } from '../../common/service/shift-service';
import DataError from '../../components/DataError';
import NoData from '../../components/NoData';

export default function TabOneScreen() {
    const colorScheme = useColorScheme();
    const [{ loading, data, error }, refetch] = useGetShifts();

    // if (error) throw error;
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

    // Return the list of volunteers
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
            <SearchBar
                containerStyle={{ padding: 5 }}
                style={{ width: 'auto' }}
                placeholder="Type Here..."
                lightTheme={colorScheme !== 'dark'}
            />
            {/* <VolunteerList data={data.map((shift: Shift) => shift.volunteer)} /> */}
            <VolunteerList data={data} refetch={refetch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
