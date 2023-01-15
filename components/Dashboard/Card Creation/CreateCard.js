import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import styles from "../../../styles/Card.module.css";
export default function CreateCard({ changeModalStatus }) {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
  });

  const { title, description } = userData;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <Row gutter={[0, 5]}>
      <Col span={24}>
        <Input.TextArea
          placeholder="Title"
          name="title"
          className={styles.title + " " + styles.inputBx}
          value={title}
          onChange={onChangeHandler}
          autoSize={true}
          bordered={false}
        />
      </Col>
      <Col span={24}>
        <Input.TextArea
          placeholder="Note"
          name="description"
          className={styles.description + " " + styles.inputBx}
          value={description}
          onChange={onChangeHandler}
          autoSize={true}
          bordered={false}
        />
      </Col>
      <Col
        span={24}
        style={{
          marginTop: "var(--mpr-3)",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>Options</Col>
          <Col>
            <Button
              type="text"
              onClick={() => {
                if (changeModalStatus) {
                  changeModalStatus(false);
                }
              }}
            >
              Close
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
