import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                headerRight: () => (
                    <Link href="/signin" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="user"
                                    size={25}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={{
                                        marginRight: 15,
                                        opacity: pressed ? 0.5 : 1,
                                    }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
                headerStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Check-in',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="check" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: 'Scan Voucher',
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="camera" color={color} />
                    ),
                    // Need unmountOnBlur to unmount camera on navigation
                    unmountOnBlur: true,
                }}
            />
            <Tabs.Screen
                name="(volunteer)/[volunteerId]"
                options={{
                    title: 'Profile',
                    href: null,
                }}
            />
            <Tabs.Screen
                name="(voucher)/[voucherId]"
                options={{
                    title: 'Voucher Details',
                    // href: null,
                }}
            />
        </Tabs>
    );
}
