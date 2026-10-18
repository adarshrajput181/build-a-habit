import GithubIcon from "../../assets/svgs/github.svg?react";

export function HeroSection() {
  return <>
    <section className="hero">
      <div className="wrap">
        <span>
          <span className="dot"></span>
          Free<b>·</b><b>GPL-3.0</b><b>·</b>Self-host or use the official instance
        </span>
        <h1 className="hero-heading">
          Track habits, one-off tasks with time estimates and <span className="pink">actual</span> time spent.
        </h1>
        <p className="hero-subtitle">
          Build-a-Habit is a small, focused habit tracker for people who care about where their hours go. Sign up on the official instance, or run your own.
        </p>
        <div className="cta justify-center">
          <button type="button" className="sign-up">Sign Up</button>
          <button type="button" className="gh"><GithubIcon />View Source</button>
        </div>
      </div>
    </section>
  </>;
}
