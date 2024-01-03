import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const images = [
    "https://morgancosmetics.co.uk/cdn/shop/files/Choose_your_style_1024x1024.webp?v=1698698696",
    "https://img.ltwebstatic.com/images3_ccc/2023/12/26/5b/170355866800469e3e027f85452377ac76f2e9902d_thumbnail_2000x.webp",
    "https://img.ltwebstatic.com/images3_ccc/2023/12/22/1f/1703242784df4df967bfb63509e0f7910c4c0ce052_thumbnail_2000x.webp",
    "https://morgancosmetics.co.uk/cdn/shop/files/Choose_your_style_1024x1024.webp?v=1698698696",
    "https://img.ltwebstatic.com/images3_ccc/2023/12/22/1f/1703242784df4df967bfb63509e0f7910c4c0ce052_thumbnail_2000x.webp",
    "https://img.ltwebstatic.com/images3_ccc/2023/12/26/5b/170355866800469e3e027f85452377ac76f2e9902d_thumbnail_2000x.webp",
    // Add more image URLs for the carousel
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <div />,
    nextArrow: <div />,
  };

  return (
    <div className="custom-slider-wrapper">
      <style>
        {`
          .custom-slider-wrapper .slick-prev,
          .custom-slider-wrapper .slick-next {
            display: none !important;
          }
        `}
      </style>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div
              className={`relative min-h-[50vh] 700px:min-h-[80vh] container mx-auto bg-no-repeat ${styles.noramlFlex}`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div></div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
