import React from "react";
import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import { 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithPopup,
} from "firebase/auth";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = () => {
    const onSocialClick = async(event) => {
        const {
            target:{name},
        } = event;
        let provider;
        try{
            if(name ==="google"){
                provider = new GoogleAuthProvider();
            }
            else if(name==="github"){
                provider = new GithubAuthProvider();
            }
        }
        catch(error){
            console.log(error);
        }
        await signInWithPopup(authService, provider);
    }
     return(
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}
export default Auth;