import logo from './logo.svg';
import './App.css';
import { useForm, useController } from "react-hook-form";
import { connect } from "react-redux"
import {updateAction} from './actions/updateAction';

const Form = ({ count=0, rooms=0, bathrooms=0, parkingSpaces=0, condoFee=0, taxes=0, sqrMeters=0 }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => count++
  console.log(watch("count"));
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label><h2>Número de Quartos</h2></label>
      <select {...register("rooms")}>
        <option value={ rooms } disabled selected hidden>{ rooms }</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>
      <label><h2>Número de Banheiros</h2></label>
      <select {...register("bathrooms")}>
        <option value="" disabled selected hidden>Selecione</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>
      <label><h2>Vagas na garagem</h2></label>
      <select {...register("parkingSpaces")}>
        <option value="" disabled selected hidden>Selecione</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4+</option>
      </select>
      <label><h2>Condomínio (R$)</h2></label>
      <input {...register("condoFee")} />
      <label><h2>ITPU (R$)</h2></label>
      <input {...register("taxes")} />
      <label><h2>Área (m²)</h2></label>
      <input {...register("sqrMeters")} />
      {/* <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>} */}
      
      <input className="submit-btn" type="submit" value="Calcular" />
      <h4>Previsão de valor:</h4>
      <input {...register("count")} value={ count} disabled/>
    </form>
  );
}

function App(props) {

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

connect(({ count, rooms, bathrooms, parkingSpaces, condoFee, taxes, sqrMeters }) => ({ count, rooms, bathrooms, parkingSpaces, condoFee, taxes, sqrMeters }), updateAction)(Form)

export default App;
