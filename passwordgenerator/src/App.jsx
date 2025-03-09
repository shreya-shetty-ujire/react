import { useEffect, useCallback, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]= useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword]=useState('')

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for(let i=1;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length, numberAllowed, charAllowed])

  const passwordRef = useRef(null)

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed, charAllowed])

  const copyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800 text-orange-500 shadow-md rounded-lg px-4 py-3">
          <h1 className="text-2xl text-center mb-4">GENERATE PASSWORD</h1>
  
          <div className="flex items-center justify-between bg-white text-red-600 p-2 rounded-md h-16">
            <input type='text' value={password} className='outline-none w-full py-1 px-3' 
            placeholder='Password'
            readOnly ref={passwordRef}></input>
            <button onClick={copyPassword} className="bg-blue-500 text-white px-4 py-1 rounded-md ml-2">Copy</button>
          </div>
  
          <div className="mt-4">
            <label htmlFor='length' className="block mb-2 text-lg font-medium">Password Length: {length}</label>
            <input type="range"
             min={6} 
             max={100} 
             value={length} 
             className="cursor-pointer" 
             onChange={(e) => setLength(e.target.value)}
             />
             
          </div>
  
          <div className="mt-4 flex items-center space-x-4">
          <input type="checkbox" 
              defaultChecked={numberAllowed}
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }}
              className="mr-2" />
            <label htmlFor='number' className="flex items-center">
            Numbers
            </label>
            <input type="checkbox" 
              defaultChecked={charAllowed}
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }}
              className="mr-2" />
            <label className="flex items-center">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default App
