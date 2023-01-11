import React, { useEffect, useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { SortablePhoto } from "./SortablePhoto";
import { Card } from "./Card";
import photos from "./photos.json";

export default function App() {
  const [items, setItems] = useState(photos);
  const [activeId, setActiveId] = useState(null);

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragEnd}
    >
      <SortableContext items={items}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(2, 1fr)`,
            gridAutoRows: `200px`,
            gridGap: 20,
            padding: 20,
            gridAutoFlow: "row dense",
          }}
        >
          {items.map((data, index) => (
            <SortablePhoto key={data.id} data={data} index={index} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              display: "grid",
              gridAutoColumns: "auto",
              gridAutoRows: "auto",
              height: "100%",
            }}
          >
            <Card
              data={items[items.findIndex((item) => item.id == activeId)]}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

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
}
