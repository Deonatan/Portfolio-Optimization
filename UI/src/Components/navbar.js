import { Layout, Menu, Row } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
const items1 = [
  {
    key: "DIP E029",
    label: <Link to="/">DIP E029</Link>,
  },
];
export const Navbar = () => {
  return (
    <Header>
      <Row>
        <Menu style={{ marginTop: "10px" }} theme="dark" items={items1} />
      </Row>
    </Header>
  );
};
