import DateTimePicker from "react-datetime-picker";
import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import useCreateTask from "../hooks/userCreateTask";
import { NotificationManager } from "react-notifications";

const options = ["1", "2", "3"];

const CreateTask = () => {
  const [users] = useFetchData();
  console.log(users);
  const [message, setMessage] = useState("");
  const [value, onChange] = useState(new Date());
  const [selected, setSelected] = useState(options[0]);
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [state, setState] = useState(false);
  const [handleCreateTask] = useCreateTask();

  const handleSubmit = () => {
    let dateTime = new Date(value).toISOString();
    dateTime = dateTime.replace("T", " ");
    dateTime = dateTime.split(".")[0];
    handleCreateTask(message, dateTime, selected, selectedUser);
    setState(true);
  };

  return (
    <div className="w-full max-w-3xl left-0 right-0 mx-auto">
      {state === true &&
        NotificationManager.success("Success message", "Created New Task")}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            placeholder="message"
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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
