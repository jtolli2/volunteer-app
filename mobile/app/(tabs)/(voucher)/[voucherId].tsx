import { ActivityIndicator, Button, StyleSheet } from 'react-native';
import { View, Text } from '../../../components/Themed';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
    useGetVoucher,
    useUpdateVoucher,
} from '../../../common/service/voucher-service';
import NoData from '../../../components/NoData';
import DataError from '../../../components/DataError';
import { Voucher } from '../../../common/entity/Voucher';
import Toast from 'react-native-root-toast';
import * as Haptics from 'expo-haptics';

export default function VoucherDetails() {
    const { voucherId } = useLocalSearchParams<{ voucherId: string }>();
    const [{ data, loading, error }, refetch] = useGetVoucher('1'); //useGetVoucher(voucherId!);
    const [
        { data: putData, loading: putLoading, error: putError },
        executePut,
    ] = useUpdateVoucher('1'); //(voucherId!);

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

    async function handleRedeem(voucher: Voucher) {
        await executePut({
            data: {
                ...voucher,
            },
        });

        let toast = Toast.show('Voucher Redeemed!', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });

        refetch();
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
                style={styles.heading}
            >{`${data.volunteer.firstName} ${data.volunteer.lastName}`}</Text>
            <View style={styles.row}>
                <Text>{`Drinks Remaining: ${data.drinksRemaining}`}</Text>
                <Button
                    title="Redeem"
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        let newVoucher: Voucher = {
                            ...data,
                            drinksRemaining: data.drinksRemaining - 1,
                        };
                        handleRedeem(newVoucher);
                    }}
                />
            </View>
            <View style={styles.row}>
                <Text>{`Meals Remaining: ${data.mealsRemaining}`}</Text>
                <Button
                    title="Redeem"
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        let newVoucher: Voucher = {
                            ...data,
                            mealsRemaining: data.mealsRemaining - 1,
                        };
                        handleRedeem(newVoucher);
                    }}
                />
            </View>
            <View style={styles.row}>
                <Text>{`Snack Remaining: ${data.snacksRemaining}`}</Text>
                <Button
                    title="Redeem"
                    disabled={data.snacksRemaining === 0}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        let newVoucher: Voucher = {
                            ...data,
                            snacksRemaining: data.snacksRemaining - 1,
                        };
                        handleRedeem(newVoucher);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    heading: {
        // flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
