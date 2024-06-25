import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { SearchBar } from '@rneui/themed';
import VolunteerList from '@/components/VolunteerList';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabOneScreen() {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            <SearchBar
                containerStyle={{ padding: 5 }}
                style={{ width: 'auto' }}
                placeholder="Type Here..."
                lightTheme={colorScheme !== 'dark'}
            />
            <VolunteerList />
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
