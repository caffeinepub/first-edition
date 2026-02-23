import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type Character = {
    name : Text;
    description : Text;
    traits : [Text];
    relationships : [Text];
  };

  type FlipbookPage = {
    textContent : Text;
    imageUrl : Text;
    pageNumber : Nat;
  };

  type Flipbook = {
    title : Text;
    author : Principal;
    pages : [FlipbookPage];
    createdAt : Int;
  };

  module Character {
    public func compareByName(char1 : Character, char2 : Character) : Order.Order {
      Text.compare(char1.name, char2.name);
    };
  };

  let characters = Map.empty<Principal, [Character]>();

  public shared ({ caller }) func addCharacter(character : Character) : async () {
    let existingChars = switch (characters.get(caller)) {
      case (null) { [] };
      case (?chars) { chars };
    };
    characters.add(caller, existingChars.concat([character]));
  };

  public query ({ caller }) func getCharacters() : async [Character] {
    switch (characters.get(caller)) {
      case (null) { [] };
      case (?chars) { chars.sort(Character.compareByName) };
    };
  };

  public query ({ caller }) func getCharacterByName(name : Text) : async Character {
    switch (characters.get(caller)) {
      case (null) { Runtime.trap("No characters found for this user") };
      case (?chars) {
        switch (chars.find(func(c) { c.name == name })) {
          case (null) { Runtime.trap("Character not found") };
          case (?character) { character };
        };
      };
    };
  };

  public shared ({ caller }) func deleteCharacter(name : Text) : async () {
    switch (characters.get(caller)) {
      case (null) { Runtime.trap("No characters found for this user") };
      case (?chars) {
        let filtered = chars.filter(func(c) { c.name != name });
        characters.add(caller, filtered);
      };
    };
  };

  public query func getSampleCharacters() : async [Character] {
    [
      {
        name = "Luna";
        description = "A brave young girl with a curious mind.";
        traits = ["curious", "brave", "kind"];
        relationships = ["friend to Max"];
      },
      {
        name = "Max";
        description = "A loyal dog with a big heart.";
        traits = ["loyal", "smart", "protective"];
        relationships = ["companion to Luna"];
      },
    ];
  };
};
