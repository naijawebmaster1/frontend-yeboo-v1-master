import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface IAuthLayout {
  title: string,
  subTitle: string,
  children: any,
}


function AuthLayout({ title, subTitle, children }: Readonly<IAuthLayout>) {

  const myLogo = require('../../assets/images/imgAuth/yeboo.png')
  const slide3 = require('../../assets/images/imgAuth/sliding2.jpg')
  const slide2 = require('../../assets/images/imgAuth/Slide-2.png')
  const slide1 = require('../../assets/images/imgAuth/Sliding1.jpg')
  const slidesArr = [
    require('../../assets/images/imgAuth/p0.jpg'),
    require('../../assets/images/imgAuth/p1.jpg'),
    require('../../assets/images/imgAuth/p2.jpg'),
    require('../../assets/images/imgAuth/p3.jpg'),
    require('../../assets/images/imgAuth/p4.jpg'),
    require('../../assets/images/imgAuth/p5.jpg'),
    require('../../assets/images/imgAuth/p7.jpg'),
    require('../../assets/images/imgAuth/p8.jpg'),
    require('../../assets/images/imgAuth/p9.jpg'),
    require('../../assets/images/imgAuth/p10.jpg')
  ]

  return (
    <section className="w-screen h-screen justify-between items-center flex">
      <div className=" hidden md:block h-screen w-full md:w-1/2 bg-black">
        <Carousel
          showDots={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          infinite={true}
          responsive={responsive}
          customLeftArrow={<div></div>}
          customRightArrow={<div></div>}
        >
          {
            slidesArr.map((item) => (
              <div key={item} className="w-full h-screen">
                <img src={item} alt="" id="slide-1" className="object-cover h-screen w-full" />
              </div>
            ))
          }

        </Carousel>
      </div>


      <div className="md:w-1/2 w-full items-center overflow-y-scroll h-screen text-charleston bg-white p-5 lg:px-40 lg:py-5" >
        <div className="flex flex-col justify-center items-center flex-1 min-h-full w-full">
          <Link to='/' className="flex justify-center items-center">
            <img src={myLogo} alt="LOGO" />
          </Link>
          <h2 className="my-3 font-bold text-charleston text-xl text-center">{title}</h2>
          <p className="text-center my-3">{subTitle}</p>

          {children}
        </div>


      </div>
    </section>
  );
}

export default AuthLayout;