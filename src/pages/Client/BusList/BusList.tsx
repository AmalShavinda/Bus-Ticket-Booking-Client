import NavBar from "../../../components/Client/NavBar";
import Footer from "../../../components/Client/Footer";
import SearchedBusList from "../../../components/Client/SearchedBusList";

const BusList = () => {
  return (
    <main className="relative overflow-hidden">
      <section>
        <NavBar />
      </section>
      <section>
        <SearchedBusList />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default BusList;
