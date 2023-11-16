"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import '@picocss/pico'
import axios from "axios";
import '../styles/logsign.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'



export default function SignupPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

    const onSignup = async ()=>{
        try{
            setLoading(true);
            const response = await axios.post('/api/users/signup',user);//conexion con API
            console.log("Signup exisoto", response.data)
            router.push("/login")
        }catch(error:any){console.log("error catch L29 signup/page.tsx")}
        finally{setLoading(false)}
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }else {setButtonDisabled(true)}
    },[user])

    return(
            <div className="cuadro-signup">
                <h1>{loading ? "Processing" : "Signup"}</h1>
                <hr />
                <input 
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Usuario"
                    />
                <input 
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="e-mail"
                    />
                <input 
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Contraseña"
                    />
                    <button
                    onClick={onSignup}>{buttonDisabled ? "..." : "Registrate"}</button>
                    <Link href="/login">Ya tienes cuenta?</Link>
                </div>
            )
        }

//event => event.preventDefault()