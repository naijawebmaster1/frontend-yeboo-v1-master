
import axios from 'axios'
import { toast } from 'react-toastify';
import { BASE_URL } from '../constants/apiConstants';
// const BASE_URL = 'https://yeboo-api-v1.onrender.com/api'

//LOGIN DTO

export interface IResetPassword {
    email: string;
}

export interface ILogin {
    email: string,
    password: string
}

export interface ICreatePin {
    username: string,
    transactionPin: number,
}

export interface ISignUp {
    username: string,
    password: string,
    accountType: string,
    sex: string,
    email: string,
    phone: string,
    firstname: string,
    lastname: string
}

export interface IValidateEmail {
    email: string,
    otp: string,
}


const Login = async ({ email, password }: ILogin) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { data } = await axios.post(`${BASE_URL}/auth/signin`, { email, password }, config)
    return data
}

//VALIDATE PIN Creation

const Signup = async (signupData: ISignUp) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { data } = await axios.post(`${BASE_URL}/auth/create`, signupData, config)
    return data
}

//VALIDATE EMAIL ADDRESS 
const validateEmail = async ({ email, otp }: IValidateEmail) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/auth/validate-email`, { email, otp }, config)
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

//VALIDATE PHONE ADDRESS 

export interface IValidatePhone {
    phone: string,
    otp: string,
}

const validatePhone = async ({ phone, otp }: IValidatePhone) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/auth/validate-phone`, { phone, otp }, config)
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

//VALIDATE PIN Creation
const createPin = async ({ username, transactionPin }: ICreatePin) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/auth/transaction-pin`, { username, transactionPin }, config)
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


//Resend Email Verification code
const resendVerificationEmail = async ({email}:any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/send-otp/email/${email}`, config)
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

//Resend Phone Verification code
const resendVerificationPhone = async ({phone}:any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/send-otp/phone/${phone}`, config)
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


//LOG OUT THE USER
const logOutUserAccount = async ({token}:any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/auth/logout`, config)
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

//Change Contact
const changeUserContact = async (values:any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.patch(`${BASE_URL}/auth/change-contact`, values,  config)
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


//Change Contact
const resetTransactionPin = async (token:string, values:any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.patch(`${BASE_URL}/auth/transaction-pin`, values,  config)
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



const authService = {
    Login,
    Signup,
    validateEmail,
    validatePhone,
    createPin,
    resendVerificationEmail,
    resendVerificationPhone, 
    logOutUserAccount,
    changeUserContact,
    resetTransactionPin
}

export default authService