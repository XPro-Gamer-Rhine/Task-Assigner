import { Route, Routes } from "react-router-dom";
import CreateTask from "./pages/createTask";
import ViewTask from "./pages/viewTask";
import "./index.css";
import Drag from "./pages/drag";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/" element={<ViewTask />} />
        <Route path="/drag" element={<Drag />} />
      </Routes>
    </div>
  );
}

export default App;
