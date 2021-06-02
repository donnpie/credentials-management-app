import React, { useEffect, useState} from 'react';
import './Auth.css';
import {ous, divisions} from '../config/default'

const Auth = () => {
    //Set default state variable
    const [ credentials, setCredentials ] = useState({
        name: "",
        password: "",
        ou: "",
        division: ""
    });

    //Load ou and division data when component loads
    // useEffect(() => {
    //     const ouList = makeOptions(ous);
    // }, [])

    //when form submits, make call to api to authenticate user
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(e.target.elements.userName.value);
        //console.log(e.target.elements.ou.value);
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
        .then(response => response.headers.forEach(console.log))
        .catch(err => console.log(err));
        ;
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(err => console.log(err));

        
    }

    const makeOptions = (optionsArray) => {
        const options =  optionsArray.map((option, idx) => {
            return (<option key={idx} value={option}>{option}</option>)
        });
        // console.log(options);
        return options;
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