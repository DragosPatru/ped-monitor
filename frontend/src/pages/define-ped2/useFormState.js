import { useState } from 'react';

const useFormState = (initialValues) => {
  const [formState, setFormState] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isValid = value.trim() !== ''; // Basic validation, customize as needed
    setFormState(formState => ({
      ...formState,
      [name]: { value, isValid },
    }));
  };

  const isFormValid = () => {
    return Object.values(formState).every(input => input.isValid);
  };

  return { formState, handleInputChange, isFormValid };
};

export default useFormState;