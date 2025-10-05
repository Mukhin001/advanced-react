import { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import type { IRepo } from "../models/models";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div
      className="
      border py-4 px-5
      rounded mb-2 hover:shadow-md
      hover:bg-cyan-500 transition-all"
    >
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.fork}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFav && (
          <button
            className="
            py-2 px-4 bg-yellow-400 
            rounded hover:shadow-md
            transition-all mr-2 cursor-pointer"
            onClick={addToFavourites}
          >
            Add
          </button>
        )}
        {isFav && (
          <button
            className="
            py-2 px-4 bg-red-400 
            rounded hover:shadow-md
            transition-all cursor-pointer"
            onClick={removeFromFavourites}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
