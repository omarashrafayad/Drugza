import React from 'react';
import AxiosInstance from "@/lib/AxiosInstance";

function useGettingAllSubAreasOfArea() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [subAreas, setSubAreas] = React.useState<any[]>([]);

    const getAllSubAreasOfArea = async (areaId: string | string[] | undefined) => {
        setLoading(true);
        setError(null);
        try {
            const response = await AxiosInstance.get(`/api/SubAreas/${areaId}/Region`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch sub-areas');
            }
            setSubAreas(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { subAreas, loading, error, getAllSubAreasOfArea };
}

export default useGettingAllSubAreasOfArea;