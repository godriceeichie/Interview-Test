import { useEffect, useState } from "react";
import "./App.css";
import instance from "./config/api";
import {
  validateAgreement,
  validateName,
  validateSector,
} from "./validation/formValidation";

function App() {
  const [name, setName] = useState();
  const [sector, setSector] = useState();
  const [hasAgreed, setHasAgreed] = useState(false);

  const [data, setData] = useState({});
  const [sectors, setSectors] = useState([]);

  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    instance
      .get("/sectors")
      .then((res) => {
        setSectors(res.data.sectors);
        console.log(res.data.sectors);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameError = validateName(name);
    const sectorError = validateSector(sector);
    const agreementError = validateAgreement(hasAgreed);

    setErrors({
      name: nameError,
      sector: sectorError,
      hasAgreed: agreementError,
    });

    if (nameError && sectorError && agreementError) {
      setIsLoading(true);
      // Proceed with form submission or other actions
      setData({
        name,
        sector,
        hasAgreed,
      });
      instance
        .post("/formData", data)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
        })
        .catch((er) => console.log(er));
      console.log(data);
    }
  };
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
                <option value="" selected disabled>
                  Select a sector
                </option>
                {sectors.map(({ _id, sector }) => {
                  return (
                    <option value={sector} key={_id}>
                      {sector}
                    </option>
                  );
                })}
              </select>
              {errors?.sector && <span className="error">{errors.sector}</span>}
            </div>
            <div className="form-field-checkbox-container">
              <input type="checkbox" name="" id="" onChange={(e) => setHasAgreed(true)}/>
              <label>Agree to terms</label>
              {errors?.hasAgreed && (
                <span className="error">{errors.hasAgreed}</span>
              )}
            </div>
            <button>
              {isLoading && (
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="spinner"
                >
                  <path
                    d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231 0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475 2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464 1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                    stroke="white"
                  />
                </svg>
              )}
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
