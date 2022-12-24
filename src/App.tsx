import { Row } from "antd";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routers from "./router";
function App() {
  return (
    <Router>
      <div className="App">
        <Row>
          <Navbar />
        </Row>
      </div>
      <Routes>
        {routers.map((router: { path: string; component: any }) => {
          return (
            <Route
              key={router.path}
              path={router.path}
              element={<router.component />}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
