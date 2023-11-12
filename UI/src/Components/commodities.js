import { Layout, Card, Row, Col, Collapse } from "antd";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { xleJustifications, IauJustifications } from "./static";
const { Content } = Layout;
const { Panel } = Collapse;

export const Commodities = () => {
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
          <Card title={"Energy Select Sector SPDR Fund (XLE)"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"XLE"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose (XLE)</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {xleJustifications.map((justification, index) => (
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
          <Card title={"iShares Gold Trust (IAU)"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"IAU"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose (IAU)</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {IauJustifications.map((justification, index) => (
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
