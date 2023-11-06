import mongoose from 'mongoose';


export async function connect () {
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDB conectado correctamente');
        })
        connection.on('error',(err)=>{
            console.log('Error de conexion con MongoDB. Por favor, asegurate que MongoDB esta corriendo. '+err);
            process.exit();
        })

    }catch(error){
        console.log('Algo salio mal');
        console.log(error);
    }
}