import Card from "./components/Card";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SavedWords from "./components/SavedWords";
import Searchbar from "./components/Searchbar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between bg-gradient-to-tr from-sky-100 via-emerald-50 to-yellow-100">
      <Navbar />
      <div className="flex justify-center items-start gap-10 mt-10">
        <div className="flex flex-col w-1/3 justify-center items-center">
          <Searchbar />
          <Card />
        </div>
        <div className="flex flex-col w-1/3 justify-center items-center">
          <SavedWords />
        </div>
      </div>
      <Footer />
    </div>
  );
}
