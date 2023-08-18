import {
  BgColorsOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row } from "antd";
import { useSelector } from "react-redux";
import { useDeleteCardMutation } from "../../../../Redux/Services/service";

export default function Options({ changeModalStatus, _id }) {
  const userData = useSelector((state) => state.card.data);

  const [_deleteCard, { isLoading }] = useDeleteCardMutation();

  const deleteCardHandler = async () => {
    try {
      const response = await _deleteCard(_id);

      if (response?.error) {
        message.error(response.error.data.message);
      }

      if (response?.data) {
        message.success(response.data.message);
      }

      if (changeModalStatus) {
        changeModalStatus(false);
      }
    } catch (error) {
      message.error(
        "An error occurred while processing your card deletion request"
      );
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Button type="text" shape="circle" size="middle">
          <BgColorsOutlined />
        </Button>
        <Popconfirm
          title="Delete the card ?"
          onConfirm={deleteCardHandler}
          okText="Yes"
          cancelText="No"
          okButtonProps={{
            loading: isLoading,
          }}
        >
          <Button type="text" shape="circle" size="middle">
            <DeleteOutlined />
          </Button>
        </Popconfirm>

        <Button type="text" shape="circle" size="middle">
          <MoreOutlined />
        </Button>
      </Col>
    </Row>
  );
}
