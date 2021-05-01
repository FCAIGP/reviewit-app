import React from 'react';
import { HomeContainter , HomeBg , VideoBg , HomeContent , HomeH1 , HomeP} from './HomeElement';
import Video from '../assets/video.mp4';
import InfoSection from './InfoSection';
import { homeObjOne , homeObjTwo } from './HomeData';
//TODO (Sisy): design homepage

function Home() {
    return (
        <>
            <HomeContainter>
                <HomeBg>
                    <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
                </HomeBg>
                <HomeContent>
                    <HomeH1> Review It </HomeH1>
                    <HomeP>
                    Many employees join companies without knowing anything about them.
                     No matter how desperate an employee is for a job there are some companies he is better off not working for. 
                    </HomeP>
                </HomeContent>
            </HomeContainter>
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
        </>
    );
}

export default Home;