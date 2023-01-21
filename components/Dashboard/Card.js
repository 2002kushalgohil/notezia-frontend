import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/NotesWorkflow.module.css";
export const Card = forwardRef(
  ({ data, index, isDragging, style, ...props }, ref) => {
    const cardData = useSelector((state) => state.card.data);
    console.log(cardData);
    const { title, description, _id } = data;
    return (
      <div
        ref={ref}
        style={{
          opacity: cardData._id == _id || isDragging ? 0 : 1,
          backgroundColor: "#ffde9f",
          ...style,
        }}
        className={styles.NotesWorkflowCard}
        {...props}
      >
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
