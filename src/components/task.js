import React, { useState } from "react";
import Modal from "../utils/modal";
import DeleteBtn from "./deleteBtn";
const Task = ({ data, cssClass }) => {
  return (
    <>
      <li
        className={`relative flex items-center justify-between px-2 py-6 border-b shadow-xl hover:bg-gray-200  left-0 right-0 mx-auto ${cssClass}`}
        key={data.id}
      >
        <div>
          <p className="inline-block mt-1 text-gray-600 text-xl font-bold">
            {data.message}
          </p>
          <p>{data.assigned_name}</p>
        </div>
        <p className="text-gray-500 right-0 hover:text-red-600 text-xs">
          {data.due_date}
        </p>
        <Modal data={data} />
        <DeleteBtn id={data.id} />
      </li>
    </>
  );
};

export default Task;
