import React from "react";
import {Button, Card, Form, Input, notification, Typography} from "antd";
import {LockOutlined, UserOutlined, FontSizeOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import Login from "./Login";
import {userServices} from "../../services";
import {SUCCESS_CODE} from "../../constants/common";
import {ISignUpForm} from "../../interfaces";

const {Title} = Typography;
const Signup: React.FC<
  {
    registerMode: boolean;
    setRegisterMode: (registerMode: boolean) => void
  }
> = ({registerMode, setRegisterMode}) => {

  const handleLogin = () => {
    setRegisterMode(false);
  }

  const onFinish = (signUpForm: ISignUpForm) => {
    userServices.signUp(signUpForm).then((res) => {
      if (res.code !== SUCCESS_CODE)
        return res;
      notification.success({message: "Tạo tài khoản thành công, vui lòng đăng nhập lại!"});
      setRegisterMode(false);
    })
  }

  return ( registerMode ?(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{width: 500}}>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Title level={2}>Đăng ký tài khoản</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{required: true, message: "Tài khoản không thể để trống!"}]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder="Tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[{required: true, message: "Tên đầy đủ không thể để trống!"}]}
          >
            <Input
              prefix={<FontSizeOutlined className="site-form-item-icon"/>}
              placeholder="Tên đầy đủ"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: "Mật khẩu không thể để trống!"}]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{required: true, message: "Email không thể để trống!"}]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon"/>}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="fullname"
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon"/>}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Đăng ký
            </Button>
            <div style={{height: "5px",}}></div>
            Bạn đã có tài khoản? Hãy
            <button className="link-button" onClick={handleLogin}>
              đăng nhập
            </button>
            ngay
          </Form.Item>
        </Form>
      </Card>
    </div>
    ) : (<Login/>)
  );
}

export default Signup;