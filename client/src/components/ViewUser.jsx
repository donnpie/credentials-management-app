import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const ViewAll = () => {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    
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

    //Render a single user
    const renderUser = (user, idx) => {
        return (<tr key={idx}>
                <td>{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.role}</td>
                <td>{user.ou}</td>
                <td>{user.division}</td>
                <td><a href={"/user/"+user._id}>Edit</a></td>
            </tr>)
    }

    //Render array of users
    const mapUsers = (users) => {
        const userMap = users.map((user, idx) => {
            return renderUser(user, idx);
        });
        return userMap;
    }

    return (
        <>
            <ul>
                <li>Id: {user._id}</li>
                <li>User name: {user.userName}</li>
                <li>Role: {user.role}</li>
                <li>OU: {user.ou}</li>
                <li>Division: {user.division}</li>
            </ul>
            {/* Pass props down to edit user */}
            <ul>
                <li><a href="">Edit User Name (Requires  Management role)</a></li>
                <li><a href="">Edit password (Requires  Management role)</a></li>
                <li><a href="">Edit OU (Requires  Admin role)</a></li>
                <li><a href="">Edit Division (Requires  Admin role)</a></li>
                <li><a href="">Edit Role (Requires  Admin role)</a></li>
            </ul>
        </>
    )
}

export default ViewAll;