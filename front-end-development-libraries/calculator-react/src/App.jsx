import React from "react";

const { useState } = React;

const buttonsData = [
  {
    value: "Calculator",
    name: "calc"
  },
  {
    value: "AC",
    name: "clear"
  },
  {
    value: "7",
    name: "seven"
  },
  {
    value: "8",
    name: "eight"
  },
  {
    value: "9",
    name: "nine"
  },
  {
    value: "+",
    name: "add"
  },
  {
    value: "4",
    name: "four"
  },
  {
    value: "5",
    name: "five"
  },
  {
    value: "6",
    name: "six"
  },
  {
    value: "-",
    name: "subtract"
  },

  {
    value: "1",
    name: "one"
  },
  {
    value: "2",
    name: "two"
  },
  {
    value: "3",
    name: "three"
  },
  {
    value: "*",
    name: "multiply"
  },
  {
    value: ".",
    name: "decimal"
  },
  {
    value: "0",
    name: "zero"
  },
  {
    value: "=",
    name: "equals"
  },
  {
    value: "/",
    name: "divide"
  }
];

const ops = ["+", "-", "*", "/"];

// state object
const obj = {
  input: "0", // the whole expression
  prev: "", // previous user input value
  last: "", // current user input value
  isFloat: false // whether the input number is decimal or not
};

function App() {
  // 0. init
  const [input, setInput] = useState("0");

  // user input validation function
  // state = global state object
  // value = current input value

  function validate(state, value) {
    state.last = value;

    if (state.last === "AC") {
      state.last = "";
      state.input = "0";
      state.isFloat = false;
      // if there is nothing before 0, return
    } else if (state.last === "0") {
      if (state.prev === "") {
        return;
      }
    } else if (state.last === ".") {
      // if isFloat is false change to true
      if (!state.isFloat) {
        state.isFloat = true;
      } else {
        // if isFloat is true already then return
        return;
      }
    }
    // if there are several operators in a row
    else if (ops.includes(state.prev) && ops.includes(state.last)) {
      // if the state.last is not "-" delete all the previous ops from state.input
      if (state.last !== "-") {
        const opsToDelete = state.input.match(/[-+*/]/g).join("");
        state.input = state.input.replace(opsToDelete, "");
      }
    } else if (state.last === "=") {
      console.log(state.input);
      const answer = eval(state.input);
      state.input = answer;
      console.log(answer);
      // get rid of "=" at state.input += state.last; - DONE
    } else {
      // if state.last is an operator change isFloat to false (initial state)
      if (ops.includes(state.last)) {
        state.isFloat = false;
      }
      // handle the default 0 in the very first calculation
      // if there is no previous value, change the input to empty string
      if (state.prev === "") {
        state.input = "";
      }
    }

    // updating the state object
    state.last === "=" ? state.input : (state.input += state.last);
    //state.input += state.last; // adds the last input value to the input expression
    state.prev = state.last; // sets the last value as the prev value
    state.last = ""; // last value is empty string, waiting for the user input
  }

  function handleInput(value) {
    validate(obj, value);
    setInput(obj.input);
  }

  return (
    <div id="main-container">
      <Display input={input} />
      <Buttons buttonsData={buttonsData} handleInput={handleInput} />
    </div>
  );
}

function Display({ input }) {
  return (
    <div>
      <div id="display">{input}</div>
    </div>
  );
}

function Buttons({ buttonsData, handleInput }) {
  return (
    <div id="calc-keys">
      {buttonsData.map((el) => ( 
        el.name === "calc" 
        ? <span id={el.name}>{el.value}</span>
        : <button id={el.name} onClick={() => handleInput(el.value)}>
          {el.value}
        </button>
     
      ))}
    </div>
  );
}




export default App;
