export function SessionSection() {
  return (
    <>
      <section className="landing-focus-session ">
        <div className="landing-focus-container wrap">
          <div className="focus-info">
            <span>Focus Sessions</span>
            <h2>Decide on the duration. <br /> Focus away.</h2>
            <p>Instead of vaguely "working on something", you decide up front how long you'll spend, and the app keeps the clock.</p>
            <ul>
              <li><span className="focus-check"></span>Attached to a habit or a task, so the time gets logged</li>
              <li><span className="focus-check"></span>Full-screen timer, no distractions</li>
              <li><span className="focus-check"></span>Finish early and the actual time is still recorded</li>
            </ul>

          </div>
          <div className="mock-frame mock-focus">
            <div className="focus-time gauge" id="gauge">
              <svg
                id="svg"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: "100%", height: "100%" }}
              >
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00d2ff" />
                    <stop offset="100%" stopColor="#3a7bd5" />
                  </linearGradient>
                </defs>

                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="white"
                  strokeWidth="18"
                />

                <circle
                  id="arc"
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#g1)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  strokeDasharray="2 500"
                ></circle>

                <g
                  id="ticks"
                  opacity="0.12"
                  transform="translate(0,0)"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <line
                      key={i} x1={100} x2={100} y1={100 - 72} y2={100 - 80}
                      stroke="currentColor"
                      transform={`rotate(${i * 30} 100 100)`}
                    />
                  ))}
                </g>
              </svg>
              <div className="time">
                <div className="main">24:59</div>
                <div className="sub">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
