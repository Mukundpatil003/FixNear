import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Hero from "../../components/home/Hero";
import Providers from "../../components/home/Providers/Providers";
import PopularCategories from "../../components/home/PopularCategories";
import HowItWorks from "../../components/home/HowItWorks/HowItWorks";
import Testimonials from "../../components/home/Testimonials/Testimonials";
import FAQ from "../../components/home/FAQ/FAQ";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");

    const timer = setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Navbar />

      <Hero />

      <Providers />

      <PopularCategories />

      <HowItWorks />

      <Testimonials />

      <FAQ />

      <Footer />
    </>
  );
};

export default Home;