import { Button, Col, Form, Input, message, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardLayout from "../components/Layouts/CardLayout";
import { useResetPasswordMutation } from "../Redux/Services/service";
import { setIsAuth, setToken } from "../Redux/Slices/Auth/AuthSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { query, route } = useRouter();
  const [userData, setUserData] = useState({
    password: "",
    confirmpassword: "",
  });

  // -------------------- onChange Handler for input fields --------------------
  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // -------------------- Reset password Handler --------------------
  const [_resetPassword, { isLoading }] = useResetPasswordMutation();
  const onResetPasswordHandler = async () => {
    if (!(userData.password && userData.confirmpassword)) {
      return message.warning("Please fill all the details");
    }
    if (userData.password != userData.confirmpassword) {
      return message.warning("Passwords does not match");
    }
    const queryToken = query.token;
    const response = await _resetPassword({ userData, queryToken });

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
            <h1>Reset password</h1>
            <p
              className="opacity05"
              style={{
                marginTop: "var(--mpr-3)",
              }}
            >
              Complete the form below to reset your account password
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
            <Form.Item label="Password">
              <Input.Password
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={onChangeHandler}
              />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input.Password
                placeholder="Confirm Password"
                name="confirmpassword"
                value={userData.confirmpassword}
                onChange={onChangeHandler}
              />
            </Form.Item>
          </Form>
        </Row>
        <Row
          style={{
            width: "100%",
          }}
        >
          <Button
            loading={isLoading}
            size="large"
            type="primary"
            style={{
              width: "100%",
            }}
            onClick={onResetPasswordHandler}
          >
            Reset Password
          </Button>
        </Row>
      </div>
    </CardLayout>
  );
}
