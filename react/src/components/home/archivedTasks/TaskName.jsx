import { useDispatch } from "react-redux";
import { deleteTask } from "../../../features/tasks/tasksThunks";
import { Trash } from "lucide-react";

export const TaskName = ({ name, id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="entry">
      <p className="entry-name">{name}</p>
      <button className="danger" onClick={handleDelete}>
        <Trash />
      </button>
    </div>
  );
};
