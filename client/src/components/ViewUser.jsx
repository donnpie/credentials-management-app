import React, { useEffect, useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Test from './Test';


const ViewAll = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [mode, setMode] = useState("initial");
    
    useEffect(() => {
        // const id = sessionStorage.getItem('id');
        // const userName = sessionStorage.getItem('userName');
        // const ou = sessionStorage.getItem('ou');
        // const division = sessionStorage.getItem('division');
        // const role = sessionStorage.getItem('role');
        const token = sessionStorage.getItem('token');


        // console.log(id);
        // console.log(userName);
        // console.log(ou);
        // console.log(division);
        // console.log(role);
        // console.log(token);

        //Authenticate user
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        //myHeaders.append("Content-Type", "text/plain");

        //var raw = "{\r\n    \"name\":\"\"\r\n}";

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        //body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/api/users/" + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log('result', result);
            setUser(result);
            //console.log('user', user);
        })
        .catch(error => console.log('error', error));

        //Get list of users -> put in state

        //Map users to html
    }, []);

    // Handler for changes
    const editName = (e) => {
        e.preventDefault();
        console.log("editName");
        setMode("editName")
        //console.log(e);
        // <Redirect
        // to={
        //     {
        //         pathname: "/edit/name",
        //         state: { 
        //             fieldToBeUpdated: "userName",
        //             oldName: user.userName,
        //             ou: user.ou,
        //             division: user.division   
        //         }
        //     }
        // }
        // />
        // return (<Redirect
        // to="/edit/name"
        // />)
        // return (<Test
        //     fieldToBeUpdated="userName"
        // />)
    }
    const editPassword = (e) => {
        e.preventDefault();
        setMode("editPassword")
    }

    const editOu = (e) => {
        e.preventDefault();
        setMode("editOu")
    }

    const editDivision = (e) => {
        e.preventDefault();
        setMode("editDivision")
    }

    const editRole = (e) => {
        e.preventDefault();
        setMode("editRole")
    }

    const showUserDetails = (user, mode) => {
        if (mode==="initial") {
            return (
                <ul>
                    <li>Id: {user._id}</li>
                    <li>User name: {user.userName}</li>
                    <li>Role: {user.role}</li>
                    <li>OU: {user.ou}</li>
                    <li>Division: {user.division}</li>
                </ul>
            )
        }
    }

    const showChangeNameForm = (user, mode) => {
        if (mode==="editName") {
            return (
                <p>Edit name</p>
            )
        }
    }

    const showChangePasswordForm = (user, mode) => {
        if (mode==="editPassword") {
            return (
                <p>Edit password</p>
            )
        }
    }

    const showChangeOuForm = (user, mode) => {
        if (mode==="editOu") {
            return (
                <p>Edit ou</p>
            )
        }
    }

    const showChangeDivisionForm = (user, mode) => {
        if (mode==="editDivision") {
            return (
                <p>Edit division</p>
            )
        }
    }

    const showChangeRoleForm = (user, mode) => {
        if (mode==="editRole") {
            return (
                <p>Edit role</p>
            )
        }
    }
    const goBack = () => {
        setMode("initial")
    }

    return (
        <>
            {showUserDetails(user, mode)}
            {showChangeNameForm(user, mode)}
            {showChangePasswordForm(user, mode)}
            {showChangeOuForm(user, mode)}
            {showChangeDivisionForm(user, mode)}
            {showChangeRoleForm(user, mode)}
            {/* Pass props down to edit user */}
            {/* <ul>
                <li><a href="/edit/name">Edit User Name (Requires  Management role)</a></li>
                <li><a href="/edit/password">Edit password (Requires  Management role)</a></li>
                <li><a href="/edit/ou">Edit OU (Requires  Admin role)</a></li>
                <li><a href="/edit/division">Edit Division (Requires  Admin role)</a></li>
                <li><a href="/edit/role">Edit Role (Requires  Admin role)</a></li>
            </ul> */}
            <button onClick={editName}>Edit User Name</button>
            <button onClick={editPassword}>Edit password</button>
            <button onClick={editOu}>Edit OU</button>
            <button onClick={editDivision}>Edit Division</button>
            <button onClick={editRole}>Edit Role</button>
            <button onClick={goBack}>Back to user details</button>
        </>
    )
}

export default ViewAll;

//References
//https://stackoverflow.com/questions/52064303/reactjs-pass-props-with-redirect-component

