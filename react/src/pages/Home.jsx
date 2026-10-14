import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Dashboard } from "../components/home/Dashboard";
import { Habits } from "../components/home/HabitsContainer";
import { Sidebar } from "../components/home/Sidebar.jsx";
import userAPI from "../api/userAPI.js";
import { TimerProvider } from "../contexts/TimerContext.jsx";
import { TrackContainer } from "../components/home/TrackContainer.jsx";
import { UpcomingTasksContainer } from "../components/home/upcomingTask/UpcomingTasksContainer.jsx";
import { ArchivedTaskContainer } from "../components/home/archivedTasks/ArchivedTaskContainer.jsx";
import { CSSTransition } from "react-transition-group";
import { Menu } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("Today");
  const [navbarOpen, setNavbarOpen] = useState(false);
  // variable required for css transition
  const [visible, setVisible] = useState(true);
  const [nextTab, setNextTab] = useState(null);

  const mainContainerRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 500) {
      setNavbarOpen(true);
    }
  }, []);

  useEffect(() => {
    if (mainContainerRef.current) {
      if (navbarOpen) {
        mainContainerRef.current.classList.add("shrink");
        mainContainerRef.current.classList.remove("expand");
      } else {
        mainContainerRef.current.classList.add("expand");
        mainContainerRef.current.classList.remove("shrink");
      }
    }
  }, [navbarOpen]);

  const handleResize = () => {
    if (window.innerWidth > 500) {
      setNavbarOpen(true);
    } else {
      setNavbarOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    try {
      const redirectIfNotLoggedIn = async function() {
        const response = await userAPI.getUser();
        if (response.status == 403) {
          navigate("/login", { replace: true });
        }

        const data = await response.json();
        if (data.message === "Not Logged In")
          navigate("/login", { replace: true });
      };

      redirectIfNotLoggedIn();
    } catch (error) {
      console.error("Error checking login status");
    }
  }, [navigate]);

  const tabComponents = {
    Today: (
      <div>
        <Habits />
      </div>
    ),
    Tracks: <TrackContainer />,
    "Upcoming Tasks": <UpcomingTasksContainer />,
    "Archived Tasks": <ArchivedTaskContainer />,
  };

  const innerComponent = tabComponents[tab] || <div />; // Default to null if tab is not found

  const requestTab = (value) => {
    if (value === tab) return;
    setNextTab(value);
    setVisible(false); // start exit
  };

  return (
    <div className="home">
      <Sidebar
        tab={tab}
        setTab={requestTab}
        sidebarOpen={navbarOpen}
        setSidebarOpen={setNavbarOpen}
      />
      <TimerProvider>
        <div className="main-container" ref={mainContainerRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNavbarOpen((prev) => !prev);
            }}
            className="svg-icon"
          >
            <Menu />
          </button>
          <Dashboard currentTab={tab} />
          <CSSTransition
            nodeRef={nodeRef}
            in={visible}
            unmountOnExit
            classNames="tabs-transition"
            timeout={0}
            onExited={() => {
              if (nextTab) {
                setTab(nextTab);
                setNextTab(null);
                setVisible(true);
              }
            }}
          >
            <div ref={nodeRef} key={tab}>
              {innerComponent}
            </div>
          </CSSTransition>
        </div>
      </TimerProvider>
    </div>
  );
}
