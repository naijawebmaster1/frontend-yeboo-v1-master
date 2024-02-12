import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import loginReducer from "./authReducer.ts/loginReducer";
import signupReducer from "./authReducer.ts/signupReducer";
import getGroovesReducer from "./groovesReducer.ts/getGroovesReducer";
import getMyGrooves from "./groovesReducer.ts/getMyGrooves";
import getUserDetailsReducer from "./userReducer.ts/getUserDetailsReducer"
import getWalletReducer from "./walletReducer/getWalletReducer";
import getwalletTransactions from "./walletReducer/getwalletTransactions";
import getOrderDetailsSlice from './orderDetailsReducer/orderDetailsReducer';
import requestGroovesReducer from "./groovesReducer.ts/requestGroovesReducer";
import getAllUsersReducer from "./userReducer.ts/getAllUsersReducer";
import getBankDetailsReducer from "./userReducer.ts/getBankDetailsReducer";
import hireAndProposalReducer from "./orderDetailsReducer/hireAndProposalReducer";
import chatMessagesReducer from "./chatReducer/chatMessagesReducer";


export const rootReducer = combineReducers({
    login:loginReducer,
    signup: signupReducer,
    grooves: getGroovesReducer,
    myGrooves: getMyGrooves,
    userInfo: getUserDetailsReducer,
    wallet:getWalletReducer,
    transactions: getwalletTransactions,
    orderDetails: getOrderDetailsSlice,
    requestGroove: requestGroovesReducer,
    users:getAllUsersReducer,
    bankInfo:getBankDetailsReducer,
    hireAndProposal: hireAndProposalReducer,
    allMessages: chatMessagesReducer
});

const config = {
    key: 'whitelisted-reducers',
    storage
}

export const persistedRootReducer = persistReducer(config, rootReducer);