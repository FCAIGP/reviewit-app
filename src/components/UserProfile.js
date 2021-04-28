import React from 'react'
import {useState, useEffect} from 'react'
import {getUser} from '../utils/api'

function UserProfile({match}){
    const [userInfo, setUser] = useState([])
    const fetchUser = async ()=>{
        getUser(match.params.userId).then(function(response){
            setUser(response)
        })
    }
    
    useEffect(() => {
        fetchUser()
      }, []);

    return (
        <div>
            <p> First Name: {userInfo.firstName} </p>
            <p> Last Name: {userInfo.lastName} </p>
            <p> Current Job: {userInfo.currentJob} </p>
            <p> Date hired: {userInfo.dateHired} </p>
            <p> Bio: {userInfo.bio} </p>
        </div>)
}

export default UserProfile;