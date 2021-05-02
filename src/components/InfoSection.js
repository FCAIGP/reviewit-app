import React from 'react'
import { Column1, Column2, Heading, InfoContainer, InfoRow, InfoWrapper, Subtitle, TextWrapper, TopLine , ImgWrap , Img } from './InfoElement';
import img1 from '../assets/img1.svg';
const InfoSection = ({id , lightBg , lightText , lightTextDesc , topLine , headLine , describtion , imgStart , alt , darkText}) => {
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                    <InfoRow imgStart={imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{topLine}</TopLine>
                                <Heading lightText={lightText}>{headLine}</Heading>
                                <Subtitle darkText={darkText}>{describtion}</Subtitle>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={img1} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default InfoSection;
