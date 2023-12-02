import { useEffect, useState } from "react";
import "./App.css";
import instance from "./config/api";
import { validateAgreement, validateName, validateSector } from "./validation/formValidation";

function App() {
  const [name, setName] = useState();
  const [sector, setSector] = useState()
  const [hasAgreed, setHasAgreed] = useState(false)

  const [data, setData] = useState({})
  const [sectors, setSectors] = useState([])

  const [errors, setErrors] = useState()

  useEffect(() => {
    instance.get('/sectors')
      .then(res => {
        setSectors(res.data.sectors)
        console.log(res.data.sectors)
      }).catch((err) => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const nameError = validateName(name);
    const sectorError = validateSector(sector);
    const agreementError = validateAgreement(hasAgreed);

    setErrors({
      name: nameError,
      sector: sectorError,
      hasAgreed: agreementError,
    });

    if (!nameError && !sectorError && !agreementError) {
      // Proceed with form submission or other actions
      setData({
        name,
        sector,
        hasAgreed,
      });
      console.log(data);
    }
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
              {errors?.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-field-container">
              <label htmlFor="">Sector:</label>
              <select
                name=""
                id=""
                className="sector"
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="" selected disabled>Select a sector</option>
                {
                  sectors.map(({_id, sector}) => {
                    return(
                      <option value={sector} key={_id}>{sector}</option>
                    )
                  })
                }
              </select>
              {errors?.sector && <span className="error">{errors.sector}</span>}
            </div>
            <div className="form-field-checkbox-container">
              <input type="checkbox" name="" id=""/>
              <label>Agree to terms</label>
              {errors?.hasAgreed && <span className="error">{errors.hasAgreed}</span>}
            </div>
            <button>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
