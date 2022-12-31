import React from "react";
import useDeleteTask from "../hooks/useDeleteTask";
const DeleteBtn = (id) => {
  const [handleDeleteTask] = useDeleteTask();

  const handleDelete = (task) => {
    handleDeleteTask(task.id);
  };
  return (
    <div>
      <button onClick={() => handleDelete(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default DeleteBtn;
