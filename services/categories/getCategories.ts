import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function GetCategories() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const gettingAllCategories = async () => {
        setLoading(true)
        await AxiosInstance.get('/api/Categories?lang=3').then((response) => {
            if (response.data.length > 0) {
                setData(response.data)
            }
            if (response.status !== 200) {
                setData([])
                throw new Error("there is something went wrong!")
            }
        }).catch((err) => {
            return err.response?.data?.message || err.message
        }).finally(() => {
            setLoading(false)
        })
    }

    return {data, loading, gettingAllCategories}
}

export default GetCategories;