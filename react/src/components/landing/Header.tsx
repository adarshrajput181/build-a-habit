import GitHubIcon from "../../assets/svgs/github.svg?react";

export function Header({ openModal }: { openModal: () => void }) {
  return (
    <>
      <header>
        <div className="nav-inner wrap justify-space-between">
          <div className="nav-left">
            <span className="logo">Build<span className="pink">·</span>a<span className="pink">·</span>Habit</span>
          </div>
          <div className="nav-right">
            <a href="https://github.com/adarshrajput181/build-a-habit">
              <GitHubIcon />
              GitHub
            </a>
            <button type="button" className="sign-up" onClick={openModal}>
              Sign Up
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
