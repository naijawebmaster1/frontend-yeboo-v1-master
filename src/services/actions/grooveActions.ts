import { BASE_URL } from "../constants/apiConstants";
import axios from 'axios'
import { toast } from 'react-toastify';


export interface IOrderGroove {
    grooveId: string,
    groovePackage: string,
    transactionPin: number,
    token: string,
}


const createGroove = async ({values, token}:any) => {
    const newValues = {
        ...values,
        isAvailable: values.isAvailable === 'false' ? false : true
    }

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/create`, { ...newValues }, config)
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

const getGroove = async (id: string) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/${id}`, config)
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


//get grooves without filters
const getGrooves = async ({filters}:any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
        params: filters
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/all`, config)
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

const getMyGrooves = async ({ token }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/groove`, config)
        return data
    } catch (error: any) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(`${message}`)
        throw error
    }
}

const orderGrooves = async (grooveData: IOrderGroove) => {
    const { transactionPin, grooveId, groovePackage } = grooveData
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${grooveData.token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/order`, { transactionPin, grooveId, groovePackage }, config)
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

const respondToGrooveRequest = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/order`, config)
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

const upDateGrooveLocation = async ({ token, latitude, longitude, id }: any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    try {
        const { data } = await axios.patch(`${BASE_URL}/groove/update-location`, { id, latitude, longitude }, config)
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
};


const updateReview = async ({ review, token }: any) => {
    const url = `${BASE_URL}/groove/review`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.post(url, { review }, config);
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

const getGrooveByCustomerId = async ({ id, token }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/customer/${id}`, config)
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

const getMyGrooveOrder = async ({ token }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/customer/groove/order`, config)
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

const updateGrooveOrderStatus = async ({ token, response, orderId }: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.put(`${BASE_URL}/customer/groove/order`, { response, orderId }, config)
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


const addGrooveToFavorite = async ({ token, id}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/favorites/${id}/like`, config)
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

const removeGrooveFromFavorite = async ({ token, id}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/favorites/${id}/unlike`, config)
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

const getFavouriteGrooves = async ({ token}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/groove-favorites`, config)
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

const updateGrooveLocation = async ({ token, id, longitude, latitude}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.patch(`${BASE_URL}/groove/update-location`,{id, longitude, latitude}, config)
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


const reviewGroove = async ({ token, review, rating, orderRef}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/review`,{review, rating, orderRef}, config)
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

const cancelGroove = async ({ token, id}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.delete(`${BASE_URL}/customer/groove/order/${id}`, config)
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

const getGrooveOrderDetails = async ({ token, id}: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.get(`${BASE_URL}/groove/order/${id}`, config)
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

const newGrooveOrder = async (token: string, grooveOrderData:any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/order`, grooveOrderData, config)
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

const sendProposal = async (token: string, proposalData:any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/proposal`, proposalData, config)
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


const deleteGroove = async (token:string, id:string) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/${id}/delete-groove`, {}, config)
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

const changeGrooveVisibility = async (token:string, id:string, changeData:any) => {

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }

    try {
        const { data } = await axios.post(`${BASE_URL}/groove/${id}/change-groove-visibility`, changeData, config)
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



const grooveService = {
    createGroove,
    getGroove,
    getGrooves,
    getMyGrooves,
    orderGrooves,
    respondToGrooveRequest,
    upDateGrooveLocation,
    updateReview,
    getGrooveByCustomerId,
    getMyGrooveOrder,
    updateGrooveOrderStatus,
    addGrooveToFavorite, 
    getFavouriteGrooves,
    updateGrooveLocation,
    reviewGroove,
    removeGrooveFromFavorite,
    cancelGroove,
    getGrooveOrderDetails,
    newGrooveOrder,
    sendProposal,
    deleteGroove, 
    changeGrooveVisibility,
}

export default grooveService