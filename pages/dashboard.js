import { Col, Row } from "antd";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Notes from "../components/Dashboard/Notes";

export default function () {
  return (
    <ProtectedRoute>
      <div
        style={{
          height: "100%",
          paddingLeft: "82px",
        }}
      >
        <Row
          style={{
            backgroundColor: "#f6f8fa",
            height: "100%",
            borderRadius: "var(--mpr-1) 0px 0px",
            padding: "var(--mpr-1)",
          }}
        >
          <Col span={24}>
            <Notes />
          </Col>
        </Row>
      </div>
    </ProtectedRoute>
  );
}
