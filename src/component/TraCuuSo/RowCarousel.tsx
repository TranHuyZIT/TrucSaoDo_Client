import { Row, Col, Card } from "antd";
import { convertDateString } from "../../utils/commonUtils";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Slider from "react-slick";

interface SoCoDo {
  MA_SO: number;
  NGAY_BD: string;
  NGAY_KT: string;
  L_TEN: string;
  TUAN: number;
}
interface RowCarouselProps {
  allSCD: SoCoDo[];
  handleCardClick: (scd: SoCoDo) => void;
}
const { Meta } = Card;

const ArrowButton: React.FC<{ direction: string }> = ({ direction }) => {
  return (
    <div className="arrow-btn">
      {direction === "left" ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
    </div>
  );
};

var settings = {
  dots: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const RowCarousel: React.FC<RowCarouselProps> = ({
  handleCardClick,
  allSCD,
}) => {
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {allSCD?.map((scd) => {
          return (
            <Card
              key={scd.MA_SO}
              onClick={() => {
                handleCardClick(scd);
              }}
              hoverable
              className="list-card"
              cover={
                <img
                  alt="sổ sao đỏ"
                  src="https://dtntbaolam.edu.vn/uploads/news/2018_09/logo-hddtw-chuan-2.jpg"
                />
              }
            >
              <Meta
                title={`Sổ Lớp ${scd.L_TEN} - Tuần ${scd.TUAN} - Mã Sổ ${scd.MA_SO}`}
                description={`${convertDateString(
                  scd.NGAY_BD
                )} đến ${convertDateString(scd.NGAY_KT)}`}
              />
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};
export default RowCarousel;
