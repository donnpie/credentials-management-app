import React, { useEffect, useState} from 'react';
import './Auth.css';
import {ous, divisions} from '../config/default'
import { Redirect } from 'react-router';

const Auth = () => {
    //Set default state variable
    const [ credentials, setCredentials ] = useState({
        name: "",
        password: "",
        ou: "",
        division: ""
    });

    const [ auth, setAuth ] = useState({});

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Load authentication data into session storage
    // useEffect(() => {
    //     sessionStorage.setItem('auth', auth)
    // }, [auth]);

    //when form submits, make call to api to authenticate user
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e.target.elements.userName.value);
        const un = e.target.elements.userName.value;
        const pwd = e.target.elements.password.value;
        const ou = e.target.elements.ou.value;
        const div = e.target.elements.division.value;
        setCredentials({
            name: un,
            password: pwd,
            ou: ou,
            division: div
        });
        
        //console.log(credentials);

        //Make call to api to authenticate user
        const url = 'http://localhost:5000/api/auth';
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
        //.then(response => console.log(response.headers['x-auth-token']))
        // .then(response => response.headers.forEach(console.log))
        // .catch(err => console.log(err));
        // ;
        .then(response => response.json())
        .then(data => {
            setAuth(data);
            // console.log(data);
            //console.log(auth);
            //sessionStorage.setItem('auth', auth)
            sessionStorage.setItem('id', auth._id)
            sessionStorage.setItem('userName', auth.userName)
            sessionStorage.setItem('ou', auth.ou)
            sessionStorage.setItem('division', auth.division)
            sessionStorage.setItem('role', auth.role)
            sessionStorage.setItem('token', auth.token)
            //const cachedAuth = sessionStorage.getItem('auth');
            // const id = sessionStorage.getItem('id');
            // const userName = sessionStorage.getItem('userName');
            // const ou = sessionStorage.getItem('ou');
            // const division = sessionStorage.getItem('division');
            // const role = sessionStorage.getItem('role');
            // const token = sessionStorage.getItem('token');
            //console.log(cachedAuth._id);
            // console.log(id);
            // console.log(userName);
            // console.log(ou);
            // console.log(division);
            // console.log(role);
            // console.log(token);

            if (auth.token) {
                setIsLoggedIn(true);
            }
        })
        .catch(err => console.log(err));        
    }

    const makeOptions = (optionsArray) => {
        const options =  optionsArray.map((option, idx) => {
            return (<option key={idx} value={option}>{option}</option>)
        });
        // console.log(options);
        return options;
    }

    if (isLoggedIn) {
        return <Redirect to='/options' />
    }
    return (
        <div className="wrapper">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" name="userName"/>
                <input type="password" placeholder="Password" name="password"/>
                <select name="ou" id="">
                    {makeOptions(ous)}
                </select>
                <select name="division" id="">
                    {makeOptions(divisions)}
                </select>
                <input type="submit" name="login" value="LOGIN"/>
                {/* <button>Login</button> */}
            </form>
            <div className="bottom-text">
                {/* <input type="checkbox" name="remember" checked="checked"/> Remember me */}
                {/* <a href="#">Forgot Password?</a> */}
            </div>
            <div className="socials">
                {/* <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-pinterest"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a> */}
            </div>
        </div>
    );
}

export default Auth;

//References:
//https://www.robinwieruch.de/local-storage-react