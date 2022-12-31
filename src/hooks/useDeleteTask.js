import { useState, useEffect } from "react";

const useDeleteTask = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteTask = (taskid) => {
    let myHeaders = new Headers();
    myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

    const formdata = new FormData();
    if (taskid === "" || taskid === undefined || taskid === null) {
      setError("Taskid is required");
    } else {
      formdata.append("taskid", taskid);
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://devza.com/tests/tasks/delete", requestOptions)
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => setError(error));

      if (data === undefined || data === null) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleDeleteTask();
  }, [data]);

  return [handleDeleteTask, { data, loading, error }];
};

export default useDeleteTask;
