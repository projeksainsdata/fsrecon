import { useState, ChangeEvent } from 'react';

type FormData = {
    [key: string]: string;
};

type DataManageFn = (prev: FormData) => FormData;

const useFormData = (initialState: FormData, dataManage: DataManageFn | null = null) => {
    const [data, setData] = useState<FormData>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        dataManage ? dataManage((prev) => ({ ...prev, [id]: value })) : setData((prev) => ({ ...prev, [id]: value }));
    };

    const handleChangeBulk = (newData: FormData) => {
        dataManage ? dataManage((prev) => ({ ...prev, ...newData })) : setData((prev) => ({ ...prev, ...newData }));
    };

    return {
        data,
        handleChange,
        handleChangeBulk,
    };
};

export default useFormData;
