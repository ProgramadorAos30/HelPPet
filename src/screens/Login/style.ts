import styled from "styled-components";
import { loginBg } from "../../assets";

export const Container = styled.div`
    height: 100vh;
    background: url(${loginBg}) no-repeat center center;
    position:relative;

    > div { 
        position: absolute;
        top: 177px;
        left: 186.01px;
        padding: 89px 98px;
        background: ${props => props.theme.colors.white};
        width: 568px;
        height: 727px;
        border-radius: 40px;

        > img { 
            width: 191.16px;
            height: 48.07px;
            margin-bottom: 40px;
        }

        > p { 
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 29px;
            display: flex;
            align-items: center;
            color: #AFAFAF;
            margin-bottom: 16px;
        }

        > h1 { 
            font-style: normal;
            font-weight: 600;
            font-size: 32px;
            line-height: 45px;
            color: #0A3466;
            width: 300px;
            margin-bottom: 40px;
        }

        > form {

            > p {
                text-align: right;
                border-bottom: 1px solid #0A3466;
                color: #0A3466;
                cursor: pointer;
                margin-bottom: 51px;
                float: right;
            }

            > button {
                width: 100%;
                height: 48px;
                border: none;
                color: ${props => props.theme.colors.white};
                background: ${props => props.theme.colors.gradient};
            }

            > div {
                margin-bottom: 24px;
            }
        }
    }
`;