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
        <div className="flex flex-col w-1/3 justify-end items-start">
          <SavedWords />
        </div>
      </div>
      <Footer />
    </div>
  );

  // return (
  //   <div className="flex flex-col justify-between items-center bg-gradient-to-tr w-full h-screen from-sky-100 via-emerald-50 to-yellow-100">
  //     <div className="flex justify-center items-center w-full">
  //       <div className="flex flex-col justify-center w-full">
  //         <Navbar />
  //         <Searchbar />
  //         <Card />
  //       </div>
  //       <div>
  //         <SavedWords />
  //       </div>
  //     </div>
  //     <div className="flex justify-end self-end">
  //       <Footer />
  //     </div>
  //   </div>
  // );
}
