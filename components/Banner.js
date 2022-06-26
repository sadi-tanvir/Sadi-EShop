import React from 'react';
import Image from "next/image"


const Banner = () => {
    const banner_1 = "/assets/images/banner/banner.png"
    const banner_2 = "/assets/images/banner/banner-2.png"
    const banner_3 = "/assets/images/banner/banner-3.png"
    return (
        <>
            <header className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <Image src={banner_1} className="w-full" layout="fill" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <Image src={banner_2} className="w-full" layout="fill" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={banner_3} className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Banner;