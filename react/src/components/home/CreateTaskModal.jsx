import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../features/tasks/tasksThunks";
import { RippleButton } from "./general/RippleButton";
import { Save } from "lucide-react";

export function CreateTaskModal({ setButtonDisplay }) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  if (!setButtonDisplay) return null;

  const handleCreation = async function(event) {
    event.preventDefault();
    dispatch(createTask({ taskName, date }));
    closeModal();
  };

  const closeModal = function() {
    setTimeout(() => {
      setButtonDisplay(false);
    }, 150);
  };

  return (
    <div className="habit-overlay" onClick={closeModal}>
      <div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
        <h3>Create a new Task</h3>
        <form onSubmit={handleCreation}>
          <label>
            <input
              type="text"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
              required
            />
            <span>Task Name</span>
          </label>
          <label>
            <input
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
              required
            />
            <span>Schedule on:</span>
          </label>
          <div className="btn-grp">
            <RippleButton>
              <button type="submit">
                <Save />
                Save
              </button>
            </RippleButton>
            <RippleButton>
              <button onClick={closeModal}>Cancel</button>
            </RippleButton>
          </div>
        </form>
      </div>
    </div>
  );
}
