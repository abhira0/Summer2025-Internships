// src/hooks/useDragAndDrop.js
export function useDragAndDrop(items, setItems) {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
  
    const handleDragStart = (index) => {
      dragItem.current = index;
    };
  
    const handleDragEnter = (index) => {
      dragOverItem.current = index;
    };
  
    const handleDragEnd = () => {
      if (dragItem.current !== null && dragOverItem.current !== null) {
        const newItems = [...items];
        const draggedItem = newItems[dragItem.current];
        newItems.splice(dragItem.current, 1);
        newItems.splice(dragOverItem.current, 0, draggedItem);
        setItems(newItems);
      }
      dragItem.current = null;
      dragOverItem.current = null;
    };
  
    return {
      handleDragStart,
      handleDragEnter,
      handleDragEnd
    };
  }