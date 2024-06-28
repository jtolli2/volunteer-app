import useAxios, { UseAxiosResult } from 'axios-hooks';
import { Voucher } from '../entity/Voucher';

export function useGetVouchers() {
    return useAxios('http://starsummit.net:8888/voucher') as UseAxiosResult<
        Voucher[],
        any,
        any
    >;
}

export function usePostVoucher() {
    return useAxios('http://starsummit.net:8888/voucher') as UseAxiosResult<
        Voucher,
        any,
        any
    >;
}

export function useUpdateVoucher(id: string) {
    return useAxios(
        {
            url: `http://starsummit.net:8888/voucher/${id}`,
            method: 'PATCH',
        },
        { manual: true }
    ) as UseAxiosResult<Voucher, any, any>;
}

export function useDeleteVoucher(id: string) {
    return useAxios(`http://starsummit.net:8888/voucher/${id}`);
}

export function useGetVoucher(id: string) {
    return useAxios(
        `http://starsummit.net:8888/voucher/${id}`
    ) as UseAxiosResult<Voucher, any, any>;
}

export function useGetVoucherEmail(id: string) {
    return useAxios(
        `http://starsummit.net:8888/voucher/${id}/send-email`
    ) as UseAxiosResult<Voucher, any, any>;
}
