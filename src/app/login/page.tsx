"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Axios } from "axios";
import '@picocss/pico'
import '../styles/logsign.css'


export default function LoginPage(){
    const [user, setUser] = React.useState({
        password:"",
        username:""
    })
    
    const onLogin = async ()=>{
        
    }

    return(
    <div>
    <div className="cuadro-signup">
        <div>
            <h1>Login</h1>
            <h2>Ingresa a tu cuenta</h2>
        </div>
        <form >
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
        <button type="submit" className="contrast" onClick={onLogin}>Registrarse</button>
        </form>
        <Link href="/signup"> No tienes cuenta? registrate! </Link>
    </div></div>
)
}