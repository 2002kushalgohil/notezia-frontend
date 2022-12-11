import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import validateEmail from "../GlobalFunctions/validateEmail";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../Redux/Services/service";

export default function Login() {
  const [isModal, setIsModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState();
  const [userData, setUserData] = useState({
    email: "",
    Password: "",
    isRemember: false,
  });

  const onChangeHandler = (e) => {
    if (e.target.name == "isRemember") {
      setUserData({ ...userData, [e.target.name]: e.target.checked });
      return;
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [_login, { isLoading }] = useLoginMutation();
  const onLoginHandler = async () => {
    if (!(userData.email && userData.password)) {
      return message.warning("Please fill all the details");
    }
    if (!validateEmail(userData.email)) {
      return message.warning("Please enter an appropriate email address");
    }
    const response = await _login(userData);
    if (response?.error) {
      return message.error(response.error.data.message);
    }

    if (response?.data) {
      const token = response.data.data.token;
      return message.success(response.data.message);
    }
  };

  const [_forgotPassword, { isLoading: forgotPasswordLoading }] =
    useForgotPasswordMutation();
  const onForgetPassHandler = async () => {
    if (!validateEmail(forgotPasswordEmail)) {
      return message.warning("Please enter an appropriate email address");
    }
    const response = await _forgotPassword({
      email: forgotPasswordEmail,
    });

    if (response?.error) {
      return message.error(response.error.data.message);
    }
    if (response?.data) {
      setForgotPasswordEmail("");
      setIsModal(false);
      return message.success(response.data.message);
    }
  };

  return (
    <>
      <AuthLayout>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Row>
            <Col
              span={24}
              style={{
                textAlign: "center",
              }}
            >
              <h1>Login to Notezia</h1>
              <p
                className="opacity05"
                style={{
                  marginTop: "var(--mpr-3)",
                }}
              >
                Complete the form below to login into your account
              </p>
            </Col>
          </Row>

          <Row
            style={{
              width: "100%",
            }}
          >
            <Form
              style={{
                width: "100%",
              }}
              size="large"
            >
              <Form.Item>
                <Input
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={onChangeHandler}
                />
              </Form.Item>
              <Form.Item>
                <Input.Password
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={onChangeHandler}
                />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between" align="middle" gutter={[0, 15]}>
                  <Form.Item>
                    <Checkbox
                      name="isRemember"
                      checked={userData.isRemember}
                      onChange={onChangeHandler}
                    >
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  <h4
                    onClick={() => {
                      setIsModal(true);
                    }}
                  >
                    <a>Forgot password</a>
                  </h4>
                </Row>
              </Form.Item>
            </Form>
            <Button
              loading={isLoading}
              size="large"
              type="primary"
              style={{
                width: "100%",
              }}
              onClick={onLoginHandler}
            >
              Login
            </Button>
            <Col {...{ xs: 24, sm: 24, md: 24, lg: 24 }}>
              <Row
                style={{
                  border: "1px solid var(--border-color)",
                  height: "40px",
                  borderRadius: "var(--mpr-3)",
                  cursor: "pointer",
                  marginTop: "var(--mpr-2)",
                }}
                align="middle"
                justify="center"
              >
                <img
                  src="/google.svg"
                  style={{
                    height: "70%",
                    marginRight: "var(--mpr-2)",
                  }}
                />
                <p className="opacity05">Sign in with Google</p>
              </Row>
            </Col>
          </Row>
          <Row>
            <p className="opacity05">Dont have an account yet? &nbsp;</p>
            <h4>
              <Link href="/signup">Sign Up</Link>
            </h4>
          </Row>
        </div>
      </AuthLayout>
      <Modal
        title="Forgot password"
        centered
        footer={false}
        open={isModal}
        onOk={onForgetPassHandler}
        onCancel={() => setIsModal(false)}
      >
        <Row
          gutter={[0, 30]}
          style={{
            marginTop: "var(--mpr-2)",
          }}
        >
          <Col span={24}>
            <Input
              placeholder="Registered Email"
              name="email"
              size="large"
              value={forgotPasswordEmail}
              onChange={(e) => {
                setForgotPasswordEmail(e.target.value);
              }}
            />
          </Col>
          <Col span={24}>
            <Row align="middle" justify="end">
              <Space size={15}>
                <Button size="large" onClick={() => setIsModal(false)}>
                  Cancel
                </Button>
                <Button
                  loading={forgotPasswordLoading}
                  size="large"
                  type="primary"
                  onClick={onForgetPassHandler}
                >
                  Submit
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
