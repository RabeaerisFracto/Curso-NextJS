import '@picocss/pico'


export default function UserProfile ({params}:any){
    return(
        <div>
            <h1>Perfil de Usuario</h1>
            <hr />
            <p>Perfil {params.id}</p>
        </div>
    ) 
}