import { useState } from 'react';

const useBasicState = () => {
    const [formState, setFormState] = useState({
      name: { value: '', isValid: false },
      description: { value: '', isValid: true},
      baselineYear: { value: '', isValid: false },
      targetYear: { value: '', isValid: false },
      totalAreaSize: { value: '', isValid: false },
      buildUpAreaSize: { value: '', isValid: false },
      numberOfCitizens: { value: '', isValid: false },
      heatingDegreeDays: { value: '', isValid: false },
      coolingDegreeDays: { value: '', isValid: false },
      percentRenewableEnergyInBaseline: { value: '', isValid: false },
      primaryEnergyFactor: { value: '', isValid: false },
      ghgEmissionsTotalInBaseline: { value: '', isValid: false },
      ghgEmissionFactorElectricity: { value: '', isValid: false },
      ghgEmissionFactorElectricitySourceCode: { value: '', isValid: false },
      ghgEmissionFactorForHeathColdGenerated: { value: '', isValid: false },
      ghgEmissionFactorForHeathColdGeneratedSourceCode: { value: '', isValid: false }

    });

    // Generalized input change handler
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      let isValid = true; 

      let isEmpty = value.trim() === '' ? true : false;

      if (name === 'name') {
        isValid = !isEmpty;
      }

      if (name === 'baselineYear' || name === 'targetYear') {
        isValid = !isNaN(value) && (new Number(value)) > 2000;
      }
        
      
      setFormState(prevState => ({
        ...prevState,
        [name]: { value, isValid },
      }));
    };
  
    return [formState, handleInputChange];
  };
  
  export default useBasicState;