import { usePokemonStore } from "../store/pokemonStore";

export default function Header() {
    const {  filter, setFilter, list, showLists } = usePokemonStore();
    
    return (
        <div className={`${showLists ? '' : 'hidden'} flex justify-between w-full`}>
            <img src="./images/pokemon.png" alt="pokemon" className="h-16" />
            <h1 className="text-2xl hidden lg:inline font-semibold mt-4">Showing  {list?.length} Pokemons</h1>
            <input
                type="text"
                placeholder="Search pokemon name..."
                className="pl-2 border border-slate-400 rounded-lg p-1 h-10 w-full lg:w-[17rem] mt-3"
                value={filter}
                onChange={(e) => setFilter(e.target.value?.toLowerCase())}
            />
        </div>
    )
}
