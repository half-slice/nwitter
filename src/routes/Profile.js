import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection,getDocs,orderBy,query,where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default ({ userObj,refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
    }

    const getMyNweets = async() => {
        // 필터링 하는 코드
        const nweets = await getDocs(query(collection(dbService,"nweets")
            ,where("creatorId","==",userObj.uid)
            ,orderBy("createdAt")));
        //console.log(nweets.docs.map(doc => doc.data()));

    }

    useEffect(()=>{
        getMyNweets();
    })

    const onChange = (event) => {
        const { 
            target : { value },
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(authService.currentUser,{displayName : newDisplayName });
            refreshUser();
        }
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    value={newDisplayName} 
                    onChange={onChange} 
                    placeholder="Display name"
                    autoFocus 
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};