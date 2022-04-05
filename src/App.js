import './App.css';

import {useEffect, useState} from "react"
import {ethers} from "ethers"

function App() {


  const [state, setState] = useState({accounts:[], connected:false});


  async function connectAccounts(){
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
      })

      setState({accounts})
    }

  }

  useEffect(
    ()=> {connectAccounts();},
     []
  );

  async function connect(){

      const message = "signez en bas svp"
      const signature = await window.ethereum.request({
        method:"personal_sign", 
        params: [message, state["accounts"][0]]
      })
      const signatureAddr = await ethers.utils.verifyMessage(message, signature)
      if (signatureAddr.toUpperCase() != state["accounts"][0].toUpperCase()){
        console.log("Who are you !", signatureAddr, state["accounts"][0])
      } else {
          // Of Course to be performed on the server side !!
          setState({...state, connected:true})
      }
      return(signature)

  }

  async function disconnect(){

      setState({...state, connected:false})

  }

  return (
    <div className="App">
      {
        state["connected"] ?
        <div>Connected as {state["accounts"][0]} <button onClick={disconnect}>Disconnect</button></div> :
        <button onClick={connect}>Log in !</button>
      }
    </div>
  );
}

export default App;
