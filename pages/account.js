import { Col, Image, Input, Row, Upload } from "antd";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import CardLayout from "../components/Layouts/CardLayout";

export default function Account() {
  const userData = useSelector((state) => state.user.data);

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
                  <Upload
                    name="file"
                    maxCount={1}
                    onPreview={() => false}
                    onChange={(e) => {
                      // uploadImage(e?.file);
                    }}
                    beforeUpload={() => false}
                  >
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
                  </Upload>
                </Col>
                <Col>
                  <h1>{userData.name}</h1>
                  <p className="opacity05">{userData.email}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </CardLayout>
    </ProtectedRoute>
  );
}
