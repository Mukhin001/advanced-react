import { useEffect, useState } from "react";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github-api";
import { useDebounce } from "../hooks/debounce";
import RepoCard from "../components/repo-card";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(search.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <main className="grid gap-2 justify-center pt-10 mx-auto">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul
            className="
              list-none
              absolute top-[42px]  
              left-0 right-0 max-h-[200px] 
              shadow-md bg-amber-50
              text-black
              overflow-y-scroll"
          >
            {isLoading && (
              <p className="text-center text-green-600">Loading...</p>
            )}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="
                py-2 px-4 grid gap-2 
                hover:bg-indigo-900 
                hover:text-white
                transition-colors
                cursor-pointer"
              >
                <h3>Login: {user.login}</h3>
                {/* <p>Html-url: {user.html_url}</p>
              <p>Avatar-url: {user.avatar_url}</p>
              <div>
                <img
                  src={user.avatar_url}
                  alt="avatar"
                  width="150px"
                  height="150px"
                />
              </div> */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {areReposLoading && (
          <p className="text-center text-green-600">Repos are loading...</p>
        )}
        {repos?.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;
