import { useState, useCallback, useEffect, useRef } from "react";

// App.css import removed as we're using Tailwind

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Password Generator
        </h1>

        <div className="flex space-x-2">
          <input
            type="text"
            value={password}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your secure password"
            readOnly
            ref={passref}
          />
          <button
            onClick={copypassword}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-r-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Copy to clipboard"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="flex justify-between items-center text-gray-700">
              <span>Password Length</span>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {length}
              </span>
            </label>
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              onChange={(e) => setlength(Number(e.target.value))}
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={numberallowed}
                onChange={() => setnumber((prev) => !prev)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={charallowed}
                onChange={() => setchar((prev) => !prev)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Include Special Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
