import React, { forwardRef } from "react";
import styles from "../../styles/NotesWorkflow.module.css";
export const Card = forwardRef(
  ({ data, index, isDragging, style, ...props }, ref) => {
    const { title, description } = data;
    return (
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 0 : 1,
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
