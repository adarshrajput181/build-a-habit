import { useState } from "react";
import { useNavigate } from "react-router";
import userAPI from "../../api/userAPI.js";
import { X, CircleCheckBig, CircleAlert } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";
type Mode = "signup" | "login";


export function SignUpModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [mode, setMode] = useState<Mode>("signup");
  const navigate = useNavigate();

  const isBusy = status === "loading";
  const isSuccess = status === "success";

  const isSignup = mode === "signup";
  const title = isSignup ? "Create your account" : "Welcome back";
  const subtitle = isSignup
    ? "Start tracking your habits and time today"
    : "Log in to continue tracking";
  const buttonText = isSignup ? "Sign Up" : "Log In";
  const footerText = isSignup ? "Already have an account?" : "Don't have an account?";
  const footerLinkText = isSignup ? "Log in" : "Sign Up";

  let statusMessage = null;
  if (status == "success") {
    statusMessage = (
      <div className="login-response success">
        <CircleCheckBig />
        <span>{isSignup ? "Account created! Redirecting..." : "Logged in! Redirecting..."}</span>
      </div>
    );
  } else if (status == "error") {
    statusMessage = (
      <div className="login-response error">
        <CircleAlert />
        <span>{isSignup ? "Username already in use." : "Invalid username or password."}</span>
      </div>
    );
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    if (isBusy || isSuccess) return;

    setStatus("loading");

    try {
      if (mode == "signup") {
        const registerRes = await userAPI.register(username, password);
        if (!registerRes.ok) throw new Error("Registration Failed");

        const loginRes = await userAPI.logIn(username, password);
        if (loginRes.ok) {
          setStatus("success");
          setTimeout(() => navigate("/home", { replace: true }), 800);
        } else {
          throw new Error("Login failed after registration");
        }
      } else {
        const loginRes = await userAPI.logIn(username, password);
        if (loginRes.ok) {
          setStatus("success");
          setTimeout(() => navigate("/home", { replace: true }), 800);
        } else {
          throw new Error("Invalid credentials");
        }
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <>
      <div
        className="overlay justify-center align-center"
        onClick={() => !isBusy && !isSuccess && onClose()}
      >
        <div
          className="login-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isBusy || isSuccess}
                required
                placeholder="Username">
              </input>
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isBusy || isSuccess}
                required
                placeholder="••••••••">
              </input>
            </label>
            {statusMessage}
            <button type="submit" disabled={isBusy || isSuccess}>
              {isBusy ? "Loading..." : buttonText}
            </button>
          </form>
          <span>
            {footerText}{" "}
            <button
              type="button"
              className="login-link"
              onClick={() => {
                setMode(isSignup ? "login" : "signup");
                setStatus("idle");
              }}
            >{footerLinkText}</button></span>
          {!isBusy && !isSuccess && (
            <button
              className="close-modal justify-center align-center"
              onClick={() => onClose()}>
              <X />
            </button>
          )}
        </div>
      </div >
    </>
  );
}
