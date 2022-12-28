import { Row, Col, Card } from "antd";
import { convertDateString } from "../../utils/commonUtils";
import { useEffect, useState } from "react";
import Slider from "react-slick";

interface SoCoDo {
  MA_SO: number;
  NGAY_BD: string;
  NGAY_KT: string;
  L_TEN: string;
  TUAN: number;
  UPDATED_AT: string;
  DIEM_TRU?: number;
}
interface RowCarouselProps {
  allSCD: SoCoDo[];
  handleCardClick: (scd: SoCoDo) => void;
  title: string;
}
const { Meta } = Card;

const RowCarousel: React.FC<RowCarouselProps> = ({
  handleCardClick,
  allSCD,
  title,
}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: Math.min(4, allSCD.length),
    slidesToScroll: Math.min(4, allSCD.length),
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, allSCD.length),
          slidesToScroll: Math.min(3, allSCD.length),
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, allSCD.length),
          slidesToScroll: Math.min(2, allSCD.length),
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
              onMouseDown={(e) => e.preventDefault()}
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
                description={
                  title === "time"
                    ? `Cập nhật vào lúc: ${scd.UPDATED_AT}`
                    : `Điểm Trừ: ${scd.DIEM_TRU}`
                }
              />
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};
export default RowCarousel;
