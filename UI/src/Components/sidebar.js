import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  LineChartOutlined,
  PieChartOutlined,
  SlidersOutlined,
  FileOutlined,
  DollarOutlined,
  CodeSandboxOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { Sider } = Layout;

const items = [
    {
        key:"assets",
        icon: <PieChartOutlined />,
        label:"Fundamentals",
        children:[
            {
                key:"equities",
                icon: <SlidersOutlined />,
                label:<Link to="assets/equities">Equities</Link>,
            },
            {
                key:"fixed_income",
                icon: <FileOutlined />,
                label:<Link to="assets/fixed-income">Fixed Income</Link>,
            },
            {
                key:"commodities",
                icon: <DollarOutlined  />,
                label:<Link to="assets/commodities">Commodities</Link>,
            },
            {
                key:"crypto",
                icon: <CodeSandboxOutlined />,
                label:<Link to="assets/crypto">Crypto</Link>,
            },
        ]
    },
    {
        key:"analytics",
        icon: <LineChartOutlined />,
        label:<Link to="analytics">Analytics</Link>
    }
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider
      theme="light"
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
    >
      <div className="demo-logo-vertical" />
      <Menu mode="inline" items={items} />
    </Sider>
  );
};
