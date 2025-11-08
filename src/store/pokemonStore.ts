/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface PokemonListItem {
    name: string;
    url: string;
    sprites: string;
}

//interface PokemonDetails {
//    id: number;
//    name: string;
//    weight: number;
//    sprites: {
//        front_default: string;
//    };
//}

interface PokemonState {
    list: PokemonListItem[];
    selectedPokemon: any;
    currentPage: number;
    showLists: boolean;
    filter: string;
    fetchList: (page?: number) => Promise<void>;
    fetchDetails: (name: string) => Promise<void>;
    setShowLists: (showLists: boolean) => void;
    setFilter: (filter: string) => void;
}

export const usePokemonStore = create<PokemonState>((set) => ({
    list: [],
    selectedPokemon: null,
    currentPage: 0,
    showLists: true,
    filter: '',

    fetchList: async (page = 0) => {
        const offset = page * 20;
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
        );
        const data = await res.json();
        set({ list: data.results, currentPage: page });
    },

    fetchDetails: async (name: string) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        set({ selectedPokemon: data });
    },
    setShowLists: (showLists: boolean) => set({ showLists: showLists }),
    setFilter: (filter: string) => set({ filter: filter }),
}));
