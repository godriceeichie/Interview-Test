import React, { useEffect, useState } from "react";
import {
  validateAgreement,
  validateName,
  validateSector,
} from "../validation/formValidation";
import instance from "../config/api";
import { useRecoilState } from "recoil";
import idAtom from "../states/atoms/formDataId";
import { Link } from "react-router-dom";

const UpdateForm = () => {
  //State for each input fields
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);

  //The state holding input fields together
  const [data, setData] = useState({});
  const [sectors, setSectors] = useState([]);

  //State to track errors in the input fields
  const [errors, setErrors] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [id, setId] = useRecoilState(idAtom);

  const [storedId, setStoredId] = useState(null);

  useEffect(() => {
    instance
      .get("/sectors")
      .then((res) => {
        setSectors(res.data.sectors);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setStoredId(localStorage.getItem('formId'))
    console.log(storedId)
    if(storedId){
      instance
      .get(`/formData/${storedId}`)
      .then((res) => {
        setName(res.data.name);
        setSector(res.data.sector);
        setHasAgreed(res.data.hasAgreed);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    }
    
    
  }, [storedId]);

  const handleSubmit =(e) => {
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
      setIsLoading(true);
      // Proceed with form submission or other actions
      setData({
        name,
        sector,
        hasAgreed,
      });
    }
  }

  useEffect(() => {
    // This effect will run whenever the 'data' state changes
    if (Object.keys(data).length > 0) {
      // Now you can proceed with posting the data
      instance
        .patch(`/updateformData/${storedId}`, data)
        .then((res) => {
          setId(res.data._id);
          setIsLoading(false);
          setSuccess(true);
          console.log(res.data)
        })
        .catch((er) => console.log(er));
    }
  }, [data]); 

  return (
    <>
      <section className="form-wrapper">
        <div action="" className="form"  onSubmit={handleSubmit}>
          <div className="form-heading-container">
            <h1 className="form-heading">Welcome!</h1>
            <p className="form-subheading">
              Please enter your name and pick the Sectors you are currently
              involved in.
            </p>
          </div>
          {success && (
            <div className="successMessage">
              Form Data updated succesfully
            </div>
          )}
          <form className="form-fields">
            <div className="form-field-container">
              <label htmlFor="">Name:</label>
              <input
                placeholder="Enter your name"
                type="text"
                className="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                defaultValue={sector}
                // defaultValue={sector}
              >
                <option value={sector}>{sector}</option>
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
              <input
                type="checkbox"
                name="agreement"
                htmlFor="agreement"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
              />
              <label id="agreement">Agree to terms</label>
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
              Update
            </button>
            <Link to={"/"}>Create Form</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateForm;
