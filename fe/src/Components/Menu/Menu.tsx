import React from "react";
import {Button, Divider, Dropdown, MenuProps, Space} from "antd";
import {UserContext} from "../../contexts";
import {userHelpers} from "../../helpers";

const Menu: React.FC = () => {
  const userContext = React.useContext(UserContext);
  console.log('menu', userContext);
  if (!userContext || !userContext.userInfo) {
    window.location.replace("/");
    return null;
  }

  const color = "#4679ff";
  const textColor = "#ffffff";

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: "Thông tin tài khoản",
    },
    {
      key: '2',
      label: "Đăng xuất",
      onClick: userHelpers.logout
    }
  ];

  return (
    <Dropdown
      menu={{items}}
      trigger={["click"]}
    >
      <Button shape="circle" type="text" style={{backgroundColor: color, color: textColor}}>
        {userContext!.userInfo!.fullName.toUpperCase().slice(0, 1)}
      </Button>
    </Dropdown>
  )
}

export default Menu;