"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import '@picocss/pico'
import '../styles/logsign.css'


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        password:"",
        username:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Logueo exitoso", response.data);
            router.push("/profile")
        } catch (error:any) {
            console.log("logueo fallido", error.messege)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{setButtonDisabled(true)}
    },[user])
    
    return(
    <div className="cuadro-signup">
        <h1>{loading? "Entrando":"Ingresa tu cuenta"}</h1>
        <hr />
        <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=> setUser({...user,username:e.target.value})}
            placeholder="Login"
            aria-label="Login"
            autoComplete="nickname"
            required
        />
        <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=> setUser({...user,password:e.target.value})}
            name="password"
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            required
        />
        <fieldset>
            <label htmlFor="remember">
            <input type="checkbox" role="switch" id="remember" name="remember" />
            Recuerdame 🎶
            </label>
        </fieldset>
        <button type="submit" className="contrast" onClick={onLogin}>{buttonDisabled?"..." :"Logear"}</button>
        <Link href="/signup"> No tienes cuenta? registrate! </Link>
    </div>
)
}