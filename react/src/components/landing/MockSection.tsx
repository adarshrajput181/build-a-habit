import { Sun, Star, Calendar, Menu, Plus, Play, User, ClockFading, ClockCheck } from "lucide-react";

export function MockSection() {
  interface MockTask {
    id: number;
    label: string;
    est: string;
    actual: string;
  }

  const tasks: MockTask[] = [
    { id: 1, label: "Morning Journal", est: '30m', actual: '28m' },
    { id: 2, label: "Read 20 pages", est: '20m', actual: '-' },
    { id: 3, label: "Meditate", est: '45m', actual: '20m' }
  ];

  return <>
    <div className="mock-frame">
      <div className="mock-navbar">
        <span><Sun />Today</span>
        <span><Star />Tracks</span>
        <span><Calendar />Upcoming Tasks</span>
      </div>
      <div className="mock-main">
        <div className="mock-dashboard justify-space-between">
          <div className="mock-dashboard-left align-center">
            <Menu />
          </div>
          <div className="mock-dashboard-right align-center">
            <Plus />
            <div className="mock-timer justify-center">
              <span>Morning Journal</span>
              <div className="mock-play justify-center"><Play /></div>
            </div>
            <div className="mock-user justify-center align-center"><User /></div>
          </div>
        </div>
        <div className="mock-metrics align-center justify-center">
          <span className="align-center">Estimate remaining: <b>45m</b> <ClockFading /></span>
          <span className="align-center">Working today: <b>1h 20m</b> <ClockCheck /></span>
        </div>
        <div className="mock-habits">
          {tasks.map((task) =>
            <div className="mock-habit justify-space-between">
              <span className="mock-label">{task.label}</span>
              <span className="mock-times">{task.actual} / {task.est}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </>;
}
