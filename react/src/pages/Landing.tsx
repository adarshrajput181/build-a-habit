import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import userAPI from "../api/userAPI";

import { Header } from "../components/landing/Header";
import { HeroSection } from "../components/landing/HeroSection";
import { SessionSection } from "../components/landing/SessionSection";
import { Footer } from "../components/landing/Footer";
import { SignUpModal } from "../components/landing/SignUpModal";

export function Landing() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
      <Header openModal={() => setModalOpen(true)} />
      <main className="landing">
        <HeroSection openModal={() => setModalOpen(true)} />
        <SessionSection />
      </main>
      <Footer />
      {modalOpen && <SignUpModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
