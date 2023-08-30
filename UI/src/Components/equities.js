import { Layout, Card, Row, Col } from "antd";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
const { Content } = Layout;

const ticker = [
    "NASDAQ:AAPL",
    "NASDAQ:MSFT",
    "NASDAQ:AMZN",
    "NASDAQ:NVDA",
    "NASDAQ:TSLA",
    "NASDAQ:GOOGL",
    "NASDAQ:META",
    "NYSE:BRK.B",
    "NYSE:UNH",
    "NYSE:JNJ",
    "NYSE:JPM",
    "NYSE:XOM",
    "NYSE:V",
    "NYSE:LLY",
    "NYSE:PG",
    "NASDAQ:AVGO",
    "NYSE:MA",
    "NYSE:HD",
    "NYSE:MRK",
    "NYSE:CVX",
    "NYSE:PFE",
    "NYSE:ABBV",
    "NASDAQ:COST",
    "NYSE:KO"
  ];
  
const idx = [0,1,2,3,4,5,6,7,8,9,10,11]
export const Equities = () => {
  return (
    <Content
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
    {idx.map((id) => (
         <Row gutter={[12]} style={{marginBottom:"20px"}}>
         <Col span={12}>
           <Card title={ticker[id*2]} style={{ height: "260px" }}>
             <TradingViewWidget
               symbol={ticker[id*2]}
               theme={Themes.DARK}
               locale="en"
               autosize
             />
           </Card>
         </Col>
         <Col span={12}>
           <Card title={ticker[id*2+1]} style={{ height: "260px" }}>
             <TradingViewWidget
               symbol={ticker[id*2+1]}
               theme={Themes.DARK}
               locale="en"
               autosize
             />
           </Card>
         </Col>
       </Row>
    ))}
    </Content>
  );
};
