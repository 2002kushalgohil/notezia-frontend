import React, { useEffect, useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Row, Col, Button, Space, message } from "antd";
import { Card } from "./Card";
import { SortableCardWrapper } from "../DraggableComponents/SortableCardWrapper";
import styles from "../../styles/NotesWorkflow.module.css";
import CardModal from "./Card Creation/CardModal";
import { useDispatch, useSelector } from "react-redux";
import { setCardData } from "../../Redux/Slices/Card/cardSlice";
import {
  useCardPrioritiesMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from "../../Redux/Services/service";
import { setIsLoading } from "../../Redux/Slices/Etc/etcSlice";
import CreateCardButton from "./Card Creation/CreateCardButton";
import cardInitialState from "../../Redux/Initial States/cardInitialState";
export default function NotesWorkflow() {
  const cardData = useSelector((state) => state.card.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [activeId, setActiveId] = useState(null);

  function handleDragOver(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item._id == active.id);
        const newIndex = items.findIndex((item) => item._id == over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  // ------------------ Get cards ------------------
  const { data, isLoading: getCardsLoading, isSuccess } = useGetCardsQuery();

  useEffect(() => {
    if (isSuccess && data) {
      setCards(data?.data);
    }
  }, [data, isSuccess]);

  // ------------------ Change priority of cards ------------------
  const [_cardPriorities, { isLoading: cardPriorityLoading }] =
    useCardPrioritiesMutation();

  const changeCardPriorities = async () => {
    try {
      const sentData = cards?.map((data) => {
        return data._id;
      });

      await _cardPriorities({
        cards: [...sentData],
      });
    } catch (error) {
      message.error(
        "An error occurred while processing your card deletion request"
      );
    }
  };

  // ------------------ Edit card ------------------
  const [_updateCard, { isLoading: updateCardIsLoading }] =
    useUpdateCardMutation();

  const updateCard = async (_id, data) => {
    try {
      const response = await _updateCard({ _id, data });

      if (response?.error) {
        return message.error(response.error.data.message);
      }

      if (response?.data) {
        dispatch(setCardData(cardInitialState));
        return message.success(response.data.message);
      }
    } catch (error) {
      return message.error(
        "An error occurred while processing your card update request"
      );
    }
  };

  useEffect(() => {
    if (!isModalOpen && cardData?._id) {
      let _id = cardData._id;
      let data = { ...cardData };
      delete data._id;
      delete data.createdBy;

      const originalCard = cards[cards.findIndex((item) => item._id == _id)];

      if (JSON.stringify(cardData) !== JSON.stringify(originalCard)) {
        updateCard(_id, data);
      } else {
        dispatch(setCardData(cardInitialState));
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    const sentData =
      cardPriorityLoading || getCardsLoading || updateCardIsLoading;
    dispatch(setIsLoading(sentData));
  }, [cardPriorityLoading, getCardsLoading, updateCardIsLoading]);

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
          onDragEnd={(e) => {
            setActiveId(null);
            if (e.active.id !== e.over.id) {
              changeCardPriorities();
            } else {
              dispatch(
                setCardData(
                  cards[cards.findIndex((item) => item._id == activeId)]
                )
              );
              setIsModalOpen(true);
            }
          }}
          onDragCancel={() => {
            setActiveId(null);
          }}
          onDragOver={handleDragOver}
        >
          <Col span={24}>
            <SortableContext items={cards}>
              <div
                style={{
                  gap: 25,
                }}
                className={styles.NotesWorkflowMainDiv}
              >
                <CreateCardButton />
                {cards?.map((data, index) => (
                  <SortableCardWrapper
                    key={data._id}
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
                    data={
                      cards[cards.findIndex((item) => item._id == activeId)]
                    }
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
