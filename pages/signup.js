import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CardLayout from "../components/Layouts/CardLayout";
import validateEmail from "../GlobalFunctions/validateEmail";
import { useSignUpMutation } from "../Redux/Services/service";
import { setIsAuth, setToken } from "../Redux/Slices/Auth/AuthSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [userData, setUserData] = useState({
    name: "",
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

  const [_signup, { isLoading }] = useSignUpMutation();
  const onSignupHandler = async () => {
    if (!(userData.email && userData.password && userData.name)) {
      return message.warning("Please fill all the details");
    }
    if (!validateEmail(userData.email)) {
      return message.warning("Please enter an appropriate email address");
    }
    const response = await _signup(userData);
    if (response?.error) {
      return message.error(response.error.data.message);
    }

    if (response?.data) {
      const token = response.data.data.token;
      localStorage.setItem("accessToken", token);
      dispatch(setIsAuth(true));
      dispatch(setToken(token));
      route.push("/");
      return message.success(response.data.message);
    }
  };

  return (
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
            <h1>Signup to Notezia</h1>
            <p
              className="opacity05"
              style={{
                marginTop: "var(--mpr-3)",
              }}
            >
              Complete the form below to create your account
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
                placeholder="Name"
                name="name"
                value={userData.name}
                onChange={onChangeHandler}
              />
            </Form.Item>
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
              <Form.Item>
                <Checkbox
                  name="isRemember"
                  checked={userData.isRemember}
                  onChange={onChangeHandler}
                >
                  Remember me
                </Checkbox>
              </Form.Item>
            </Form.Item>
          </Form>
          <Button
            size="large"
            type="primary"
            loading={isLoading}
            style={{
              width: "100%",
            }}
            onClick={onSignupHandler}
          >
            Signup
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
              <p className="opacity05">Sign up with Google</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <p className="opacity05">Already have an account? &nbsp;</p>
          <h4>
            <Link href="/login">Login</Link>
          </h4>
        </Row>
      </div>
    </CardLayout>
  );
}
