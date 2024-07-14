import React, {useContext, useState} from "react";
import {Button, Dropdown, Input, List, MenuProps, notification, Tooltip} from "antd";
import {SearchIcon} from "../../helpers/Icon";
import stockHook from "../../hooks/stockHook";
import InfiniteScroll from "react-infinite-scroll-component";
import {SuperChartContext} from "../../contexts/superChartContext";
import {PlusCircleOutlined} from "@ant-design/icons";
import stockServices from "../../services/stock";

const SearchSymbolDialog: React.FC = () => {
  const {isLoading, setKeyword, data} = stockHook.useSymbol();
  const context = useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }
  const [symbol, setSymbol] = useState<string>("");
  const {setNeedRefreshInterestList} = context;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: "Danh sách theo dõi",
      icon: <PlusCircleOutlined/>,
      onClick: () => {
        stockServices.addToInterestList(symbol).then((r) => {
          if (r.code === "000") {
            setNeedRefreshInterestList(true);
            notification.success({message: "Thêm mã vào danh sách theo dõi thành công!"});
          }
        });
      }
    }
  ];

  return (
    <div className="search-symbol-dialog">
      <h1>Tìm kiếm mã</h1>
      <Input
        prefix={<SearchIcon/>}
        placeholder="Nhập mã cần tìm"
        size="large"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div style={{flex: 1, overflowY: "scroll", marginTop: 20}} id="searchSymbolList">
        <InfiniteScroll
          dataLength={data.length}
          next={() => {
          }}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          scrollableTarget="searchSymbolList"
        >
          <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={
              item => (
                <Dropdown menu={{items}} placement="topCenter" trigger={["click"]}>
                  <List.Item style={{display: "flex", flexDirection: "row", paddingLeft: 20}} onClick={() => {
                    setSymbol(item.symbol);
                  }}>
                    <List.Item.Meta title={item.symbol} description={item.name}>
                    </List.Item.Meta>
                    <span
                      style={{display: "inline-flex", alignItems: "center", paddingRight: 100}}>{item.exchange}</span>
                  </List.Item>
                </Dropdown>
              )
            }
            loading={isLoading}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default SearchSymbolDialog;