import React, { useEffect, useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Row, Col, Button, Space } from "antd";
import { Card } from "./Card";
import cards from "../../cards.json";
import { SortableCardWrapper } from "../DraggableComponents/SortableCardWrapper";
import styles from "../../styles/NotesWorkflow.module.css";
import { EditOutlined } from "@ant-design/icons/lib/icons";
import CardModal from "./Card Creation/CardModal";
export default function NotesWorkflow() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(cards);
  const [activeId, setActiveId] = useState(null);

  function handleDragOver(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id == active.id);
        const newIndex = items.findIndex((item) => item.id == over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <>
      <Row
        style={{
          width: "100%",
        }}
      >
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={(e) => {
            setActiveId(e.active.id);
          }}
          onDragEnd={() => {
            setActiveId(null);
          }}
          onDragCancel={() => {
            setActiveId(null);
          }}
          onDragOver={handleDragOver}
        >
          <Col span={24}>
            <SortableContext items={items}>
              <div
                style={{
                  gap: 25,
                }}
                className={styles.NotesWorkflowMainDiv}
              >
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
                {items.map((data, index) => (
                  <SortableCardWrapper
                    key={data.id}
                    data={data}
                    index={index}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <>
                  <Card
                    data={items[items.findIndex((item) => item.id == activeId)]}
                  />
                </>
              ) : null}
            </DragOverlay>
          </Col>
        </DndContext>
      </Row>
      <CardModal open={isModalOpen} changeModalStatus={setIsModalOpen} />
    </>
  );
}
