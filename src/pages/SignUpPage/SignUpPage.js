import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function SignUpPage() {
    const {REACT_APP_API_URL} = process.env;
    const [form, setForm]=useState({name: '', email: '', password: '', passwordComfirm: ''});
    const [wrong, setWrong]=useState(false);
    const navigate=useNavigate();

    function formChangeHandler(e){
        const {name, value}=e.target;
        setForm({...form, [name]: value});
    }

    async function submitHandler(e){
        e.preventDefault();
        if(form.password!==form.passwordComfirm){
            setForm({...form, password: '', passwordComfirm: ''});
            setWrong(true);
            alert('Senhas não coincidem')
            return;
        }
        try{
            await axios.post(`${REACT_APP_API_URL}/sign-up`, {name: form.name, email: form.email, password: form.password});
            navigate('/');
        }
        catch(err){
            console.error(err);
        }
        
    }


    return (
        <Page>
            <Container>
                <h1>MyWallet</h1>
                <CustomForm onSubmit={submitHandler} wrong={wrong} >
                    <input type="text" onChange={formChangeHandler} value={form.name} placeholder="Nome" name="name" required />
                    <input type="email" onChange={formChangeHandler} value={form.email} placeholder="E-mail" name="email" required />
                    <input type="password" onChange={formChangeHandler} value={form.password} placeholder="Senha" name="password" required />
                    <input type="password" onChange={formChangeHandler} value={form.passwordComfirm} placeholder={wrong?"Senhas devem ser iguais":"Comfirme a senha"} name="passwordComfirm" required />
                    <button>Cadastrar</button>
                </CustomForm>
                <Link to='/' >Já tem uma conta? Entre agora!</Link>
            </Container>
        </Page>
    )
}

const Page = styled.div`
    display: flex;
    background-color: #8C11BE;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    h1{
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 25px;
    }

    a{
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 15px;
        text-decoration: none;
        color: #FFFFFF;
        margin-top: 35px;
    }

    `;

const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 325px;

    input{
        height: 60px;
        width: 100%;
        border: none;
        border-radius: 5px;
        margin-bottom: 10px;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
        outline: none;
        padding-left: 15px;
    }
    input::placeholder{
        color: ${props=>props.wrong?'#ff0000':'#757575'};
    }

    button{
        height: 45px;
        width: 100%;
        background-color: #A328D6;
        border: none;
        border-radius: 5px;
        outline: none;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 20px;
        color: #FFFFFF;
    }
`;