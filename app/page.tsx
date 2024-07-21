import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center bg-gradient-to-tr h-screen from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <Card />
      <div className="flex justify-end self-end">
        <Footer />
      </div>
    </div>
  );
}
