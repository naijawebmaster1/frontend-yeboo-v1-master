
import axios from 'axios'
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants/apiConstants';


const getWalletDetails = async ({ token }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };
    const { data } = await axios.get(`${BASE_URL}/wallet`, config)
    return data
}


const getWalletTransactions = async ({ token }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };
    const { data } = await axios.get(`${BASE_URL}/wallet/transactions`, config)
    return data
}

const walletService = {
    getWalletDetails,
    getWalletTransactions
}

export default walletService