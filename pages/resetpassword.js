import { Button, Col, Form, Input, message, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import { useResetPasswordMutation } from "../Redux/Services/service";

export default function ResetPassword() {
  const { query, route } = useRouter();
  const [userData, setUserData] = useState({
    password: "",
    confirmpassword: "",
  });

  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
      route.push("/login");
      return message.success(response.data.message);
    }
  };

  return (
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
          >
            <Form.Item>
              <Input.Password
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={onChangeHandler}
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                placeholder="Confirm Password"
                name="confirmpassword"
                value={userData.confirmpassword}
                onChange={onChangeHandler}
              />
            </Form.Item>
          </Form>
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
        <Row></Row>
      </div>
    </AuthLayout>
  );
}
