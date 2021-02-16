import React, { useState } from "react";
import "./styles.css";

var recommendationLib = {
  "Youtube Channels": [
    { name: "How to make everything", rating: "5 / 5 " },
    { name: "Computerphile", rating: "5 / 5 " },
    { name: "Stuffs matter here", rating: "5.5 / 5" }
  ],
  Books: [
    { name: "Head First serire for programming", rating: "6 / 5 " },
    { name: "Internet Book", rating: "5 / 5 " },
    { name: "Innovator", rating: "5 / 5 " }
  ],
  "Football League": [
    { name: "English Premier League", rating: "6 / 5 " },
    { name: "Indian Super League", rating: "3.75 / 5" },
    { name: "La Liga", rating: "4.5 / 5" }
  ],
  Activities: [
    { name: "Programming", rating: "6 / 5 " },
    { name: "Designing and Sketching", rating: "5 / 5 " },
    { name: "Hacking", rating: "5 / 5 " }
  ],
  Website: [
    { name: "Freecodecamp", rating: "6 / 5 " },
    { name: "W3school and Mdn documentation", rating: "10 / 5 " },
    { name: "Notion", rating: "4.5 / 5" }
  ]
};
var buttonText = "";
var arrayList = Object.values(recommendationLib);
var indexNumber = 0;
export default function App() {
  var [thing, setThing] = useState("");
  function clickHandler(event) {
    buttonText = event.target.innerText;
    setThing(buttonText);
    indexNumber = indexNumberF(buttonText);
    console.log(indexNumber, " value");

    if (buttonText in recommendationLib) {
      console.log("working fine");
    } else {
      console.log(
        "there is some technical issue please report it to the developer"
      );
    }
  }
  function indexNumberF(input) {
    var holdingValue;
    switch (input) {
      case "Youtube Channels":
        holdingValue = 0;
        break;
      case "Books":
        holdingValue = 1;
        break;
      case "Football League":
        holdingValue = 2;
        break;
      case "Activities":
        holdingValue = 3;
        break;
      case "Website":
        holdingValue = 4;
        break;
      default:
        console.log("fault ", input);
    }
    return holdingValue;
  }

  return (
    <div className="App">
      <header>
        <h1 className="header__heading">
          Preferences on things <span>😃</span>
        </h1>
        <p className="header__paragraph">
          My Recommendation on different things
        </p>
      </header>

      <main className="Recommendation-section">
        <div className="buttons">
          <button onClick={clickHandler} className="button-child">
            Youtube Channels
          </button>
          <button onClick={clickHandler} className="button-child">
            Books
          </button>
          <button onClick={clickHandler} className="button-child">
            Football League
          </button>
          <button onClick={clickHandler} className="button-child">
            Activities
          </button>
          <button onClick={clickHandler} className="button-child">
            Website
          </button>
        </div>
        <section className="main__solution">
          {arrayList[indexNumber].map((item) => {
            return (
              <div className="box-solution">
                <h3>{item.name}</h3>
                <p>{item.rating}</p>
              </div>
            );
          })}
        </section>
      </main>
      <footer>
        <a
          style={{ color: "pink", fontSize: "1.5rem", padding: "0 0.5rem" }}
          href="https://instagram.com/transhumanist19"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          style={{
            color: "lightBlue",
            fontSize: "1.5rem",
            padding: "0 0.5rem"
          }}
          href="https://twitter.com/anjelrana"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
      </footer>
    </div>
  );
}
