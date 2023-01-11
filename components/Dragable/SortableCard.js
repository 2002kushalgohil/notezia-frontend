import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NoteCard from "../Dashboard/NoteCard";
export const SortableCard = (props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: props.data.id });

  return (
    <NoteCard
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
};
