import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiUser } from "react-icons/fi"
import { useState } from "react"
import { db } from "../../services/firebaseconection"
import { addDoc, collection, doc } from "firebase/firestore"
import { toast } from "react-toastify"

export default function Customers(){
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");

    async function handleRegister(e){
        e.preventDefault();

        if(nome !== "" && cnpj !== "" && endereco !== ""){
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=>{
                setNome("");
                setCnpj("");
                setEndereco("");
                toast.success("Empresa cadastrada com sucesso!")
            })
            .catch((error) =>{
                console.log(error);
                toast.error("Algo deu errado!")
            })
        }else{
            toast.error("Preencha todos os campos")
        }
    }
    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome fantasia</label>
                        <input type="text"
                        placeholder="Nome da empresa"
                        value={nome}
                        onChange={(e) => {setNome(e.target.value)}}/>

                        <label>CNPJ</label>
                        <input type="text"
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={(e) => {setCnpj(e.target.value)}}/>

                        <label>Endereco</label>
                        <input type="text"
                        placeholder="Nome da empresa"
                        value={endereco}
                        onChange={(e) => {setEndereco(e.target.value)}}/>

                        <button type="Submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}