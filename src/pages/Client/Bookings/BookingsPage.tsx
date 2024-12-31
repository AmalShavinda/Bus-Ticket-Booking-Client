import Bookings from '../../../components/Client/Bookings'
import NavBar from '../../../components/Client/NavBar'
import Footer from '../../../components/Client/Footer'

const BookingsPage = () => {
  return (
    <main className="relative overflow-hidden">
      <section>
        <NavBar />
      </section>
      <section>
        <Bookings />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  )
}

export default BookingsPage

