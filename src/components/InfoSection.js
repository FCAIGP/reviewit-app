import React from 'react'
import { Column1, Column2, Heading, InfoContainer, InfoRow, InfoWrapper, Subtitle, TextWrapper, TopLine , ImgWrap , Img } from './InfoElement';
const InfoSection = ({id , lightBg , lightText , lightTextDesc , topLine , headLine , describtion , imgStart , alt , img , darkText}) => {
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
                                <Img src={img} alt={alt}/>
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </>
    )
}

export default InfoSection;
