import React, { useState } from "react";
import "./styles.css";

//creating the object of the emoji

var emojiLib = {
  "🏹": "Bow and ArroW",
  "🎱": "Pool 8 Ball",
  "♟️": "Chess",
  "🎮": "Video Game",
  "🎿": " Skis",
  "🛷": "Sled",
  "🥌": "Curling Stone",
  "⛳": "Golf",
  "⛸️": "Ice Skating",
  "⚽": "Soccer Ball",
  "🥊": "Boxing Glove",
  "🏸": "Badminton",
  "🏓": "Ping Pong",
  "🥍": "Lacrosse",
  "🏒": "Ice Hockey",
  "🏑": "Field Hockey",
  "🏀": "Basketball",
  "🏏": "Cricket Game",
  "🎳": "Bowling",
  "🥏": "Flying Disc",
  "🎾": "Tennis",
  "🏉": "Rugby Football",
  "🏈": "American Football",
  "🏐": "Volleyball",
  "⚾": "Baseball"
};
var arrayEmoji = Object.keys(emojiLib);

export default function App() {
  var [emojiMeaning, setEmojiMeaning] = useState("");
  function inputHandler(event) {
    var emoji = event.target.value;
    emojiMeaning = emojiLib[emoji];
    if (emoji in emojiLib) {
      setEmojiMeaning(emojiMeaning);
    } else {
      setEmojiMeaning(
        "your input emoji is not available with us please contact the developer"
      );
    }
  }
  function clickHandler(event) {
    var emoji = event.target.innerText;
    emojiMeaning = emojiLib[emoji];
    setEmojiMeaning(emojiMeaning);
  }
  return (
    <div className="App">
      <h2 className="header"> Put the Sports emoji to Find out</h2>
      <input onInput={inputHandler} className="InputEmoji" /> <br />
      <h3 className="Output">{emojiMeaning}</h3>
      {arrayEmoji.map(function (item, index) {
        return (
          <span
            key={item}
            style={{
              margin: "0.7rem 1rem",
              display: "inline-block",
              cursor: "pointer"
            }}
            onClick={clickHandler}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
