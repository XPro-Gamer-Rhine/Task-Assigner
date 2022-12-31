import { useState, useEffect } from "react";

const useUpdateTask = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateTask = (
    message,
    due_date,
    priority,
    assigned_to,
    taskid
  ) => {
    let myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");
    const formdata = new FormData();
    if (message == "" || message === undefined || message === null) {
      setError("Message is required");
    } else {
      formdata.append("message", message);
    }
    if (due_date == "" || due_date === undefined || due_date === null) {
      setError("Due_date is required");
    } else {
      formdata.append("due_date", due_date);
    }
    if (priority == "" || priority === undefined || priority === null) {
      setError("Priority is required");
    } else {
      formdata.append("priority", priority);
    }
    if (
      assigned_to === "" ||
      assigned_to === undefined ||
      assigned_to === null
    ) {
      setError("Assigned_to is required");
    } else {
      formdata.append("assigned_to", assigned_to);
    }
    if (taskid === "" || taskid === undefined || taskid === null) {
      setError("Taskid is required");
    } else {
      formdata.append("taskid", taskid);
    }
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/update", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => setError(error));

    if (data === undefined || data === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUpdateTask();
  }, []);

  return [handleUpdateTask, { data, loading, error }];
};

export default useUpdateTask;
