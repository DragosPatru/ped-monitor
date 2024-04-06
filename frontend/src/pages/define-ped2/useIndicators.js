import { useState } from 'react';

const useIndicators = () => {
  const [indicators, setIndicators] = useState([]);

  const addIndicator = () => {
    setIndicators(indicators => [...indicators, { name: '', type: '', unit: '', targetValue: '', isValid: false }]);
  };

  const updateIndicator = (index, field, value) => {
    setIndicators(indicators => indicators.map((indicator, i) => {
      if (i === index) {
        return { ...indicator, [field]: value, isValid: value.trim() !== '' };
      }
      return indicator;
    }));
  };

  const removeIndicator = (index) => {
    setIndicators(indicators => indicators.filter((_, i) => i !== index));
  };

  const areIndicatorsValid = () => indicators.every(indicator => indicator.isValid);

  return { indicators, addIndicator, updateIndicator, removeIndicator, areIndicatorsValid };
};

export default useIndicators;