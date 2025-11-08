import { usePokemonStore } from "../store/pokemonStore";

export default function PokemonList() {
    const { list, fetchList, fetchDetails, currentPage, showLists, setShowLists, filter } = usePokemonStore();

    // Fetch pokemon details
    const handleFetchDetails = (name: string) => {
        fetchDetails(name);
        setShowLists(false);
    }


    console.log(list);

    return (
        <div className={`${showLists ? '' : 'hidden'} min-h-screen bg-gray-100 flex flex-col py-6`}>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-full overflow-scroll lg:h-[36rem] h-screen">
                {list?.length == 0 ? (
                    <div className="flex gap-2 place-item-center justify-center">
                        <img src="./images/loading.gif" alt="loading" />
                        <h1 className="text-center animate-pulse">Fetching pokemons...</h1>
                    </div>
                ) : list
                    ?.filter(e => e.name?.includes(filter))
                    .map((p) => (
                        <div
                            key={p.name}
                            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 border-l-4 border-blue-500"
                        >
                            <img src="./images/pokemon_ball.png" alt="pokemon_ball" className="rounded-lg" />
                            <h3 className="text-xl font-bold capitalize mb-4 text-gray-800 hover:text-blue-600 transition-colors">
                                {p.name}
                            </h3>

                            <button
                                // onClick={() => fetchDetails(p.name)}
                                onClick={() => handleFetchDetails(p.name)}
                                className="mt-auto py-2 px-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-700 transition-colors w-full"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    disabled={currentPage === 0}
                    onClick={() => fetchList(currentPage - 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:bg-gray-400 hover:bg-gray-800 transition-colors"
                >
                    Previous
                </button>

                <button
                    onClick={() => fetchList(currentPage + 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Next
                </button>
            </div>
        </div>

    );
}
