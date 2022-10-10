import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { allAddresses } from "./static/addresses";
import { axiosPOST } from "./services/apiService";

const Form = () => {
  const [postAuthor, setPostAuthor] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [hasRegistering, setHasRegistring] = useState(0);

  const [address, setAddress] = useState('');
  const [readyToMove, setReadyToMove] = useState(0);
  const [area, setArea] = useState(0);
  const [resale, setResale] = useState(0)

  const [prediction, setPrediction] = useState(0);


  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      postedBy: postAuthor,
      hasRegistering: hasRegistering,
      rooms: rooms,
      area: area,
      readyToMove: readyToMove,
      resale: resale,
      address: address
    }

    const req = await axiosPOST("http://www.hackaton-olx-prod-hackaton-olx-m6tiu4.mo2.mogenius.io", data)
    setPrediction(req.prediction)
  }

  useEffect(() => {
    console.log(`prediction ${prediction}`)
    document.getElementById("prediction").innerHTML = prediction
  },[prediction])

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h2>Postado por:</h2>
      </label>
      <select onChange={(e) => setPostAuthor(parseInt(e.target.value))}>
        <option value="1" selected>Dono</option>
        <option value="2">Imobiliária</option>
        <option value="3">Construtor</option>
      </select>

      <label>
        <h2>Número de quartos</h2>
      </label>
      <select onChange={(e) => setRooms(parseInt(e.target.value))}>
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>

      <label>
        <h2>Possui escritura?</h2>
      </label>
      <select onChange={(e) => e.target.value && setHasRegistring(parseInt(e.target.value))}>
        <option value="1">Sim</option>
        <option value="0">Não</option>
      </select>

      <label>
        <h2>Endereço</h2>
      </label>
      <select onChange={(e) => setAddress(e.target.value)}>
        <option value="Endereço" disabled selected>Selecione</option>
        {
          allAddresses.map((address, index) => <option key={index} value={address}>{address}</option>)
        }
      </select>

      <label>
        <h2>Área (m²)</h2>
      </label>
      <input 
        value={area}
        type="number" 
        onChange={e => setArea(e.target.value)}
      />

      <label>
        <h2>Pronta entrega:</h2>
      </label>
      <select onChange={(e) => setReadyToMove(parseInt(e.target.value))}>
        <option value="1" selected>Sim</option>
        <option value="2">Não</option>
      </select>
      
      <label>
        <h2>Único dono:</h2>
      </label>
      <select onChange={(e) => setResale(parseInt(e.target.value))}>
        <option value="0" selected>Sim</option>
        <option value="1">Não</option>
      </select>
      
      <input className="submit-btn" type="submit" value="Calcular"/>

      <h4>Previsão de valor:</h4>
      <div id="prediction">{prediction}</div>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="App-body">
        <div className="Form-div">
          <h1>Título do formulário</h1>
          <Form className="Form" />
        </div>
      </div>
    </div>
  );
}

export default App;