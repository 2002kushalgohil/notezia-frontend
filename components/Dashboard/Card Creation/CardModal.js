import { Modal } from "antd";
import CreateCard from "./CreateCard";

export default function CardModal({ open, changeModalStatus }) {
  return (
    <Modal
      centered
      open={open}
      footer={null}
      closable={false}
      onOk={() => changeModalStatus(false)}
      onCancel={() => changeModalStatus(false)}
    >
      <CreateCard changeModalStatus={changeModalStatus} />
    </Modal>
  );
}
