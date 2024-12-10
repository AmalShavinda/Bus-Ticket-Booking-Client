import AboutUs from "../../../components/Client/AboutUs";
import Footer from "../../../components/Client/Footer";
import Hero from "../../../components/Client/Hero";
import NavBar from "../../../components/Client/NavBar";
import OurServices from "../../../components/Client/OurServices";


const Home = () => {
  return (
    <main className="relative overflow-hidden">
      <section>
        <NavBar />
      </section>
      <section>
        <Hero />
      </section>
      <section>
        <OurServices />
      </section>
      <section>
        <AboutUs />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Home;
