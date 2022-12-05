import {SUBMITDATA} from "./actionType";
export const goData=(allData)=>{
    return{ type:SUBMITDATA,
        payload:{
            allData,
        }
    }
};

import {DASHBOARDDATA} from "./actionType";
export const dashboardData=(products)=>{
    return{ type:DASHBOARDDATA,
        payload:{
            products,
        }
    }
};
import {ALLPRODUCTDATA} from "./actionType";
export const allproductData=(allproducts)=>{
    return{ type:ALLPRODUCTDATA,
        payload:{
            allproducts,
        }
    }
};
import {CARTDETAILS} from "./actionType";
export const cartDetails=(cart)=>{
    return{ type:CARTDETAILS,
        payload:{
            cart,
        }
    }
};
// import { AUTH_LOG_IN,
//     //GET_USER_ADDRESSES,
//  } from './authactionTypes';
//   export const userLogInAction = (result) => {
//    return{ type: AUTH_LOG_IN,
//    payload:{
//       result,
//    }
//   }
// };
import {DISPLAYDATA} from "./actionType";
export const profileData=(userData)=>{
    return{ type:DISPLAYDATA,
        payload:{
            userData,
        }
    }
    };
import {CARTPRODUCT} from "./actionType";
export const cartProduct=(data)=>{
    return{ type:CARTPRODUCT,
        payload:{
           data,
        }
    }
};
import {PLACEORDER} from "./actionType";
export const goplaceOrder=(ordereddata)=>{
    return{ type:PLACEORDER,
        payload:{
            ordereddata,
        }
    }
};

import {CONFIRMPLACEORDER} from "./actionType";
export const confirmPlaceorder=(orderedItems)=>{
    return{ type:CONFIRMPLACEORDER,
        payload:{
            orderedItems,
        }
    }
};