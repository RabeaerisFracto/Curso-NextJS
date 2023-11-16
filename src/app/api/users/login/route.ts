import {connect} from "@/dbConfig/dbConfig";//conectarse a DB
import User from "@/models/userModel";//importar scheema
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";//Para encriptar data, atento Bcrypt con mayus es !=
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, password} = reqBody
        //existe usuario?
        const user = await User.findOne({username})
        if(!user){return NextResponse.json({error: "Usuario no existe"},{status:400})}
        //clave correcta?
        const contraseñaValida = await bcryptjs.compare(password, user.password)
        if(!contraseñaValida){return NextResponse.json({error:"contraseña incorrecta"},{status:400})}
        //crear token data
        const tokenData = {//para enviar una cookie con data encriptada al cliente
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET,{expiresIn:"1h"})
        const response = NextResponse.json({
            messege:"logeado correctamente",
            success: true,
        })
        response.cookies.set("token", token, {httpOnly: true,})//tb puede ser get en vez de set, dependiendo de la necesidad.
        return response;
    } catch (error) {
        
    }
}