import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState();
  const [sector, setSector] = useState()
  const [hasAgreed, setHasAgreed] = useState(false)

  const [data, setData] = useState()

  const handleSubmit = () => {

  }
  return (
    <>
      <section className="form-wrapper">
        <div action="" className="form">
          <div className="form-heading-container">
            <h1 className="form-heading">Welcome!</h1>
            <p className="form-subheading">
              Please enter your name and pick the Sectors you are currently
              involved in.
            </p>
          </div>
          <form className="form-fields" onSubmit={handleSubmit}>
            <div className="form-field-container">
              <label htmlFor="">Name:</label>
              <input
                placeholder="Enter your name"
                type="text"
                className="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-field-container">
              <label htmlFor="">Sector:</label>
              <select
                name=""
                id=""
                className="sector"
                onChange={(e) => setSector(e.target.value)}
              >
                <option value=""></option>
              </select>
            </div>
            <div className="form-field-checkbox-container">
              <input type="checkbox" name="" id=""/>
              <label>Agree to terms</label>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
