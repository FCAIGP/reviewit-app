import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

export const HomeContainter = styled.div`
    background: #0c0c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1
`

export const HomeBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    filter: brightness(30%);
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`


export const HomeContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const HomeH1 = styled.h1`
    color:#fff;
    font-size: 48px;
    text-align: center;

    @media screen and {max-width: 768px} {
        font-size: 40px;
    }

    @media screen and {max-width: 480px} {
        font-size: 192px;
    }
`

export const HomeP = styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    max-width: 600px;
    
    @media screen and {max-width: 768px} {
        font-size: 30px;
    }

    @media screen and {max-width: 480px} {
        font-size: 20px;
    }

`