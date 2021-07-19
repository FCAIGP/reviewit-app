import React, {useEffect, useState} from 'react'
import {getUser} from '../utils/api'

function UserProfile({match}) {
    const [userInfo, setUser] = useState([])

    useEffect(() => {
        getUser(match.params.userId).then(res => setUser(res));
    }, [match.params.userId]);

    return (
        <div>
            <p> First Name: {userInfo.firstName} </p>
            <p> Last Name: {userInfo.lastName} </p>
            <p> Current Job: {userInfo.currentJob} </p>
            <p> Date hired: {userInfo.dateHired} </p>
            <p> Bio: {userInfo.bio} </p>
            <p>Image:{userInfo.image}</p>
        </div>)
}

export default UserProfile;