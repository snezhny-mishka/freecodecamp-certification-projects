import React from "react";
const { useState } = React;
const { useEffect } = React;

const keys = [
    {
        key: "Q",
        keyCode: 81,
        id: "Heater-1",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
    },
    {
        key: "W",
        keyCode: 87,
        id: "Heater-2",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
    },
    {
        key: "E",
        keyCode: 69,
        id: "Heater-3",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
    },
    {
        key: "A",
        keyCode: 65,
        id: "Heater-4",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
    },
    {
        key: "S",
        keyCode: 83,
        id: "Clap",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
    },
    {
        key: "D",
        keyCode: 68,
        id: "Open-HH",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
    },
    {
        key: "Z",
        keyCode: 90,
        id: "Kick-n'Hat",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
    },
    {
        key: "X",
        keyCode: 88,
        id: "Kick",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
    },
    {
        key: "C",
        keyCode: 67,
        id: "Closed-HH",
        url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
    },
];

function App() {
    const [power, setPower] = React.useState(false);
    const [soundName, setSoundName] = React.useState("");

    function onOff() {
        setPower(!power);
    }

    function handleClick(key, name) {
        setSoundName(name);
        const audio = document.getElementById(key);
        stylePressedKey(audio);
        audio.currentTime = 0;
        audio.play();
        styleRealisedKey(audio);
    }

    function stylePressedKey(audio) {
        audio.parentElement.style.background = "#F4AC45";
        audio.parentElement.style.color = "white";
        audio.parentElement.style.filter = "none";
    }

    function styleRealisedKey(audio) {
        setTimeout(() => {
            audio.parentElement.style.background = "#92BFB1";
            audio.parentElement.style.color = "black";
            audio.parentElement.style.filter = "drop-shadow(3px 3px 2px grey)";
        }, 300);
    }

    return (
        <div id="drum-machine">
            <div id="controls">
                <Display name={soundName} power={power} />
                <PowerButton power={power} onOff={onOff} />
            </div>
            <KeyBoard handleClick={handleClick} power={power} />
        </div>
    );
}

function PowerButton({ power, onOff }) {
    return (
        <button
            id="power-button"
            onClick={onOff}
            style={power ? { backgroundColor: "#A61C3C" } : { backgroundColor: "#495159" }}
        >
            {power ? "OFF" : "ON"}
        </button>
    );
}

function Display({ name }) {
    return <h3 id="display">{name}</h3>;
}

function KeyBoard({ handleClick, power }) {
    return (
        <div id="keyboard">
            {power
                ? keys.map((keys) => <Key handleClick={handleClick} keys={keys} />)
                : keys.map((keys) => (
                      <Key handleClick={handleClick} keys={{ ...keys, url: " ", id: "No power" }} />
                  ))
            }
        </div>
    );
}

function Key({ handleClick, keys }) {

    const handleKeyDown = (event) => {
        if (event.keyCode === keys.keyCode) {
            handleClick(keys.key, keys.id);
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <button className="drum-pad" id={keys.id} onClick={() => handleClick(keys.key, keys.id)}>
            <audio className="clip" id={keys.key} src={keys.url}></audio>
            {keys.key}
        </button>
    );
}

export default App;