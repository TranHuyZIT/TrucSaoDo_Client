import Authentication from "./component/Authentication/Authentication";
import NhapSo from "./component/NhapSo/NhapSo";
import ThongKe from "./component/ThongKe/ThongKe";
import TraCuuSo from "./component/TraCuuSo/TraCuuSo";

const routers = [
  {
    path: "/",
    name: "Tra Cứu Sổ",
    component: TraCuuSo,
  },
  {
    path: "/login",
    component: Authentication,
  },
  {
    path: "/nhapso",
    name: "Nhập Sổ",
    component: NhapSo,
  },
  {
    path: "/thongke",
    name: "Thống Kê",
    component: ThongKe,
  },
];

export default routers;
