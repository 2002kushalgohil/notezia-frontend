import { InboxOutlined } from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Row, Space, Upload } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import CardLayout from "../components/Layouts/CardLayout";
import { useUserProfileQuery } from "../Redux/Services/service";
import { setUserProfile } from "../Redux/Slices/User/userSlice";

const { Dragger } = Upload;
export default function Account() {
  const userData = useSelector((state) => state.user.data);
  const route = useRouter();
  const dispatch = useDispatch();

  const { data, isSuccess, isError, isLoading } = useUserProfileQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserProfile(data.data));
    }
  }, [isSuccess, isError]);

  return (
    <ProtectedRoute>
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
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Row gutter={[15, 0]} justify="start" align="middle">
                <Col>
                  <img
                    style={{
                      cursor: "pointer",
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 50,
                      border: "1px solid var(--border-color)",
                    }}
                    src={userData.photos.secure_url}
                  />
                </Col>
                <Col>
                  <h1>{userData.name}</h1>
                  <p className="opacity05">{userData.email}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Form size="large" layout="vertical">
                <Form.Item label="Name">
                  <Input placeholder="Name" name="name" />
                </Form.Item>
              </Form>
              <Form.Item label="Profile photo">
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Your photo will be compressed and stored so you can upload
                    photos of less quality
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Row justify="end" align="middle">
                <Space size={15}>
                  <Button
                    size="large"
                    onClick={() => {
                      route.push("/");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="large" type="primary">
                    Save
                  </Button>
                </Space>
              </Row>
            </Col>
          </Row>
        </div>
      </CardLayout>
    </ProtectedRoute>
  );
}
