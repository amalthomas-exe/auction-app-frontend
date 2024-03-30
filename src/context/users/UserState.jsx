import userContext from './userContext';
import { useState,useEffect } from 'react'
import axios from 'axios';
import { API_URL } from '../../constants';

const UserState = (props) => {
    const [loginState, setLoginState] = useState(false);
    const [auth_token, setAuthToken] = useState("");
    const [user,setUser] = useState({}) 

    useEffect(()=>{
        console.log("UserState")
        if(localStorage.getItem('bidGenieToken')){
            setAuthToken(localStorage.getItem('bidGenieToken'))
            getUserFromToken(localStorage.getItem('bidGenieToken'))
            setLoginState(true)
        }
    },[loginState])

    const getUserFromToken = (token) =>{
        axios.get(`${API_URL}/user`,{
            headers:{
                "auth-token":token
            },
        }).then(res=>{
            console.log(res)
            setUser(res.data.user)
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <userContext.Provider value={{
            loginState,
            setLoginState,
            auth_token,
            setAuthToken,
            user,
            setUser
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState