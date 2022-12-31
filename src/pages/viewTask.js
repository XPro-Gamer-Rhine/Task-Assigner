import React, { useEffect, useState } from "react";
import useListTasks from "../hooks/useListTasks";

import Task from "../components/task";
const ViewTask = () => {
  const [data] = useListTasks();
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="relative w-1/3 left-0 right-0 mx-auto my-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {search.length > 1 ? (
        data
          .filter((task) => {
            if (search === "") {
              return null;
            } else if (
              task.message.toLowerCase().includes(search.toLowerCase())
            ) {
              return task;
            }
          })
          .map((task, id) => {
            return <Task data={task} />;
          })
      ) : (
        <div className="flex flex-row  justify-evenly">
          <div className="flex  justify-center h-screen w-full">
            <div className="w-full px-4 py-8 mx-auto shadow w-full">
              <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600">
                  {" "}
                  Normal
                </h1>
              </div>

              <ul className="list-reset">
                {data != undefined && data.length > 0 ? (
                  data.map((task) =>
                    task.priority == 1 ? <Task data={task} /> : null
                  )
                ) : (
                  <p>Loading</p>
                )}
              </ul>
            </div>
          </div>
          <div className="flex  justify-center h-screen w-full">
            <div className="w-full px-4 py-8 mx-auto shadow w-full">
              <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600">
                  {" "}
                  Medium
                </h1>
              </div>

              <ul className="list-reset">
                {data != undefined && data.length > 0 ? (
                  data.map((task) =>
                    task.priority == 2 ? <Task data={task} /> : null
                  )
                ) : (
                  <p>Loading</p>
                )}
              </ul>
            </div>
          </div>
          <div className="flex  justify-center h-screen w-full">
            <div className="w-full px-4 py-8 mx-auto shadow w-full">
              <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600">
                  {" "}
                  Hard
                </h1>
              </div>

              <ul className="list-reset">
                {data != undefined && data.length > 0 ? (
                  data.map((task) =>
                    task.priority == 3 ? <Task data={task} /> : null
                  )
                ) : (
                  <p>Loading</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewTask;
