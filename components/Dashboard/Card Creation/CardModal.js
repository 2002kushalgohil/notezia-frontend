import { Modal } from "antd";
import { useEffect } from "react";
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
      className="cardModal"
    >
      <CreateCard changeModalStatus={changeModalStatus} />
    </Modal>
  );
}
