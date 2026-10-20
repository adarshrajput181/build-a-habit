import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import userAPI from "../api/userAPI";

import { HeroSection } from "../components/landing/HeroSection";
import { Header } from "../components/landing/Header";
import { Footer } from "../components/landing/Footer";

export function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const redirectIfLoggedIn = async () => {
        const response = await userAPI.getUser();
        if (response.status == 200) {
          navigate("/home", { replace: true });
        }
      };

      redirectIfLoggedIn();
    } catch (_) {
      console.error("Error checking login status");
    }
  });

  return (
    <>
      <Header />
      <HeroSection />
      <Footer />
    </>
  );
}
