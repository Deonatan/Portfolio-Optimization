import { Layout, Card, Row, Col, Collapse } from "antd";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { snpJustifications, ndaqJustifications } from "./static";
const { Content } = Layout;
const { Panel } = Collapse;

export const Equities = () => {
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
          <Card title={"SPDR S&P 500 ETF TRUST"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"SPY"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose S&P 500 ETF (SPY)</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {snpJustifications.map((justification, index) => (
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
          <Card title={"NASDAQ, INC."}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"NDAQ"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose NASDAQ ETF (NDAQ)</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {ndaqJustifications.map((justification, index) => (
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
