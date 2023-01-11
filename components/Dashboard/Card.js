import React, { forwardRef } from "react";

export const Card = forwardRef(
  ({ data, index, isDragging, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          opacity: isDragging ? 0 : 1,
          transformOrigin: "0 0",
          backgroundColor: "white",
          border: "1px solid grey",
          padding: "20px",
          borderRadius: "10px",
          cursor: "grab",
          ...style,
        }}
        {...props}
      >
        <h1>{data.title}</h1>
        <p
          style={{
            marginTop: "10px",
          }}
        >
          {data.content}
        </p>
      </div>
    );
  }
);
