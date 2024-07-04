import {
    Button,
    Image,
    StyleSheet,
    TextInput,
    useColorScheme,
} from 'react-native';
import { View, Text } from '../../components/Themed';
import React, { useState } from 'react';
import { useAuth } from '../../common/service/AuthContext';
import Colors from '../../constants/Colors';

export default function signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();
    const colorScheme = useColorScheme();

    async function login() {
        const result = await onLogin!(username, password);

        if (result && result.error) {
            alert(result.msg);
        }
    }

    async function register() {
        const result = await onRegister!(username, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={styles.image}
            />
            <View style={styles.form}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: Colors[colorScheme!].tint,
                            color: Colors[colorScheme!].text,
                        },
                    ]}
                    placeholder="Username"
                    placeholderTextColor={Colors[colorScheme!].text}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={[
                        styles.input,
                        {
                            borderColor: Colors[colorScheme!].tint,
                            color: Colors[colorScheme!].text,
                        },
                    ]}
                    placeholder="Password"
                    placeholderTextColor={Colors[colorScheme!].text}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry
                />
                <Button title="Sign In" onPress={login} />
                <Button title="Register" onPress={register} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width: '60%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});
