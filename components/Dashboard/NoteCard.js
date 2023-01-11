import { Col, Row } from "antd";

export default function NoteCard({ data }) {
  const { title, desc, bgColor } = data;
  return (
    <Col {...{ xs: 24, sm: 24, md: 12, lg: 6 }}>
      <Row
        style={{
          height: "220px",
          borderRadius: "var(--mpr-2)",
          backgroundColor: bgColor,
          padding: "var(--mpr-2) var(--mpr-1)",
        }}
      >
        <Col span={24}>
          <h2>{title}</h2>
          <p>{desc}</p>
        </Col>
      </Row>
    </Col>
  );
}
