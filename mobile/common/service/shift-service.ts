import useAxios, { UseAxiosResult, configure } from 'axios-hooks';
import { Shift } from '../entity/Shift';
import useAxiosPrivate from '../util/useAxiosPrivate';


export function useGetShifts() {
    configure({
        axios: useAxiosPrivate()
    })
    return useAxios(
        'http://starsummit.net:8888/shift'
    ) as UseAxiosResult<Shift[], any, any>;
}

export function usePostShift() {
    return useAxios('http://starsummit.net:8888/shift') as UseAxiosResult<
        Shift,
        any,
        any
    >;
}

export function useUpdateShift(id: string) {
    return useAxios(`http://starsummit.net:8888/shift/${id}`) as UseAxiosResult<
        Shift,
        any,
        any
    >;
}

export function useDeleteShift(id: string) {
    return useAxios(`http://starsummit.net:8888/shift/${id}`);
}

export function useGetShift(id: string) {
    return useAxios(`http://starsummit.net:8888/shift/${id}`) as UseAxiosResult<
        Shift,
        any,
        any
    >;
}
