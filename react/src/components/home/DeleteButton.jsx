import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { deleteHabit } from "../../features/habits/habitsThunks.js";
import { deleteTask } from "../../features/tasks/tasksThunks.js";

export function DeleteButton({ id, isHabit, closeSidebar }) {
  const dispatch = useDispatch();

  function handleClick() {
    const RIPPLE_EFFECT_LENGTH = 150;
    setTimeout(() => {
      if (isHabit) dispatch(deleteHabit(id));
      else dispatch(deleteTask(id));
      closeSidebar();
    }, RIPPLE_EFFECT_LENGTH);
  }

  return (
    <button className="danger" onClick={handleClick}>
      <Trash />
      <span>Delete</span>
    </button>
  );
}
