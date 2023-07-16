import logo from '../../assets/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function SignUp(){
    
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signUp, loading } = useContext(AuthContext)


    async function handleSubmit(e){
        e.preventDefault();

        if(nome !== "" && email !== "" && password !== ""){
           await signUp(email, password, nome);
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logotipo'/>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Junte-se à nós</h1>
                    <input type='text'
                    placeholder='Nome'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}/>

                    <input type='text'
                    placeholder='email@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                    <input type='text' 
                    placeholder='******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                    <button type='submit'>
                        {loading ? "Carregando..." : "Cadastrar"}
                    </button>
                </form>
                
                <Link to="/">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}