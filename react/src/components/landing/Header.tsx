import GithubIcon from "../../assets/svgs/github.svg?react";

export function Header() {
  return (
    <>
      <header>
        <div className="nav-inner justify-space-between">
          <div className="nav-left">
            <span className="logo">Build<span className="pink">·</span>a<span className="pink">·</span>Habit</span>
          </div>
          <div className="nav-right">
            <a href="https://github.com/adarshrajput181/build-a-habit">
              <GithubIcon />
              Github
            </a>
            <button type="button" className="sign-up">
              Sign Up
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
