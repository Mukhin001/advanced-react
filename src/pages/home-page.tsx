import { useSearchUsersQuery } from "../store/github/github-api";

const HomePage = () => {
  const { isLoading, isError, data } = useSearchUsersQuery("igor");
  console.log(data);

  return (
    <main className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}
      {isLoading && <p className="text-center text-green-600">Loading...</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for Github username..."
        />
        <div
          className="
          absolute top-[42px] 
          left-0 right-0 max-h-[200px] 
          shadow-md bg-amber-50
          text-black"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius,
          soluta.
        </div>
      </div>
    </main>
  );
};

export default HomePage;
