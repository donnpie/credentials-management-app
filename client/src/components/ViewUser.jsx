import React, { useEffect, useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Test from './Test';


const ViewAll = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [mode, setMode] = useState("initial");
    const [success, setSuccess] = useState(false);
    
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
        //console.log("editName");
        setSuccess(false);
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
        setSuccess(false);
        setMode("editPassword")
    }

    const editOu = (e) => {
        e.preventDefault();
        setSuccess(false);
        setMode("editOu")
    }

    const editDivision = (e) => {
        e.preventDefault();
        setSuccess(false);
        setMode("editDivision")
    }

    const editRole = (e) => {
        e.preventDefault();
        setSuccess(false);
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
                <form onSubmit={onChangeName}>
                    <label htmlFor="oldName">Old user name</label>
                    <input type="text" name="oldName" value={user.userName} disabled={true}/>
                    
                    <label htmlFor="newName">New User Name</label>
                    <input type="text" name="newName" placeholder="Type new user name here"/>
                    
                    <label htmlFor="ou">OU</label>
                    <input type="text" name="ou" value={user.ou} disabled={true}/>
                    
                    <label htmlFor="division">Division</label>
                    <input type="text" name="division" value={user.division} disabled={true}/>

                    <button type="submit">Update</button>
                </form>
            )
        }
    }

    const onChangeName = (e) => {
        e.preventDefault();
        //console.log(e.target.elements.oldName.value);
        const token = sessionStorage.getItem('token');
        const fieldToBeUpdated = "userName";
        const oldName = e.target.elements.oldName.value
        const newName = e.target.elements.newName.value
        const ou = e.target.elements.ou.value
        const division = e.target.elements.division.value
        // console.log(fieldToBeUpdated);
        // console.log(oldName);
        // console.log(newName);
        // console.log(ou);
        // console.log(division);

        //Send request to API to change name
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        let raw = JSON.stringify({
            "fieldToBeUpdated": fieldToBeUpdated,
            "oldName": oldName,
            "newName": newName,
            "ou": ou,
            "division": division
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/users", requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            setSuccess(true);
        })
        .catch(error => console.log('error', error));
    }

    const showChangePasswordForm = (user, mode) => {
        if (mode==="editPassword") {
            return (
                <form onSubmit={onChangePassword}>
                    <label htmlFor="name">Old user name</label>
                    <input type="text" name="name" value={user.userName} disabled={true}/>
                    
                    <label htmlFor="newPassword">New Password</label>
                    <input type="text" name="newPassword" placeholder="Type new password here"/>
                    
                    <label htmlFor="ou">OU</label>
                    <input type="text" name="ou" value={user.ou} disabled={true}/>
                    
                    <label htmlFor="division">Division</label>
                    <input type="text" name="division" value={user.division} disabled={true}/>

                    <button type="submit">Update</button>
                </form>
            )
        }
    }

    const onChangePassword = (e) => {
        e.preventDefault();
        //console.log(e.target.elements.oldName.value);
        const fieldToBeUpdated = "password";
        const name = e.target.elements.name.value
        const newPassword = e.target.elements.newPassword.value
        const ou = e.target.elements.ou.value
        const division = e.target.elements.division.value
        
        let myBody = JSON.stringify({
            "fieldToBeUpdated": fieldToBeUpdated,
            "name": name,
            "newPassword": newPassword,
            "ou": ou,
            "division": division
        });
        
        //Send request to API
        const token = sessionStorage.getItem('token');
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);


        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: myBody,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/api/users", requestOptions)
        .then(response => response.json())
        .then(result => {
            //console.log(result);
            setSuccess(true);
        })
        .catch(error => console.log('error', error));
    }

    // const update = async (uri, body) => {
    //     const token = sessionStorage.getItem('token');
    //     let myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     myHeaders.append("Authorization", "Bearer " + token);

    //     const requestOptions = {
    //         method: 'PUT',
    //         headers: myHeaders,
    //         body: body,
    //         redirect: 'follow'
    //     };

    //     fetch(uri, requestOptions)
    //     .then(response => response.json())
    //     .then(result => {
    //         //console.log(result);
    //         setSuccess(true);
    //     })
    //     .catch(error => console.log('error', error));
    // }

    // const showChangeOuForm = (user, mode) => {
    //     if (mode==="editOu") {
    //         return (
    //             <form onSubmit={onChangeOu}>
    //                 <label htmlFor="name">Old user name</label>
    //                 <input type="text" name="name" value={user.userName} disabled={true}/>
                    
    //                 <label htmlFor="ou">OU</label>
    //                 <input type="text" name="ou" value={user.ou} disabled={true}/>
                    
    //                 <label htmlFor="newOu">New OU</label>
    //                 <input type="text" name="newOu" placeholder="Type new OU here"/>
                    
    //                 <label htmlFor="division">Division</label>
    //                 <input type="text" name="division" value={user.division} disabled={true}/>

    //                 <button type="submit">Update</button>
    //             </form>
    //         )
    //     }
    // }

    // const showChangeDivisionForm = (user, mode) => {
    //     if (mode==="editDivision") {
    //         return (
    //             <form onSubmit={onChangeDivision}>
    //                 <label htmlFor="name">Old user name</label>
    //                 <input type="text" name="name" value={user.userName} disabled={true}/>
                    
    //                 <label htmlFor="ou">OU</label>
    //                 <input type="text" name="ou" value={user.ou} disabled={true}/>
                    
    //                 <label htmlFor="division">Division</label>
    //                 <input type="text" name="division" value={user.division} disabled={true}/>

    //                 <label htmlFor="newDivision">New Division</label>
    //                 <input type="text" name="newDivision" placeholder="Type new Division here"/>
                    
    //                 <button type="submit">Update</button>
    //             </form>
    //         )
    //     }
    // }

    // const showChangeRoleForm = (user, mode) => {
    //     if (mode==="editRole") {
    //         return (
    //             <form onSubmit={onChangeRole}>
    //                 <label htmlFor="name">Old user name</label>
    //                 <input type="text" name="name" value={user.userName} disabled={true}/>
                    
    //                 <label htmlFor="ou">OU</label>
    //                 <input type="text" name="ou" value={user.ou} disabled={true}/>
                    
    //                 <label htmlFor="division">Division</label>
    //                 <input type="text" name="division" value={user.division} disabled={true}/>

    //                 <label htmlFor="newRole">New Role</label>
    //                 <input type="text" name="newRole" placeholder="Type new Role here"/>
                    
    //                 <button type="submit">Update</button>
    //             </form>
    //         )
    //     }
    // }

    const goBack = () => {
        setMode("initial")
    }

    const showFeedbackMessage = (mode, success) => {
        let message;
        switch (mode) {
            case "editName":
                message = "User Name changed sucessfully";
                break;
            case "editPassword":
                message = "Password changed sucessfully";
                break;
            case "editOu":
                message = "OU changed sucessfully";
                break;
            case "editDivision":
                message = "Division changed sucessfully";
                break;
            case "editRole":
                message = "Role changed sucessfully";
                break;
            default:
                message = "Error: No update was made";
                break;
        }
        console.log('mode', mode);
        console.log('success', success);
        return (
            <p>{success && message}</p>
        );
    }

    return (
        <>
            {showUserDetails(user, mode)}
            {showChangeNameForm(user, mode)}
            {showChangePasswordForm(user, mode)}
            {/* {showChangeOuForm(user, mode)}
            {showChangeDivisionForm(user, mode)}
            {showChangeRoleForm(user, mode)} */}
            {showFeedbackMessage(mode, success)}
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

