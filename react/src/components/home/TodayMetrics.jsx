import { useSelector } from "react-redux";
import { selectHabitsRemainingTime } from "../../features/habits/habitsSelectors";
import { selectTasksRemainingTime } from "../../features/tasks/tasksSelectors";

import prettyPrintDuration from "../../utils/prettyPrintDuration";
import { ClockFading, ClockCheck } from "lucide-react";

function WorkingToday({ todayDuration }) {
  return (
    <div className="today-metric justify-center align-center">
      <span>Working today:</span>
      <span className="align-center">
        <strong>{prettyPrintDuration(todayDuration)}</strong>
        <ClockCheck />
      </span>
    </div>
  );
}

function EstimateRemaining() {
  const habitTime = useSelector(selectHabitsRemainingTime);
  const taskTime = useSelector(selectTasksRemainingTime);

  return (
    <div className="today-metric justify-center align-center">
      <span>Estimate remaining:</span>
      <span className="align-center">
        <strong>~{prettyPrintDuration(habitTime + taskTime)}</strong>
        <ClockFading />
      </span>
    </div>
  );
}

export function TodayMetrics({ todayDuration, estimate }) {
  return (
    <div className="today-metrics justify-center">
      <EstimateRemaining estimate={estimate} />
      <WorkingToday todayDuration={todayDuration} />
    </div>
  );
}
