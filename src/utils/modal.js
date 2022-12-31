import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import useFetchData from "../hooks/useFetchData";
import useUpdateTask from "../hooks/useUpdateTask";

const options = ["1", "2", "3"];

const Modal = ({ data }) => {
  const [users] = useFetchData();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(data.message);
  const [value, onChange] = useState(new Date());
  const [selected, setSelected] = useState(data.priority);
  const [selectedUser, setSelectedUser] = useState(data.assigned_to);
  const [handleUpdateTask] = useUpdateTask();
  const handleUpdate = () => {
    let dateTime = new Date(value).toISOString();
    dateTime = dateTime.replace("T", " ");
    dateTime = dateTime.split(".")[0];
    handleUpdateTask(message, dateTime, selected, selectedUser, data.id);
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="absolute right-0 flex items-center mr-8"
        onClick={() => setShowModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Task</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="message"
                    >
                      Message
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="message"
                      type="text"
                      value={data.message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="datetime"
                    >
                      Date & Time
                    </label>
                    <DateTimePicker
                      format="yyyy-MM-dd h:mm:ss"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="Priority"
                    >
                      Priority
                    </label>
                    <select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      {options.map((value) => (
                        <option value={value} key={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      for="assignto"
                    >
                      Assign To
                    </label>
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                    >
                      {users.length > 0 && users !== undefined ? (
                        users.map((user, id) => (
                          <option value={user.id} key={id}>
                            {user.id}-{user.name}
                          </option>
                        ))
                      ) : (
                        <p>Loading...</p>
                      )}
                    </select>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
