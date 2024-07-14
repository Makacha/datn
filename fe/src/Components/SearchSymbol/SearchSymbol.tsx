import React, {useState} from "react";
import {SearchIcon} from "../../helpers/Icon";
import {Button, Modal, Tooltip} from "antd";

import "./SearchSymbol.scss";
import SearchSymbolDialog from "./SearchSymbolDialog";

const SearchSymbol: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="search-symbol">
      <Tooltip title="search">
        <SearchIcon/>
        <Button type="text" onClick={() => setShowSearch(true)}>
          Tìm kiếm mã
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
        <SearchSymbolDialog/>
      </Modal>
    </div>
  );
}

export default SearchSymbol;