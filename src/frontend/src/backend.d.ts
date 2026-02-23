import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Character {
    traits: Array<string>;
    name: string;
    description: string;
    relationships: Array<string>;
}
export interface backendInterface {
    addCharacter(character: Character): Promise<void>;
    deleteCharacter(name: string): Promise<void>;
    getCharacterByName(name: string): Promise<Character>;
    getCharacters(): Promise<Array<Character>>;
    getSampleCharacters(): Promise<Array<Character>>;
}
