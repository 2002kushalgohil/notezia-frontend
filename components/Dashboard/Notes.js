import { EditFilled } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import NoteCard from "./NoteCard";
import NoteMakerModal from "./NoteMakerModal";

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Row gutter={[0, 15]}>
        <Col span={24}>
          <h1>Notes</h1>
        </Col>
        <Col span={24}>
          <Row gutter={[30, 30]} align="middle" justify="start">
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 6 }}>
              <Button
                style={{
                  height: "220px",
                  width: "100%",
                  backgroundColor: "transparent",
                }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
                type="dashed"
              >
                <h3>
                  Create Note <EditFilled />
                </h3>
              </Button>
            </Col>
            {[
              {
                title: "Note 1",
                desc: "Lorem ipsum text for demo",
                bgColor: "#a1eefe",
              },
              {
                title: "Note 2",
                desc: "Lorem ipsum text for demo",
                bgColor: "#bfffc3",
              },
              {
                title: "Note 3",
                desc: "Lorem ipsum text for demo",
                bgColor: "#ffc3c3",
              },
              {
                title: "Note 4",
                desc: "Lorem ipsum text for demo",
                bgColor: "#ffde9f",
              },
            ].map((data, index) => {
              return <NoteCard key={index} data={data} />;
            })}
          </Row>
        </Col>
      </Row>
      <NoteMakerModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
