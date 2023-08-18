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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardLayout from "../components/Layouts/CardLayout";
import validateEmail from "../utils/validateEmail";
import {
  useForgotPasswordMutation,
  useGoogleAuthQuery,
  useLoginMutation,
} from "../Redux/Services/service";
import { setIsAuth, setToken } from "../Redux/Slices/Auth/AuthSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export default function Login() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState();
  const [userData, setUserData] = useState({
    email: "",
    Password: "",
    isRemember: false,
  });

  // -------------------- onChange Handler for input fields --------------------
  const onChangeHandler = (e) => {
    if (e.target.name == "isRemember") {
      setUserData({ ...userData, [e.target.name]: e.target.checked });
      return;
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // -------------------- Login Handler --------------------
  const [_login, { isLoading }] = useLoginMutation();

  const onLoginHandler = async () => {
    try {
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
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(setIsAuth(true));
        dispatch(setToken(accessToken));
        route.push("/dashboard");
        return message.success(response.data.message);
      }
    } catch (error) {
      return message.error("An error occurred while processing your request");
    }
  };

  // -------------------- Forgot password Handler --------------------
  const [_forgotPassword, { isLoading: forgotPasswordLoading }] =
    useForgotPasswordMutation();
  const onForgetPassHandler = async () => {
    try {
      if (!forgotPasswordEmail) {
        return message.warning("Please enter an email address");
      }
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
    } catch (error) {
      return message.error(
        "An error occurred while processing your forgot password request"
      );
    }
  };

  // ---------------------- Social Login ------------------------
  const googleLogin = useGoogleLogin({
    onSuccess: async (respose) => {
      setAccessToken(respose.access_token);
    },
  });

  const googleAuthHandler = () => {
    if (googleAuthSuccess) {
      const accessToken = googleAuthData.data.accessToken;
      const refreshToken = googleAuthData.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch(setIsAuth(true));
      dispatch(setToken(accessToken));
      route.push("/dashboard");
      return message.success(googleAuthData.message);
    }
    if (googleAuthError) {
      return message.error("Oops! Something went wrong");
    }
  };

  const {
    data: googleAuthData,
    isLoading: googleAuthLoading,
    isError: googleAuthError,
    isSuccess: googleAuthSuccess,
  } = useGoogleAuthQuery(accessToken ? accessToken : skipToken);

  useEffect(() => {
    googleAuthHandler();
  }, [googleAuthError, googleAuthSuccess]);

  return (
    <>
      <CardLayout>
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
              layout="vertical"
            >
              <Form.Item label="Email">
                <Input
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={onChangeHandler}
                />
              </Form.Item>
              <Form.Item label="Password">
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
          </Row>
          <Row>
            <Button
              loading={isLoading || googleAuthLoading}
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
                onClick={googleLogin}
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
            <Row
              justify="center"
              align="middle"
              style={{
                width: "100%",
                marginTop: "var(--mpr-1)",
              }}
            >
              <p className="opacity05">Dont have an account yet? &nbsp;</p>
              <h4>
                <Link href="/signup">Sign Up</Link>
              </h4>
            </Row>
          </Row>
        </div>
      </CardLayout>
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
