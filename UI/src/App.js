import React from "react";
import { Layout } from "antd";
import { Navbar } from "./Components/navbar";
import { Sidebar } from "./Components/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Equities } from "./Components/equities";
import { FixedIncome } from "./Components/fixedincome";
import { Commodities } from "./Components/commodities";
import { Crypto } from "./Components/crypto";
import { Portfolio } from "./Components/portfolio";
import { Analytics } from "./Components/analytics";

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
              <Route path="/" element={<Portfolio />} />
              <Route path="/assets/equities" element={<Equities />} />
              <Route path="/assets/fixed-income" element={<FixedIncome />} />
              <Route path="/assets/commodities" element={<Commodities />} />
              <Route path="/assets/crypto" element={<Crypto />} />
              <Route path="/analytics" element = {<Analytics />} />
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
