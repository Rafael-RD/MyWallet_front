import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import TransactionsContainer from "./Components/TransactionsContainer";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userInfo } from "../../App";

export default function HomePage() {
    const { user, setUser}=useContext(userInfo);
    const navigate=useNavigate();

    function logoff(){
        localStorage.removeItem('userInfo');
        setUser({});
        navigate('/');
    }

    return (
        <Page>
            <Container>
                <CustomHeader>
                    <span>Olá, Fulano</span>
                    <IoLogOutOutline onClick={logoff} />
                </CustomHeader>
                <TransactionsContainer />
                <ActionsContainer>
                    <div onClick={()=>navigate('/nova-transacao/entrada')}>
                        <AiOutlinePlusCircle />
                        <span>Nova <br/> entrada</span>
                    </div>
                    <div onClick={()=>navigate('/nova-transacao/saida')}>
                        <AiOutlineMinusCircle />
                        <span>Nova <br/> saída</span>
                    </div>
                </ActionsContainer>
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
    height: 95%;
    max-height: 800px;
    width: 90%;
    max-width: 600px;
    align-items: center;
    justify-content: space-between;
`;

const CustomHeader = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5%;
    padding-bottom: 10px;

    span{
        color: #FFFFFF;
        font-family: 'Raleway', sans-serif;
        font-weight: 700;
        font-size: 26px;
    }

    svg{
        color: #FFFFFF;
        width: 30px;
        height: auto;
        cursor: pointer;
    }
`;



const ActionsContainer = styled.div`
    display: flex;
    width: 100%;
    height: 20%;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;

    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        background-color: #A328D6;
        width: 48%;
        height: 100%;
        cursor: pointer;

        svg{
            margin: 10px 0 0 10px;
            color: #FFFFFF;
            width: 25px;
            height: auto;
        }

        span{
            margin: 0 0 10px 10px;
            color: #FFFFFF;
            font-family: 'Raleway', sans-serif;
            font-weight: 700;
            font-size: 22px;
        }
    }
`;

