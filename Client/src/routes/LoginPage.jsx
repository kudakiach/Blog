import React from "react"
import { SignIn } from "@clerk/clerk-react"


const LoginPage = () => {
    return(
        <div className="flex items-center justify-center"> 
            <SignIn signInUrl="register"/>
        </div>
    )
}

export default LoginPage