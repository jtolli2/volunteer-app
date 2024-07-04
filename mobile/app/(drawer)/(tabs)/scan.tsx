import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { BarCodeScanningResult } from 'expo-camera/build/legacy/Camera.types';
import { Navigator, router } from 'expo-router';
import Scanner from '../../../components/Scanner';
import { useHeaderTitle } from '../../../common/service/global-service';

export default function ScanScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan QR Code</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Scanner />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
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
    camera: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
    },
});
