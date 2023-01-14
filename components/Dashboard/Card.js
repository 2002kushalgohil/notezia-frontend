import React, { forwardRef } from "react";
import styles from "../../styles/NotesWorkflow.module.css";
export const Card = forwardRef(
  ({ data, index, isDragging, style, ...props }, ref) => {
    const { title, content, bgColor } = data;
    return (
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 0 : 1,
          backgroundColor: bgColor,
          ...style,
        }}
        className={styles.NotesWorkflowCard}
        {...props}
      >
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
