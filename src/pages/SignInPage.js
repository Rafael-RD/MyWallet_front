import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userToken } from "../App";
import axios from "axios";

export default function SignInPage() {
    const {REACT_APP_API_URL}=process.env;
    const {token, setToken}=useContext(userToken);
    const [form, setForm]=useState({email: '', password: ''});
    const navigate=useNavigate();

    // useEffect(async ()=>{
    //     token
    // },[])

    function formChangeHandler(e){
        const {name, value}=e.target;
        setForm({...form, [name]: value});
    }


    async function submitHandler(e) {
        e.preventDefault();
        try {
            const resp=await axios.post(`${REACT_APP_API_URL}/login`,form);
            console.log(resp);
            setToken(resp.data.token);
            navigate('/home');
        } catch (err) {
            if(err.response.status===404) alert('Email não cadastrado');
            else if(err.response.status===401) alert('Senha incorreta');
            else console.error(err);
        }
    }

    return (
        <Page>
            <Container>
                <h1>MyWallet</h1>
                <CustomForm onSubmit={submitHandler}>
                    <input type="email" onChange={formChangeHandler} value={form.email} placeholder="E-mail" name="email" required />
                    <input type="password" onChange={formChangeHandler} value={form.password} placeholder="Senha" name="password" required />
                    <button>Entrar</button>
                </CustomForm>
                <Link to='/cadastro' >Primeira vez? Cadastre-se!</Link>
            </Container>
        </Page>
    );
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