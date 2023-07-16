import { useState, createContext, useEffect } from "react";
import { auth, db } from '../services/firebaseconection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


export const AuthContext = createContext({});



function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingDashboard, setLoadingDashboard] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem("@dataUser")

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoadingDashboard(false)
            }
            setLoadingDashboard(false)
        }

        loadUser()
    }, [])

    async function signUp(email, password, nome){  
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid
            await setDoc(doc(db,"users", uid), {
                nome: nome,
                email: value.user.email,
                avatarUrl: null
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                }
                setUser(data);
                storageUser(data);
                setLoading(false);
                toast.success("Bem vindo ao Sistema");
                navigate('/dashboard');
            })
            
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    function storageUser(data){
        localStorage.setItem("@dataUser", JSON.stringify(data))
    }

    async function signIn(email, password){
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value)=> {
            let uid =value.user.uid;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);


            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data);
            localStorage.setItem("@dataUser", JSON.stringify(data))
            setLoading(false);
            toast.success("Bem vindo ao Sistema");
            navigate('/dashboard');
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }

    async function logout(){
        await signOut(auth);
        localStorage.removeItem("@dataUser");
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signUp,
            loading,
            signIn,
            loadingDashboard,
            logout,
            storageUser,
            setUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

