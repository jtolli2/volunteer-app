import useAxios, { UseAxiosResult } from 'axios-hooks';
import { Volunteer } from '../entity/Volunteer';

export function useGetVolunteers() {
    return useAxios('http://starsummit.net:8888/volunteer') as UseAxiosResult<
        Volunteer[],
        any,
        any
    >;
}

export function usePostVolunteer() {
    return useAxios('http://starsummit.net:8888/volunteer') as UseAxiosResult<
        Volunteer,
        any,
        any
    >;
}

export function useUpdateVolunteer(id: string) {
    return useAxios(
        `http://starsummit.net:8888/volunteer/${id}`
    ) as UseAxiosResult<Volunteer, any, any>;
}

export function useDeleteVolunteer(id: string) {
    return useAxios(`http://starsummit.net:8888/volunteer/${id}`);
}

export function useGetVolunteer(id: string) {
    return useAxios(
        `http://starsummit.net:8888/volunteer/${id}`
    ) as UseAxiosResult<Volunteer, any, any>;
}

export function useGetVolunteerDetails(id: string) {
    return useAxios(
        `http://starsummit.net:8888/volunteer/${id}/details`
    ) as UseAxiosResult<Volunteer, any, any>;
}
