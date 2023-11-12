import { Layout, Card, Row, Col, Form, Input, Button, Spin } from "antd";
import { fear_and_greed_data } from "./static";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const { Content } = Layout;
export const Analytics = () => {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <div style={{ margin: "auto", width: "800px" }}>
        <Card title={"Market Historical Fear & Greed Index Data"}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={600} height={300} data={fear_and_greed_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </Content>
  );
};
