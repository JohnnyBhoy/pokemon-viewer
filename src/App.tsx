import { useEffect } from "react";
import { usePokemonStore } from "./store/pokemonStore";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import './index.css';
import Header from "./components/Header";

export default function App() {
  const { fetchList } = usePokemonStore();

  useEffect(() => {
    fetchList(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <PokemonList />
      <PokemonDetails />
    </div>
  );
}
