import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../assets/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const{ signIn, loading } = useContext(AuthContext);

    async function handleLogin(e){
        e.preventDefault()

        if(email !== "" && password !== ""){
            await signIn(email, password)
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logotipo'/>
                </div>
                <form onSubmit={handleLogin}>
                    <h1>Entrar</h1>
                    <input type='text'
                    placeholder='email@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                    <input type='text' 
                    placeholder='******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                    <button type='submit'>{loading ? "Carregando..." : "Acessar"}</button>
                </form>
                <button className='google-button'>Sign In with Google</button>
                <Link to="/cadastrar">Crie sua conta</Link>
            </div>
        </div>
    )
}