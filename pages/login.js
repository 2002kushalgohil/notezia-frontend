import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import Link from "next/link";
import AuthLayout from "../components/Layouts/AuthLayout";
import { useLoginMutation } from "../Redux/Services/service";

export default function Login() {
  const [_login] = useLoginMutation();
  const onLoginHandler = async () => {
    const response = await _login();
    console.log(response);
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
            <h1>Login to Notezia</h1>
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
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Row justify="space-between" align="middle" gutter={[0, 15]}>
                <Form.Item>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <h4>
                  <Link href="/forgotpassword">Forgot password</Link>
                </h4>
              </Row>
            </Form.Item>
          </Form>
          <Button
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
  );
}
