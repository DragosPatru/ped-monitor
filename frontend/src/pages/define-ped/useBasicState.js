import { useState } from 'react';

const useBasicState = () => {
    const [formState, setFormState] = useState({
      name: { value: '', isValid: false },
      description: { value: '', isValid: true},
      country: {value: '', isValid: false},
      baselineYear: { value: '', isValid: false },
      targetYear: { value: '', isValid: false },
      focusDistrictSize: { value: '', isValid: false },
      buildUpAreaSize: { value: '', isValid: false },
      focusDistrictPopulation: { value: '', isValid: false },
      heatingDegreeDays: { value: '', isValid: false },
      coolingDegreeDays: { value: '', isValid: false },
      avgHouseholdIncome: {value: '', isValid: false},

      percentSelfSupplyRenewableEnergyInBaseline: { value: '', isValid: false },
      primaryEnergyFactor: { value: '2.5', isValid: true },
      
      ghgEmissionsTotalInBaseline: { value: '', isValid: false },

      ghgEmissionFactorElectricity: { value: '', isValid: false },
      ghgEmissionFactorElectricitySource: { value: '', isValid: false },
      ghgEmissionFactorForHeathColdGenerated: { value: '', isValid: false },
      ghgEmissionFactorForHeathColdGeneratedSource: { value: '', isValid: false }

    });

    // Generalized input change handler
    const handleInputChange = (e) => {
      const { name, value } = e.target;

      let isValid = true; 
      let isEmpty = value.trim() === '' ? true : false;

      if (name === 'name') {
        isValid = !isEmpty && (value.length < 250);
      }

      if (name === 'description') {
        isValid = isEmpty || (value.length < 250);
      }

      if (name === 'country') {
        if (formState.country.value === '') { // nothing selected before
          isValid = !isEmpty;
        } else {
          isValid = true;
        }
      }

      if (name === 'baselineYear' || name === 'targetYear') {
        isValid = !isNaN(value) && (Number(value)) > 2000;
        if (isValid && name === 'baselineYear') {
          if (formState.targetYear.value !== '')
          isValid = value < formState.targetYear.value;

        } else if (isValid && name === 'targetYear') {
          isValid = value > formState.baselineYear.value;
        }
      }
        
      setFormState(prevState => ({
        ...prevState,
        [name]: { value, isValid },
      }));
    };
  
    return [formState, handleInputChange];
  };
  
  export default useBasicState;