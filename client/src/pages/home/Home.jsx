import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Hero from "../../components/home/Hero";
import Providers from "../../components/home/Providers/Providers";
import PopularCategories from "../../components/home/PopularCategories";
import HowItWorks from "../../components/home/HowItWorks/HowItWorks";
import Testimonials from "../../components/home/Testimonials/Testimonials";
import FAQ from "../../components/home/FAQ/FAQ";

const Home = () => {
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