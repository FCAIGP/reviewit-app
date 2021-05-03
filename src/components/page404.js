import React from 'react';
import {HomeContainter , HomeBg , VideoBg , HomeContent , HomeH1} from './HomeElement';
import Video from '../assets/video_404.mp4';

const page404 = () => {
    return (
        <>
            <h1>hello</h1>
            <HomeContainter>
                <HomeBg>
                    <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
                </HomeBg>
                <HomeContent>
                    <HomeH1> ERORR 404 </HomeH1>
                </HomeContent>
            </HomeContainter>
        </>
    )
}

export default page404;