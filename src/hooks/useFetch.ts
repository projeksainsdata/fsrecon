import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'; // Import axios and AxiosError
import axiosApiInstance from '../services/axios';

interface FetchState<T> {
    loading: boolean;
    error: any;
    data: T[];
}

interface PaginationState<T> extends FetchState<T> {
    next: string | null;
    previous: string | null;
    count: number;
}

export default function useFetchPagination<T>(): {
    state: PaginationState<T>;
    fetch: (url: string) => Promise<void>;
} {
    const initialState: PaginationState<T> = {
        loading: false,
        error: null,
        data: [],
        next: null,
        previous: null,
        count: 0,
    };
    const [state, setState] = useState<PaginationState<T>>(initialState);

    const fetch = async (url: string) => {
        try {
            setState({ ...state, loading: true });

            const response = await axiosApiInstance.get(url);

            setState({
                ...state,
                loading: false,
                data: response.data.results,
                next: response.data.next,
                previous: response.data.previous,
                count: response.data.count,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setState({ ...state, loading: false, error: error.response?.data });
            } else {
                setState({ ...state, loading: false, error: 'An unknown error occurred' });
            }
        }
    };

    return { state, fetch };
}

export function useFetch<T>(url: string): FetchState<T> & { fetch: () => Promise<void> } {
    const initialState: FetchState<T> = {
        loading: false,
        error: null,
        data: [],
    };
    const [state, setState] = useState<FetchState<T>>(initialState);

    const fetch = async () => {
        try {
            setState({ ...state, loading: true });

            const response = await axiosApiInstance.get(url);

            setState({
                ...state,
                loading: false,
                data: response.data,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setState({ ...state, loading: false, error: error.response?.data });
            } else {
                setState({ ...state, loading: false, error: 'An unknown error occurred' });
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return { ...state, fetch };
}

export function useFetchPost<T>(url: string, data: any): FetchState<T> & { fetch: () => Promise<void> } {
    const initialState: FetchState<T> = {
        loading: false,
        error: null,
        data: [],
    };
    const [state, setState] = useState<FetchState<T>>(initialState);

    const fetch = async () => {
        try {
            setState({ ...state, loading: true });

            const response = await axiosApiInstance.post(url, data);

            setState({
                ...state,
                loading: false,
                data: response.data,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setState({ ...state, loading: false, error: error.response?.data });
            } else {
                setState({ ...state, loading: false, error: 'An unknown error occurred' });
            }
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    return { ...state, fetch };
}
