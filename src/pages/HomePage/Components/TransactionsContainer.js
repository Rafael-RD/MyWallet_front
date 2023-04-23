import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userInfo } from "../../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsContainer() {
    const { REACT_APP_API_URL } = process.env;
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [reload, setReload]=useState(false);
    const { user: { token } } = useContext(userInfo);
    const navigate = useNavigate();

    useEffect(() => {
        setReload(false);
        (async () => {
            try {
                const resp = await axios.get(`${REACT_APP_API_URL}/transactions`, { headers: { Authorization: `Bearer ${token}` } });
                let auxtotal = 0;
                resp.data.forEach(e => {
                    if (e.type === 'inbound') auxtotal += e.value;
                    else if (e.type === 'outbound') auxtotal -= e.value;
                });
                setTotal(auxtotal);
                setTransactions(resp.data);
            } catch (error) {
                if (error.response.status === 401) navigate('/');
                else console.log(error);
            }
        })()
    }, [reload])

    async function deleteItem(id) {
        const confirmation = window.confirm('Deseja realmente excluir esse item?');
        try {
            const respDelete =await axios.delete(`${REACT_APP_API_URL}/transactions`, {data: {id}, headers: { Authorization: `Bearer ${token}` } });
            if(respDelete.status===200){
                setReload(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function showTransactions() {
        if (transactions.length === 0) return <span>Não há registros de<br />entrada ou saída</span>;
        else return (
            <ul>
                {transactions.map(e => {
                    return (
                        <ListItem key={e._id} type={e.type}>
                            <span>{`${(new Date(e.timestamp).getDate())}/${(new Date(e.timestamp).getMonth())}`}</span><div>{e.description}<span>{e.value.toFixed(2).replace('.', ',')}</span></div><button onClick={() => deleteItem(e._id)}>X</button>
                        </ListItem>
                    )
                })}
            </ul>
        )
    }

    return (
        <Container>
            {showTransactions()}
            <Total negative={total < 0} hide={transactions.length === 0}>
                SALDO
                <span>{total.toFixed(2).replace('.', ',')}</span>
            </Total>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFFFF;
    align-items: center;
    width: 100%;
    height: 75%;
    /* background-color: blue; */
    padding: 20px 10px;

    ul{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        height: 100%;
    }
    
    &>span{
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 25px;
        text-align: center;
        color: #868686;
    }

`;

const ListItem = styled.li`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    align-items: center;

    &>span{
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #c6c6c6;
    }

    &>button{
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #c6c6c6;
        outline: none;
        border: none;
        background: none;
        cursor: pointer;
    }
    
    div{
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        margin: 0 10px;
        font-size: 16px;
        color: #000000;
        
        span{
            font-family: 'Raleway', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: ${props => props.type === 'inbound' ? '#03AC00' : '#C70000'};
        }
    }
    `;

const Total = styled.div`
    display: ${props => props.hide ? 'none' : 'flex'};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #000000;

    span{
        font-weight: 400;
        color: ${props => props.negative ? '#C70000' : '#03AC00'};
    }
`;