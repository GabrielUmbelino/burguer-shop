import React from 'react'
import classes from './Input.css'
const input = props => {

  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let errorMessage = "";

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    errorMessage = <p className={classes.ErrorMessage}>Please enter a valid value!</p>
  }

  switch (props.elementType) {
    case ('input'):
      inputElement =  (
        <input 
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />
      )
      break;
    case ('textarea'):
        inputElement =  (
          <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />
        )
        break;
    case ('select'):
        inputElement =  (
          <select 
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
            {
              props.elementConfig.options.map(op => (
                <option value={ op.value } key={ op.value }>
                  { op.text }
                </option>
              ))
            }
          </select>
        )
        break;
    default:
        inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}/>
  }

  return (
    <div className={classes.Input}>
      <label> {props.label} </label>
      {inputElement}
      { errorMessage}
    </div>
  );

}

export default input;