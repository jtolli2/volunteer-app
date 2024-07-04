import { View, Text, useColorScheme, Button } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import { useHeaderTitle } from '../../common/service/global-service';
import { useAuth } from '../../common/service/AuthContext';

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function DrawerLayout() {
    const colorScheme = useColorScheme();
    const { authState, onLogout } = useAuth();

    return (
        <Drawer
            screenOptions={{
                drawerPosition: 'right',
                drawerIcon: ({ color }: { color: string }) => (
                    <TabBarIcon name="user" color={color} />
                ),
                headerStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
                headerTintColor: Colors[colorScheme ?? 'light'].text,
                headerRight: () => {
                    if (authState?.authenticated)
                        return <Button onPress={onLogout} title="Logout" />;
                },
            }}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'Volunteer App',
                }}
                redirect={!authState?.authenticated}
            />
            <Drawer.Screen
                name="signin"
                options={{
                    title: 'Login',
                    drawerItemStyle: {},
                }}
                redirect={authState?.authenticated!}
            />
        </Drawer>
    );
}
