import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumber] = useState(false);
  const [charallowed, setchar] = useState(false);
  const [password, setpassword] = useState("");

  const passref = useRef(null);

  const generatepassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); //char at position this simply makes indexing
    }

    setpassword(pass);
  }, [length, numberallowed, charallowed]); //this dosent change frequently these change frequently

  useEffect(() => {
    generatepassword();
  }, [length, numberallowed, charallowed]);

  const copypassword = () => {
    window.navigator.clipboard.writeText(password);
    passref.current.select();
  }; //same everywhere

  return (
    <div className="password-generator">
      <h1 className="title">Password Generator</h1>

      <div className="password-display">
        <input
          type="text"
          value={password}
          className="password-input"
          placeholder="Your secure password"
          readOnly
          ref={passref}
        />
        <button
          onClick={copypassword}
          className="copy-btn"
          title="Copy to clipboard"
        >
          Copy
        </button>
      </div>

      <div className="controls">
        <div className="control-group">
          <label className="control-label">Password Length: {length}</label>
          <input
            type="range"
            min={4}
            max={20}
            value={length}
            className="slider"
            onChange={(e) => setlength(Number(e.target.value))}
          />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={numberallowed}
              onChange={() => setnumber((prev) => !prev)}
              className="checkbox"
            />
            Include Numbers
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={charallowed}
              onChange={() => setchar((prev) => !prev)}
              className="checkbox"
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
