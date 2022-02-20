import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        // Example: inputs:{title:{value:'', isValid,false}}
        if (!state.inputs[inputId]) {
          //if undefined (name ==> signup)
          continue;
        }
        if (inputId === action.inputId) {
          //check if the changed input is valid (from "action")
          formIsValid = formIsValid && action.isValid;
        } else {
          //check for UNCHANGED inputs's validity in inputs
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state, //copy old values in state
        inputs: {
          //but modify the "inputs" value
          ...state.inputs, //keep same inputs
          [action.inputId]: { value: action.value, isValid: action.isValid }, //but modify the changed input from "action"
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

//called every re-render of the component
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData]; //[state, dispatch] equivalent
};
