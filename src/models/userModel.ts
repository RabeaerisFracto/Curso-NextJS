import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"porfavor, ingresa tu nombre de usuario"],
        unique:true,
    },
    email:{
        type: String,
        required: [true,"porfavor, ingresa tu email"],
        lowercase: true,
        inmmutable: true,
        unique:true,
    },
    password:{
        type: String,
        required: [true,"porfavor, ingresa tu contraseña"],
        minLength: 10,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

//1ero si es que esta creado || sino crear 1
const User =mongoose.models.users || mongoose.model("users", userSchema);

export default User; //idealmente mayus