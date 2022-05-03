import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject,ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing,setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef = doc(dbService,`nweets/${nweetObj.id}`);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            //위에 있는 NweetTextRed로 바꿔도 됨
            await deleteDoc(doc(dbService,`nweets/${nweetObj.id}`));
            await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
    }

    const toggleEditing = () => {
        setEditing((prev)=>!prev);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef,{
            text : newNweet,
        });
        setEditing(false);
    };

    const onChange = (event) => {
        const {target : {value},} = event;
        setNewNweet(value);
    }
    //보안에 신경쓰고 싶다면 form에 {isOwner && 폼} 으로 덮어주면 됨 
    return (
        <div className="nweet">
            {editing ? (
                <> 
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            type="text" 
                            placeholder="Edit your nweet" 
                            value={newNweet}
                            onChange={onChange} 
                            required 
                            autoFocus
                            className="formInput"
                        />
                       <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing}>Cancle</button>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Nweet;