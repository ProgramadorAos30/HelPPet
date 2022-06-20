import { ServiceFormData } from './../../@types/index';
import { api } from "../index";
import { useQuery, UseQueryResult } from "react-query";
import { Services } from "../../@types";

const getServices = async <T>(token: string):Promise<Services[]> => {
    const { data } = await api.get<Services[]>('/services', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return data;
}

export const useService = <T>(token: string):UseQueryResult<Services[]> => {
    return useQuery('services', () => getServices(token))
}

export const postService = async (token: string, dados: ServiceFormData) => {
    const {data: resp} = await api.post('/services', dados, {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    });
    return resp;
};

export const putService = async (token: string, id: string, dados: ServiceFormData) => {
    const {data: resp} = await api.post(`/services/${id}`, dados, {
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    });
    return resp;
};

export const deleteService = async (token: string, id: string) => {
    const data = await api.delete(`/services/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return data
};