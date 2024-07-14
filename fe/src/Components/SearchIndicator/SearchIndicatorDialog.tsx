import React, {useContext} from "react";
import {Dropdown, Input, List, MenuProps, notification} from "antd";
import {SearchIcon} from "../../helpers/Icon";
import stockHook from "../../hooks/stockHook";
import {chartHook} from "../../hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import {PlusCircleOutlined} from "@ant-design/icons";
import stockServices from "../../services/stock";
import {SuperChartContext} from "../../contexts/superChartContext";
import {IIndicator} from "../../interfaces";

const SearchIndicatorDialog: React.FC = () => {
  const context = useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }
  const {isLoading, setKeyword, indicators} = chartHook.useIndicator();

  const [selectedIndicator, setSelectedIndicator] = React.useState<IIndicator | null>(null);

  const {setIndicators} = context;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: "Thêm chỉ báo vào siêu biểu đồ",
      icon: <PlusCircleOutlined/>,
      onClick: () => {
        if (selectedIndicator) {
          setIndicators([...indicators, selectedIndicator]);
          notification.success({
            message: "Thêm chỉ báo thành công",
            description: `Chỉ báo ${selectedIndicator.name} đã được thêm vào siêu biểu đồ`
          });
        }
      }
    }
  ];

  return (
    <div className="search-indicator-dialog">
      <h1>Tìm kiếm chỉ báo</h1>
      <Input
        prefix={<SearchIcon/>}
        placeholder="Nhập mã cần tìm"
        size="large"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div style={{flex: 1, overflowY: "scroll", marginTop: 20}} id="searchIndicatorList">
        <InfiniteScroll
          dataLength={indicators.length}
          next={() => {
          }}
          hasMore={false}
          loader={<h4>Loading...</h4>}
          scrollableTarget="searchIndicatorList"
        >
          <List
            itemLayout="vertical"
            dataSource={indicators}
            renderItem={
              item => (
                <Dropdown menu={{items}} placement="topCenter" trigger={["click"]}>
                  <List.Item style={{display: "flex", flexDirection: "row", paddingLeft: 20}} onClick={() => {
                    setSelectedIndicator(item);
                  }}>
                    <List.Item.Meta title={item.name} description={item.description}/>
                  </List.Item>
                </Dropdown>
              )
            }
            loading={isLoading}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default SearchIndicatorDialog;