import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editInfo, userInfo } from "../../App";
import styled from "styled-components";
import axios from "axios";

export default function EditionPage() {
    const { REACT_APP_API_URL } = process.env;
    const { type } = useParams();
    const { user: { token } } = useContext(userInfo);
    const { toEdit } = useContext(editInfo);
    const [form, setForm] = useState({ description: toEdit.description, value: toEdit.value });
    const navigate = useNavigate();

    useEffect(() => {
        if (type !== 'saida' && type !== 'entrada') return navigate('/home');
        if (!token) navigate('/');
    })

    function formChangeHandler(e) {
        const { name, value } = e.target;
        if (name === 'value') {
            const _value = Number(value);
            if (isNaN(_value)) return navigate('/home');
            setForm({ ...form, [name]: Math.round((_value + Number.EPSILON) * 100) / 100 });
        } else setForm({ ...form, [name]: value });
    }

    async function formSubmitHandler(e) {
        e.preventDefault();
        try {
            const resp = await axios.put(`${REACT_APP_API_URL}/transactions`, { ...form, id: toEdit._id }, { headers: { authorization: `Bearer ${token}` } });
            if(resp.status===200) navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Page>
            <Container>
                <span>Editar {type === 'entrada' ? 'entrada' : 'saída'}</span>
                <CustomForm onSubmit={formSubmitHandler} >
                    <input type="number" onChange={formChangeHandler} value={form.value} placeholder="Valor" name="value" step='0.01' min='0' required />
                    <input type="text" onChange={formChangeHandler} value={form.description} placeholder="Descrição" name="description" required />
                    <button>Atualizar {type === 'entrada' ? 'entrada' : 'saída'}</button>
                </CustomForm>
            </Container>
        </Page>
    )
}

const Page = styled.div`
    display: flex;
    background-color: #8C11BE;
    height: 100vh;
    width: 100%;
    justify-content: center;
    `;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    min-width: 325px;
    margin-top: 25px;
    
    span{
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    }
`;

const CustomForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 15px;

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