import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import FavouritesPage from "./pages/favourites-page";
import Navigation from "./components/navigation";

function App() {
  return (
    <>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </>
  );
}

export default App;
