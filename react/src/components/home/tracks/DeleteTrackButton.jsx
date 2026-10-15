import { useDispatch } from "react-redux";
import { deleteTrack } from "../../../features/tracks/tracksThunks";
import { Trash } from "lucide-react";

export function DeleteTrackButton({ id, closeSidebar }) {
  const dispatch = useDispatch();
  async function handleClick() {
    const RIPPLE_EFFECT_LENGTH = 150;
    setTimeout(() => {
      dispatch(deleteTrack(id));
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
