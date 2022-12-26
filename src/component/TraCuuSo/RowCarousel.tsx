import { Row, Col, Card } from "antd";
import { convertDateString } from "../../utils/commonUtils";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
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

const RowCarousel: React.FC<RowCarouselProps> = ({
  handleCardClick,
  allSCD,
}) => {
  return (
    <>
      <Col span={1}>
        <ArrowButton direction="left" />
      </Col>
      {allSCD?.map((scd) => {
        return (
          <Col span={4}>
            <Card
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
          </Col>
        );
      })}
      <Col span={1}>
        <ArrowButton direction="right" />
      </Col>
    </>
  );
};
export default RowCarousel;
