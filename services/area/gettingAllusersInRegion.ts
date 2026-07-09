import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllUsersInRegion() {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [users, setUsers] = React.useState([]);

    const getAllUsersInRegion = async (id: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        await AxiosInstance.get(`/api/Regions/${id}/users`).then((response) => {
            if (response.status !== 200) {
                throw new Error('Failed to fetch users in region');
            }
            setUsers(response.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    return { users, loading, error, getAllUsersInRegion };
}

export default useGettingAllUsersInRegion;