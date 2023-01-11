import { Modal } from "antd";

export default function NoteMakerModal({ isOpen, setIsOpen }) {
  return (
    <Modal
      centered
      open={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      closable={false}
      footer={null}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
}
