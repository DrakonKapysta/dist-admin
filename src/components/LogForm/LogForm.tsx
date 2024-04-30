import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import cl from './LogForm.module.css';
import { LogFormCompose } from './LogFormRoot/LogFormRoot';
import LogService from '../../API/LogService';

interface LogFormProps {
  removeLog: any;
}

const LogForm: FC<LogFormProps> = ({ removeLog }) => {
  const [selectedDeleteVariant, setSelectedDeleteVariant] = useState('single');
  const [formData, setFormData] = useState({
    dateAndTime: '',
    endDateAndTime: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleVariantChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeleteVariant(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    removeLog(formData, selectedDeleteVariant);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="deleteVariant">Choose delete variant </label>
      <select
        className={cl.deleteSelect}
        name="deleteVariant"
        value={selectedDeleteVariant}
        onChange={handleVariantChange}
      >
        <option value="single">Single</option>
        <option value="range">Range</option>
      </select>
      <br />
      <LogFormCompose.Root>
        <LogFormCompose.Input
          name="dateAndTime"
          onChange={handleInputChange}
          value={formData.dateAndTime}
          className="primitive"
          type="text"
          placeholder={'Date Time'}
        />
        {selectedDeleteVariant == 'range' ? (
          <LogFormCompose.Input
            name="endDateAndTime"
            onChange={handleInputChange}
            value={formData.endDateAndTime}
            className="primitive"
            type="text"
            placeholder={'End-Date End-Time'}
          />
        ) : null}
      </LogFormCompose.Root>
      <button className={cl.confirmButton} type="submit">
        Confirm
      </button>
    </form>
  );
};

export default LogForm;