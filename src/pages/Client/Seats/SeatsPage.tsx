import NavBar from "../../../components/Client/NavBar";
import Footer from "../../../components/Client/Footer";
import Seats from "../../../components/Client/Seats";

const SeatsPage = () => {
  return (
    <main className="relative overflow-hidden">
      <section>
        <NavBar />
      </section>
      <section>
        <Seats />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default SeatsPage;
