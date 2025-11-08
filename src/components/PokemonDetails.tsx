/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePokemonStore } from "../store/pokemonStore";

export default function PokemonDetails() {
    const { selectedPokemon, showLists, setShowLists } = usePokemonStore();

    const statsColor = ['blue', 'green', 'blue', 'green', 'blue', 'green'];

    if (!selectedPokemon)
        return (
            <div className="bg-white shadow rounded-lg p-4 mt-6 text-center">
                <p className="text-gray-500">Select a Pokémon to view details</p>
            </div>
        );

    const stats = selectedPokemon.stats.map((s: any) => ({
        name: s.stat.name,
        base: s.base_stat,
    }));

    const maxStat = Math.max(...stats.map((s: any) => s.base));

    return (
        <div
            className={`${showLists ? "hidden" : ""
                } w-full min-h-screen bg-gradient-to-b from-blue-50 to-white p-6`}
        >
            <div className="max-w-full mx-auto bg-white shadow-xl rounded-3xl p-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                    <h1 className="text-4xl font-extrabold text-center capitalize tracking-wide flex gap-2">
                        <img src="/pokemon-viewer/images/pokemon_ball.png" alt="pokemon" className="flex h-12" />
                        {selectedPokemon.name}
                    </h1>

                    <div className="text-gray-600 text-lg">
                        <button className="font-semibold hover:font-bold" onClick={() => setShowLists(true)}>← back to lists</button>
                    </div>
                </div>

                {/* Upper Layout (Image + Info) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Images */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="border p-6 rounded-lg border-slate-300 shadow-lg flex flex-col items-center gap-4">
                            <img
                                src={selectedPokemon.sprites.front_default}
                                alt={selectedPokemon.name}
                                className="w-48 h-48 object-contain border rounded-xl shadow border-slate-300"
                            />

                            <div className="grid grid-cols-3 gap-2 w-full">
                                <img
                                    src={selectedPokemon.sprites.front_shiny}
                                    className="w-full h-24 border rounded-lg shadow-sm object-contain border-slate-300"
                                    alt={selectedPokemon.sprites.front_shiny}
                                />
                                <img
                                    src={selectedPokemon.sprites.back_default}
                                    alt={selectedPokemon.sprites.back_default}
                                    className="w-full h-24 border rounded-lg shadow-sm object-contain border-slate-300"
                                />
                                <img
                                    src={selectedPokemon.sprites.back_shiny}
                                    alt={selectedPokemon.sprites.back_shiny}
                                    className="w-full h-24 border rounded-lg shadow-sm object-contain border-slate-300"
                                />
                            </div>
                        </div>


                        {/* Audio */}
                        {selectedPokemon.cries?.latest && (
                            <audio
                                controls
                                className="mt-3 w-full px-6"
                                src={selectedPokemon.cries.latest}
                            ></audio>
                        )}

                        {/* Stats Section */}
                        <div className="mt-10 w-full rounded-lg border p-6 border-slate-300 shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Base Stats</h2>

                            {/* Custom Bar Chart — NO library used */}
                            <div className="space-y-4">
                                {stats.map((stat: any, index: number) => {
                                    const percent = (stat.base / maxStat) * 100;

                                    return (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1 text-sm font-medium">
                                                <span className="capitalize">{stat.name}</span>
                                                <span>{stat.base}</span>
                                            </div>

                                            {/* Bar */}
                                            <div className={`w-full bg-gray-200 h-4 rounded-full overflow-hidden`}>
                                                <div
                                                    className={`h-full bg-${statsColor[index]}-500 rounded-full transition-all`}
                                                    style={{ width: `${percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="md:col-span-2 p-6 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-slate-300">

                        {/* Section Title */}
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            Pokémon Info
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Basic Attributes */}
                            <div className="bg-slate-100 p-5 rounded-xl shadow-inner">
                                <h3 className="font-semibold text-xl mb-3">Basic Stats</h3>

                                <div className="space-y-3 text-lg">
                                    <p>
                                        <span className="font-semibold text-slate-700">Base XP:</span>{" "}
                                        <span className="font-bold">{selectedPokemon.base_experience}</span>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-slate-700">Height:</span>{" "}
                                        {(selectedPokemon.height / 10).toFixed(1)} m
                                    </p>
                                    <p>
                                        <span className="font-semibold text-slate-700">Weight:</span>{" "}
                                        {(selectedPokemon.weight / 10).toFixed(1)} kg
                                    </p>
                                </div>
                            </div>

                            {/* Types */}
                            <div className="bg-blue-50 p-5 rounded-xl shadow-inner">
                                <h3 className="font-semibold text-xl mb-3">Types</h3>

                                <div className="flex flex-wrap gap-2">
                                    {selectedPokemon.types.map((t: any, i: number) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1 bg-blue-500 text-white rounded-full font-medium shadow capitalize hover:bg-blue-700 transition"
                                        >
                                            {t.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Abilities */}
                            <div className="bg-green-50 p-5 rounded-xl shadow-inner">
                                <h3 className="font-semibold text-xl mb-3">Abilities</h3>

                                <div className="flex flex-wrap gap-2">
                                    {selectedPokemon.abilities.map((a: any, i: number) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1 bg-green-500 text-white rounded-full font-medium shadow capitalize hover:bg-green-700 transition"
                                        >
                                            {a.ability.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>


                        {/* Held Items */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-6">

                            <div className="bg-gray-100 p-5 rounded-xl shadow-inner">
                                <h3 className="font-semibold text-xl mb-3">Held Items</h3>

                                <div className="grid grid-cols-6 gap-2">
                                    {selectedPokemon.held_items.map((a: any, i: number) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-full font-xs text-xs shadow capitalize hover:bg-green-700 transition"
                                        >
                                            {a.item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Moves */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-6">

                            <div className="bg-gray-100 p-5 rounded-xl shadow-inner">
                                <h3 className="font-semibold text-xl mb-3">Moves</h3>

                                <div className="grid grid-cols-6 gap-2">
                                    {selectedPokemon.moves.map((a: any, i: number) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-green-500 text-white rounded-full font-xs text-xs shadow capitalize hover:bg-green-700 transition"
                                        >
                                            {a.move.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
