import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav
      className="
        flex justify-between items-center h-[50px] 
        px-5 shadow-md bg-gray-500 text-white"
    >
      <h1 className="font-bold">React advanced</h1>

      <span>
        <Link to="/" className="mr-2">
          Home
        </Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  );
};

export default Navigation;
