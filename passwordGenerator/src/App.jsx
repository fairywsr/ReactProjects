import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  // useref hook variable
  const passwordRef= useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""; 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += '(){}[]~|/"!@#$%^&*_-+=';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyToClipBoard = useCallback( ()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
     window.navigator.clipboard.writeText(password)
  }, [password])

     useEffect( ()=>{
       passwordGenerator()
     },[length, number, char, setPassword])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-6 my-8 text-blue-800 bg-gray-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipBoard}
          className="bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterinput"
              defaultChecked={char}
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
             <label htmlFor="characterinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
