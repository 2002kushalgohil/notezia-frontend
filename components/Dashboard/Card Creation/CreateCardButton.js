import { EditOutlined } from "@ant-design/icons/lib/icons";
import { Button, message, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cardInitialState from "../../../Redux/Initial States/cardInitialState";
import { useCreateCardMutation } from "../../../Redux/Services/service";
import { setCardData } from "../../../Redux/Slices/Card/cardSlice";
import { setIsLoading } from "../../../Redux/Slices/Etc/etcSlice";
import styles from "../../../styles/NotesWorkflow.module.css";
import CardModal from "./CardModal";
export default function CreateCardButton() {
  const dispatch = useDispatch();
  const cardData = useSelector((state) => state.card.data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      dispatch(setCardData(cardInitialState));
    } else {
      if (!Object.values(cardData).every((x) => x === null || x === "")) {
        createCardHandler();
      }
    }
  }, [isModalOpen]);

  // ------------------ Create card ------------------
  const [_createCard, { isLoading: createCardLoading }] =
    useCreateCardMutation();
  const createCardHandler = async () => {
    const response = await _createCard(cardData);

    if (response?.error) {
      return message.error(response.error.data.message);
    }

    if (response?.data) {
      return message.success(response.data.message);
    }
  };

  useEffect(() => {
    dispatch(setIsLoading(createCardLoading));
  }, [createCardLoading]);
  return (
    <>
      <Button
        type="dashed"
        style={{
          backgroundColor: "transparent",
          cursor: "pointer",
          visibility: isModalOpen ? "hidden" : "visible",
        }}
        onClick={() => {
          setIsModalOpen(true);
        }}
        className={styles.NotesWorkflowCard}
      >
        <Row justify="center" align="middle">
          <Space>
            <h3>Create note</h3> <EditOutlined className="icon" />
          </Space>
        </Row>
      </Button>
      <CardModal open={isModalOpen} changeModalStatus={setIsModalOpen} />
    </>
  );
}
