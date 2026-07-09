import {useState} from "react";
import AxiosInstance from "@/lib/AxiosInstance";

function GetUsers() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const gettingAllUsers = async () => {
        setLoading(true)
        await AxiosInstance.get('/api/Users/users')
        .then((response) => {
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

    return {data, loading, gettingAllUsers}
}

export default GetUsers;
