import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl border mx-auto min-h-screen  py-6 font-primary px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
