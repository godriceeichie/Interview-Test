// formValidation.js

export const validateName = (name) => {
    if (!name || name.trim() === "") {
      return "Name is required";
    }
    return null;
  };
  
  export const validateSector = (sector) => {
    if (!sector || sector === "") {
      return "Sector is required";
    }
    return null;
  };
  
  export const validateAgreement = (agreed) => {
    if (!agreed) {
      return "You must agree to the terms";
    }
    return null;
  };
  