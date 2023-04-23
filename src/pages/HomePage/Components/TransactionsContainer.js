import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { userInfo } from "../../../App";
import axios from "axios";

export default function TransactionsContainer(){
    const {REACT_APP_API_URL}=process.env;
    const [transactions, setTransactions]=useState([]);
    const [total, setTotal]=useState(0);
    const {user:{token}}=useContext(userInfo);

    useEffect(()=>{
        console.log(token);

        (async ()=>{
            try {
                const resp=await axios.get(`${REACT_APP_API_URL}/transactions`,{ headers: { Authorization: `Bearer ${token}` } });
                let auxtotal=0;
                resp.data.forEach(e=>{
                    if(e.type==='inboud') auxtotal+=e.value;
                    else if(e.type==='outbound') auxtotal-=e.value;
                });
                setTotal(auxtotal);
                console.log(resp);
                setTransactions(resp.data);
            } catch (err) {
                console.log(err);
            }
        })()
    },[])
    
    function showTransactions(){
        if(transactions.length===0) return <span>Não há registros de<br />entrada ou saída</span>;
        else return (
            <ul>
                {transactions.map(e=>{
                    return(
                        <ListItem key={e._id} type={e.type}>
                            <span>{`${(new Date(e.timestamp).getDate())}/${(new Date(e.timestamp).getMonth())}`}</span><div>{e.description}<span>{e.value.toFixed(2).replace('.',',')}</span></div>
                        </ListItem>
                    )
                })}
            </ul>
        )
    }

    return(
        <Container>
            {showTransactions()}
            <Total negative={total<0}>
                SALDO
                <span>{total.toFixed(2).replace('.',',')}</span>
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

const ListItem=styled.li`
    display: flex;
    width: 100%;
    margin-bottom: 20px;

    &>span{
        margin-right: 10px;
        font-family: 'Raleway', sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: #c6c6c6;
    }
    
    div{
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        
        span{
            font-family: 'Raleway', sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: ${props=>props.type==='inbound'?'#03AC00':'#C70000'};
        }
    }
    `;

const Total=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #000000;

    span{
        font-weight: 400;
        color: ${props=>props.negative?'#C70000':'#03AC00'};
    }
`;