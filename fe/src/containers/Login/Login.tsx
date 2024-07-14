import {FC, FormEvent, useState} from "react";
import {Form, Input, Button, Checkbox, Card, Typography} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {userHelpers} from "../../helpers";
import Signup from "./Signup";

const {Title} = Typography;

const Login: FC = () => {

  const [registerMode, setRegisterMode] = useState<boolean>(false);

  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    console.log("Handle password recovery logic here");
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setRegisterMode(true);
  };

  return (
    registerMode ?
      (
        <Signup registerMode={registerMode} setRegisterMode={setRegisterMode}/>
      ) : (
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
              <Title level={2}>Đăng nhập tài khoản</Title>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{remember: true}}
              onFinish={userHelpers.login}
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
                name="password"
                rules={[{required: true, message: "Mật khẩu không thể để trống!"}]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <button
                className="link-button"
                style={{float: "right"}}
                onClick={handleForgotPassword}
              >
                Quên mật khẩu?
              </button>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ tài khoản</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Đăng nhập
                </Button>
                <div style={{height: "5px",}}></div>
                Bạn chưa có tài khoản? Hãy
                <button className="link-button" onClick={handleRegister}>
                  đăng ký
                </button>
                ngay
              </Form.Item>
            </Form>
          </Card>
        </div>
      )
  );
};

export default Login;