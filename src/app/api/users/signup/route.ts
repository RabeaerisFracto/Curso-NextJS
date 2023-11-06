import {connect} from "@/dbConfig/dbConfig";//conectarse a DB
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";//Para encriptar data

connect()

export async function POST(request: NextRequest){//tb puede ser get u otra peticion.
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);
        //vertificar si usuario existe
        const user = await User.findOne({email})
        if(user){return NextResponse.json({error:"usuario ya existe"},{status:400})}
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            messege:"Usuario creado de manera exitosa",
            success: true,
            savedUser
        })

    }catch (error:any){
        return NextResponse.json({error:error.messege},
            {status: 500})
    }
}