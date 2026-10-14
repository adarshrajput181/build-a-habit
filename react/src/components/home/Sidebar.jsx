import { useEffect, useRef } from "react";
import { Sun, Star, CalendarFold, Calendar } from "lucide-react";
import { RippleButton } from "./general/RippleButton";

function Tab({ name, handleClick }) {
  return <button onClick={handleClick}>{name}</button>;
}

export function Sidebar({ tab, setTab, sidebarOpen, setSidebarOpen }) {
  const tabs = [
    { name: "Today", icon: <Sun /> },
    { name: "Tracks", icon: <Star /> },
    { name: "Upcoming Tasks", icon: <Calendar /> },
    { name: "Archived Tasks", icon: <CalendarFold /> },
  ];

  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarRef.current) {
      if (sidebarOpen) {
        if (window.innerWidth <= 500) {
          document.addEventListener("click", handleClick);
          document.addEventListener("touch", handleClick);
        }

        sidebarRef.current.classList.add("opened");
        sidebarRef.current.classList.remove("closed");
      } else {
        sidebarRef.current.classList.add("closed");
        sidebarRef.current.classList.remove("opened");
      }
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touch", handleClick);
    };
  }, [sidebarOpen]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="navbar" ref={sidebarRef}>
      <ul>
        {tabs.map((curTab) => {
          if (tab === curTab.name) {
            return (
              <RippleButton key={curTab.name}>
                <li className="selected">
                  <span className="icon">{curTab.icon}</span>
                  <Tab name={curTab.name} handleClick={() => { }} />
                </li>
              </RippleButton>
            );
          } else {
            return (
              <RippleButton key={curTab.name}>
                <li key={curTab.name} onClick={() => setTab(curTab.name)}>
                  <span className="icon">{curTab.icon}</span>
                  <Tab
                    key={curTab.name}
                    name={curTab.name}
                    handleClick={() => setTab(curTab.name)}
                  />
                </li>
              </RippleButton>
            );
          }
        })}
      </ul>
    </div>
  );
}
