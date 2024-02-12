import { BASE_URL } from "../constants/apiConstants";
import axios from 'axios'
import { toast } from 'react-toastify';

const errorCatchFunc = (error: any) => {
    const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();
    toast.error(`${message}`);
}

export interface IUpdateUserDetails {
    dateOfBirth: string
    isSmoke: boolean,
    availability: boolean,
    bodyType: string,
    isDrink: boolean,
    zodiacSign: string,
    height: string,
    nationality: string,
}

export interface IVerifyBVN {
    bvn: string
    token: string
}

export interface IVerifyNIN {
    ninNumber: string
    docImage: any
    token: string
}

export interface IResetPassword {
    password: string;
    contact: string;
    otp: string
    client: string
}

export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    token: string
}


const getUserDetails = async ({ token }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const getUserInfo = async ({ token, id }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/customerId/${id}`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const getMyGrooveOrders = async ({ token }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/groove/order`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}


const updateStatusOfGroove = async ({ token }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/groove/order`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}


const cancelGrooveRequest = async ({ token }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.delete(`{{baseUrl}}customer/groove/order/652b0ea58eb0cf8feef59eda`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}


const updateUser = async (details: IUpdateUserDetails, token: string) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/update`, details, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const verifyBVN = async (data: IVerifyBVN) => {
    const { bvn, token } = data

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/verify-bvn`, { bvn }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const verifyNIN = async (values: any) => {
    const { token, ninNumber } = values

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/verify-nin`, { ninNumber }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const changeVisibility = async ({ token, status }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/change-visibility/${status}`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const resetPassword = async (resetData: IResetPassword) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/reset-password`, resetData, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}


const changePassword = async (changeData: IChangePassword) => {
    const { token, oldPassword, newPassword } = changeData
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/change-password`, { oldPassword, newPassword }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const getAllBanks = async ({ token }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/wallet/bank-details`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const updateUserLocation = async ({ token, latitude, longitude }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.patch(`${BASE_URL}/customer/update-location`, { longitude, latitude }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const verifyBank = async ({ token, bankCode, accountNumber, bankName }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/wallet/paystack/bank-details`, { bankCode, accountNumber, bankName }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const saveBank = async ({ token, bankCode, accountNumber, accountName, bankName }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/wallet/bank-details`, { bankCode, accountNumber, accountName, bankName }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const getBankDetails = async ({ token }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/wallet/bank-details`, config)
        return data
    } catch (error: any) {
        // const message =
        //     (error.response &&
        //         error.response.data &&
        //         error.response.data.message) ||
        //     error.message ||
        //     error.toString();
        // toast.error(`${message}`);
    }
}

const setSecurityQuestion = async ({ token, contact, otpCode }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/security`, { contact, otpCode }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const getSecurityQuestion = async ({ token, key, value }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/security`, { key, value }, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const updateUserDetails = async (token: string, userInfo: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/update`, userInfo, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const uploadProfileImage = async (token: string, imageDetails: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/upload-base64`, imageDetails, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(`${message}`);
    }
}

const uploadMultipleFiles = async (token: string, imageDetails: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/upload-multiple-base64`, { images: imageDetails }, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error)
    }
}

const deactivateAccount = async (token: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/deactivate`, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error)
    }
}

const vipSubscription = async (token: string, transactionPin: string, otp: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/vip-subscription`, { transactionPin, otp }, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error)
    }
}

const getMyProposals = async (token: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/groove/proposal`, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error)
    }
}

const getBankCodes = async (token: string) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/wallet/paystack/bank-codes`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(`${message}`)
    }
}

const uploadCoverImage = async (token: string, imageData: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/upload-cover-image-base64`, imageData, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(`${message}`)
    }
}

const deleteImage = async (token: string, images: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: { images: images },
    };

    try {
        const response = await axios.delete(`${BASE_URL}/customer/image`, config);
        return response.data;
    } catch (error: any) {
        errorCatchFunc(error);
    }
};

const verifyBVNNew = async (token: string, bvn: string, dob: string) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/verify-bvn-dob`, { bvn, dob }, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error);
    }
}

const BVNLookup = async (token: string, bvn: string, channel: string) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/bvn/initiate-lookup`, { bvn, channel }, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error);
    }
}

const verifyBVNOtp = async (token: string, bvn: string, channel: string, otp: number) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/customer/bvn/verify-otp/${otp}`, { bvn, channel }, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error);
    }
}


const withdrawFunds = async (token: string, withdrawData:any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/wallet/nip-transfer`, withdrawData, config)
        return data
    } catch (error: any) {
        errorCatchFunc(error);
    }
}



const userService = {
    verifyBVNOtp,
    verifyBVNNew,
    BVNLookup,
    getUserInfo,
    updateUser,
    verifyBVN,
    verifyNIN,
    changeVisibility,
    resetPassword,
    changePassword,
    getUserDetails,
    getMyGrooveOrders,
    updateStatusOfGroove,
    cancelGrooveRequest,
    getAllBanks,
    updateUserLocation,
    verifyBank,
    saveBank,
    getBankDetails,
    setSecurityQuestion,
    getSecurityQuestion,
    updateUserDetails,
    uploadProfileImage,
    uploadMultipleFiles,
    deactivateAccount,
    vipSubscription,
    getMyProposals,
    getBankCodes,
    uploadCoverImage,
    deleteImage,
    withdrawFunds
}

export default userService