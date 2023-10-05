import React from 'react';
import Select from 'react-select';

const Input = ({
  name,
  value,
  onChange,  
  label,
  error,
  required = true,
  select,  
  classes,
  placeholder,
}) => {
  return (
    <div className={required && [classes.required]}>
      <label className={classes.label}>{label}</label>

      {select ? (
        <div>
          <div className={classes.wrap}>
            <Select
              name={name}
              value={ value ? { value, label: value } : select.find(item => item === value) }
              onChange={selectedOption => onChange(name, selectedOption.value, required=false)}
              options={select.map(item => ({ value: item, label: item }))}
              className={classes.select}   
            />
          </div>
        </div>
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={classes.input}
        />
      )}
      {error && (
        <div className={`alert alert-danger m-0${classes.error}`}>{error}</div>
      )}
    </div>
  );
};

export default Input;
