import React, {useState} from "react";
import {Button, Modal, Tooltip} from "antd";
import SearchIndicatorDialog from "./SearchIndicatorDialog";
import {PlusCircleOutlined} from "@ant-design/icons";

const SearchIndicator: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="search-indicator">
      <Tooltip title="search">
        <PlusCircleOutlined />
        <Button type="text" onClick={() => setShowSearch(true)}>
          Thêm chỉ báo
        </Button>
      </Tooltip>
      <Modal
        open={showSearch}
        footer={<div></div>}
        onCancel={() => setShowSearch(false)}
        centered
        width={'80vw'}
        style={{ top: 20 }}
      >
        <SearchIndicatorDialog/>
      </Modal>
    </div>
  );
}

export default SearchIndicator;