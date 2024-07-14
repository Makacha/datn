import React, {useContext} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CenterSpin from "../../shared/Spin/CenterSpin";
import stockHook from "../../../hooks/stockHook";
import {Divider, Dropdown, List, MenuProps, Popconfirm, Table, TableProps, Tooltip} from "antd";
import {StockInfo} from "../../../interfaces";
import {DOWN_COLOR, UP_COLOR} from "../../../constants/common";
import {stockServices} from "../../../services";
import {SuperChartContext} from "../../../contexts/superChartContext";

const InterestList: React.FC<{setShowDetail: (value: string) => void}> = (props) => {

  const context = useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }

  const {isLoadInterestList, interestList, setNeedRefreshInterestList} = context;

  const [selectedSymbol, setSelectedSymbol] = React.useState<string>("");

  const {setShowDetail} = props;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `Xem thông tin chi tiết`,
      onClick: () => {
        setShowDetail(selectedSymbol);
      }
    },
    {
      key: '2',
      label: <Tooltip title={"Phân tích mã trong siêu biểu đồ"}>Phân tích {selectedSymbol}</Tooltip>,
      onClick: () => {
        console.log("Phân tích");
      }
    },
    {
      key: '3',
      label: (
        <Popconfirm
          title={`Xóa mã khỏi danh sách theo dõi`}
          description={`Bạn có chắc chắn muốn xóa ${selectedSymbol} khỏi danh sách theo dõi không?`}
          okText="Xóa"
          cancelText="Hủy"
          onConfirm={() => {
            console.log("Xóa mã khỏi danh sách theo dõi")
            stockServices.deleteFromInterestList(selectedSymbol).then((r) => {
              if (r.code === "000") {
                console.log("Xóa thành công");
                setNeedRefreshInterestList(true);
              }
            });
          }}
        >
          Xóa {selectedSymbol} khỏi danh sách
        </Popconfirm>
      ),
    },
  ];

  const columns: TableProps<StockInfo>['columns'] = [
    {
      title: "Mã",
      dataIndex: "symbol",
      key: "symbol",
      width: '35%',
      className: 'interest-list-symbol',
      render: (_, record) =>
        <Dropdown menu={{items}} trigger={["click"]}>
          <div id={"interest-list-row-" + record.symbol}>
            {record.symbol}
          </div>
        </Dropdown>
    },
    {
      title: "Giá cuối",
      dataIndex: "price",
      key: "price",
      width: '24%',
      className: 'interest-list-other',
      render: (_, record) => <div style={{textAlign: 'right'}}>{record.price.toFixed(2)}</div>
    },
    {
      title: "Thay đổi",
      dataIndex: "change",
      key: "change",
      width: '19%',
      className: 'interest-list-other',
      render: (_, record) => {
        const color = record.change >= 0 ? UP_COLOR : DOWN_COLOR;
        return <div style={{color, textAlign: 'right'}}>{record.change.toFixed(2)}</div>;
      }
    },
    {
      title: "%",
      key: "changePercent",
      width: '22%',
      className: 'interest-list-last',
      render: (_, record) => {
        const color = record.change >= 0 ? UP_COLOR : DOWN_COLOR;
        return (
          <div style={{color, textAlign: 'right'}}>
            {(record.change / (record.price - record.change) * 100).toFixed(2) + "%"}
          </div>
        );
      }
    }
  ];
  return (
    <div className="interest-list">
      <h2 style={{textAlign: "center", paddingTop: 10, paddingBottom: 10}}>Danh sách theo dõi</h2>
      <Table
        dataSource={interestList}
        columns={columns}
        loading={isLoadInterestList}
        pagination={false}
        style={{width: '100%'}}
        onRow={(record) => {
          return {
            onClick: () => {
              const element = document.getElementById("interest-list-row-" + record.symbol);
              if (element) {
                setSelectedSymbol(record.symbol);
                element.click();
              }
            }
          };
        }}
      />
    </div>
  );
}

export default InterestList;