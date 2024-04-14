import userContext from './userContext';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL_USER } from '../../constants';

const UserState = (props) => {
    const [loginState, setLoginState] = useState(false);
    const [auth_token, setAuthToken] = useState("");
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log("UserState")
        if (localStorage.getItem('bidGenieToken')) {
            setAuthToken(localStorage.getItem('bidGenieToken'))
            getUserFromToken(localStorage.getItem('bidGenieToken'))
            setLoginState(true)
        }
    }, [auth_token])

    const checkIfProperLoggedIn = async ()=>{
        if(!localStorage.getItem('bidGenieToken')){
            console.log("No token")
            return false;
        }
        else if(!await checkIfValidAuthToken(localStorage.getItem('bidGenieToken'))){
            console.log("Invalid token")
            return false;
        }
        else{
            console.log("Valid token")
            return true;
        }
    }

    const getUserFromToken = (token) => {
        axios.get(`${API_URL_USER}/user`, {
            headers: {
                "auth-token": token
            },
        }).then(res => {
            console.log(res)
            setUser(res.data.user)
        }).catch(err => {
            console.log(err)
        })
    }

    const checkIfValidAuthToken = async (token) => {
        await axios.get(`${API_URL_USER}/user`, {
            headers: {
                "auth-token": token
            },
        }).then(res => {
            console.log(res)
            if(res.data.status==200){
                console.log("Valid auth-token")
                return true;
            }
            else{
                console.log("Invalid auth-token")
                return false;
            }
        }).catch(err => {
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
            setUser,
            checkIfValidAuthToken,
            checkIfProperLoggedIn
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState