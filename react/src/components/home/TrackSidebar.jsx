import { DeleteTrackButton } from "../../components/home/tracks/DeleteTrackButton";
import { RippleButton } from "./general/RippleButton";
import { X } from "lucide-react";

export function TrackSidebar({ track, isOpen, close }) {
  const handleClose = () => {
    const RIPPLE_EFFECT_LENGTH = 150;
    setTimeout(close, RIPPLE_EFFECT_LENGTH);
  };

  if (isOpen) {
    return (
      <div className="sidebar sidebar-right">
        <ul>
          <li>
            <DeleteTrackButton id={track.id} closeSidebar={handleClose} />
          </li>
          <RippleButton>
            <li>
              <button onClick={handleClose}>
                <X />
                <span>Close</span>
              </button>
            </li>
          </RippleButton>
        </ul>
      </div>
    );
  }
}
