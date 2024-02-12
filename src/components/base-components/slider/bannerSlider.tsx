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

interface ISlider{
    children: any
    xl?: any,
    md?: any,
    sm?: any
}

export default function BannerSlider({children}: ISlider ) {


  return (
    <div style={{
    //   marginBottom: "2rem",
    //   maxWidth: '1350px',
    //   margin: '0px auto',
    //   padding: '0 1rem',
    }}>
     
      <Carousel
        showDots={false}   
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        responsive={responsive}
        customLeftArrow={<div></div>}
        customRightArrow	={<div></div>}
      >
        {children}
      </Carousel>
    </div>
  );
}