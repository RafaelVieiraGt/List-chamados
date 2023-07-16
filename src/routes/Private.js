import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth"; 

export default function Private({children}){

    const { signed, loadingDashboard } = useContext(AuthContext)

    if(loadingDashboard){
        return(
            <div>
                <span>Carregando</span>
            </div>
        )
    }

    if(!signed){
        return <Navigate to="/"/>;       
        
    }


    return children
}