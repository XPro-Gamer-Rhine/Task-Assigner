import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import useListTasks from "../hooks/useListTasks";
import Task from "../components/task";

const normalTask = [];
const mediumTask = [];
const hardTask = [];

const columnsFromBackend = {
  [uuid()]: {
    name: "Normal",
    items: normalTask,
  },
  [uuid()]: {
    name: "Medium",
    items: mediumTask,
  },
  [uuid()]: {
    name: "Hard",
    items: hardTask,
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Drag() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [data, loading] = useListTasks();
  const getUserData = () => {
    if (data !== undefined && data.length > 0) {
      data.map((task) => {
        if (task.priority == 1) {
          normalTask.push(task);
        }
        if (task.priority == 2) {
          mediumTask.push(task);
        }
        if (task.priority == 3) {
          hardTask.push(task);
        }
      });
    }
  };
  useEffect(() => {
    getUserData();
  }, [loading]);
  return (
    <div className="flex justify-center">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="flex flex-col items-center my-6" key={columnId}>
              <h2 className="mr-6 text-4xl font-bold text-purple-600 py-5">
                {column.name}
              </h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={"p-4 w-full border-2 border-dashed"}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Task data={item} cssClass="w-96" />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Drag;
