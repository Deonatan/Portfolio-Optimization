import { Layout, Card, Row, Col, Collapse } from "antd";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { BondJustifications, VgitJustifications } from "./static";
const { Content } = Layout;
const { Panel } = Collapse;

export const FixedIncome = () => {
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
          <Card title={"Pimco Active Bond ETF (BOND)"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"NYSE:BOND"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose (BOND)</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {BondJustifications.map((justification, index) => (
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
          <Card title={"Vanguard Intermediate-Term Treasury Index ETF (VGIT)"}>
            <div style={{ width: "100%", height: "100%" }}>
              <TradingViewWidget
                symbol={"VGIT"}
                theme={Themes.DARK}
                locale="en"
                autosize={false}
                width="100%"
                height={300}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h1>Reasons to Choose (VGIT)</h1>
              <Collapse accordion style={{ width: "100%" }}>
                {VgitJustifications.map((justification, index) => (
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
