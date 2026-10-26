import { MockSection } from "./MockSection";
import GithubIcon from "../../assets/svgs/github.svg?react";

export function HeroSection({ openModal }: { openModal: () => void }) {
  return (
    <section className="hero">
      <div className="wrap">
        <span>
          <span className="dot"></span>
          Free<b>·</b><b>GPL-3.0</b><b>·</b>Self-host or use the official instance
        </span>
        <h1 className="hero-heading">
          Track habits, one-off tasks with time estimates and <span className="pink">actual time spent.</span>
        </h1>
        <p className="hero-subtitle">
          Build-a-Habit is a small, focused habit tracker for people who care about where their hours go. Sign up on the official instance, or run your own.
        </p>
        <div className="cta justify-center">
          <button type="button" className="sign-up" onClick={openModal} >Sign Up</button>
          <a
            href="https://github.com/adarshrajput181/build-a-habit"
            target="_blank"
            rel="noopener noreferrer"
            className="button-gh"
          >
            <GithubIcon />
            View source
          </a>
        </div>
        <MockSection />
      </div>
    </section>
  );
}
