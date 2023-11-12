import { Layout, Card, Row, Col, Collapse } from "antd";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { BtcJustifications, EthJustifications } from "./static";
const { Content } = Layout;
const { Panel } = Collapse;

export const Crypto = () => {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <Row gutter={[12]} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Card title={"Bitcoin"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"BTC-USD"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose Bitcoin</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {BtcJustifications.map((justification, index) => (
                  <Panel
                    key={index}
                    header={`${index + 1}. ${justification.title}`}
                  >
                    <Card>{justification.description}</Card>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={"Ethereum"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"ETH-USD"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose Ethereum</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {EthJustifications.map((justification, index) => (
                  <Panel
                    key={index}
                    header={`${index + 1}. ${justification.title}`}
                  >
                    <Card>{justification.description}</Card>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
