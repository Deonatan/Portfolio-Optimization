import React from "react";
import { Layout } from "antd";
import { Navbar } from "./Components/navbar";
import { Sidebar } from "./Components/sidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Equities } from "./Components/equities";

const { Footer } = Layout;

const App = () => {
  
  return (
    <Router>
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Layout className="site-layout">
        <Sidebar />
        <Layout className="site-layout">
          <Routes>
            <Route path="/assets/equities" element = {<Equities />}/>
          </Routes>
          <Footer className="custom-footer" style={{ textAlign: "center" }}>
            DIP Project ©2023 E029
          </Footer>
        </Layout>
      </Layout>
    </Layout>
    </Router>
  );
};

export default App;
