import { Row } from "antd";
import React from "react";
import Authentication from "./component/Authentication/Authentication";
import Navbar from "./component/Navbar/Navbar";
import NhapSo from "./component/NhapSo/NhapSo";

function App() {
  return (
    <div className="App">
      <Row>
        <Navbar />
      </Row>
      <NhapSo />
    </div>
  );
}

export default App;
