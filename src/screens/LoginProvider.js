import React,{useContext,useState} from 'react';
import { createContext } from 'react';
const LoginContext=createContext();

// const LoginProvider=({children})=>{
//     const [isLoggedIn,setIsLoggedIn]=useState(false);
//     return(
//      <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
//          {children}
//         </LoginContext.Provider>
//     );
// }
const LoginProvider=({children})=>{
     const [isLoggedIn,setIsLoggedIn]=useState(false);
    //const [isSignedIn,setisSignedIn]=useState(false);
    return(
    <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </LoginContext.Provider>
    );
};
export const useLogin=()=>useContext(LoginContext);
export default LoginProvider;