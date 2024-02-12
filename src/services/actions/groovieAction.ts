import { BASE_URL } from "../constants/apiConstants";
import axios from 'axios'
import { toast } from 'react-toastify';


const getGroovies = async ({token}:any) => {
    
    const config = {
        headers: {
            "Content-Type": "application/json", 
            'Authorization': 'Bearer '+token
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

const getAllUsers = async ({filters}:any) => {
    
    const config = {
        headers: {
            "Content-Type": "application/json", 
            // 'Authorization': 'Bearer '+token
        },
        params:filters
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/all`, config)
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


const groovieService = {
    getGroovies, getAllUsers 
}

export default groovieService