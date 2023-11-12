import { useState } from "react";
import { Layout, Card, Row, Col, Form, Input, Button, Spin } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import axios from "axios";
const { Content } = Layout;

const COLORS = {
  SPY: "#003f5c",
  NDAQ: "#2f4b7c",
  BOND: "#665191",
  VGIT: "#a05195",
  XLE: "#d45087",
  IAU: "#f95d6a",
  "BTC-USD": "#ff7c43",
  "ETH-USD": "#ffa600",
};

export const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [assetWeight, setAssetWeight] = useState([
    12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5,
  ]);

  const [portfolioReturn, setPortfolioReturn] = useState([]);
  const [portfolioFinalValue, setPortfolioFinalValue] = useState(0);
  const [portfolioInitialValule, setPortfolioInitialValue] = useState(0);

  const pieChartData = [
    { name: "SPY", value: assetWeight[0] },
    { name: "NDAQ", value: assetWeight[1] },
    { name: "BOND", value: assetWeight[2] },
    { name: "VGIT", value: assetWeight[3] },
    { name: "XLE", value: assetWeight[4] },
    { name: "IAU", value: assetWeight[5] },
    { name: "BTC-USD", value: assetWeight[6] },
    { name: "ETH-USD", value: assetWeight[7] },
  ];

  const barChartData = [
    {
      name: "Initial Portfolio Value",
      "portfolio value": portfolioInitialValule,
    },
    {
      name: "Expected Portfolio Value",
      "portfolio value": portfolioFinalValue,
    },
  ];

  const onFinish = (values) => {
    console.log("Form values:", values);
    setIsLoading(true);
    axios.post("http://localhost:5000/portfolio", values).then((response) => {
      console.log(response.data);
      const result = response.data;
      setAssetWeight(result["weight"]);
      setPortfolioFinalValue(result["final_value"]);
      setIsLoading(false);
    });
  };
  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 12 },
  };
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <div style={{ margin: "auto", width: "800px" }}>
        <Card>
          <Row gutter={[12]}>
            <Col>
              <Card
                style={{ height: "300px" }}
                title={"Set Portfolio Criteria"}
              >
                <Form {...layout} name="myForm" onFinish={onFinish}>
                  <Form.Item
                    name="var"
                    rules={[{ required: true }]}
                    label="VaR"
                  >
                    <Input placeholder="Enter Desired VAR Value" />
                  </Form.Item>
                  <Form.Item
                    name="portfolio_value"
                    rules={[{ required: true }]}
                    label="Portfolio Value"
                  >
                    <Input
                      placeholder="Enter Desired Portfolio Value"
                      onChange={(e) => setPortfolioInitialValue(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Generate Portfolio
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    // Adjust the height to fit your layout
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <PieChart width={400} height={300}>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={(entry) => `${(entry.percent * 100).toFixed(1)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry["name"]]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </Col>
          </Row>
        </Card>
        <Card title={"Portfolio Performance"} style={{ marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              width={500}
              height={400}
              data={barChartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="portfolio value" fill="#6aaa96" barSize={30} />
              <Line
                type="monotone"
                dataKey="portfolio value"
                stroke="red"
                legendType="none"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </Content>
  );
};
