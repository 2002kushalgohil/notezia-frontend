import { Button, Col, Input, Row } from "antd";
import styles from "../../../styles/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCardData } from "../../../Redux/Slices/Card/cardSlice";
import Options from "./Options/Options";
export default function CreateCard({ changeModalStatus }) {
  const userData = useSelector((state) => state.card.data);
  const dispatch = useDispatch();
  const { title, description } = userData;

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    let sentData = { ...userData };
    sentData = { ...sentData, [name]: value };
    dispatch(setCardData(sentData));
  };

  return (
    <Row
      gutter={[0, 5]}
      style={{
        backgroundColor: "#ffde9f",
        padding: "20px 25px",
        borderRadius: "var(--mpr-2)",
      }}
    >
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
          <Col>
            <Options changeModalStatus={changeModalStatus} _id={userData?._id} />
          </Col>
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
