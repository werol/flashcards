import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {createFlashcards} from "../../../reducers/flashcardsCreation";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


const renderFlashcard = ({ fields, meta: { error, submitFailed } }) => (
  <div>
    {fields.map((flashcard, index) => (
      <div key={index} className="flashcardRow">
        <Field
          name={`${flashcard}.frontSide`}
          type="text"
          component={renderField}
          label="front side"
        />
        <Field
          name={`${flashcard}.backSide`}
          type="text"
          component={renderField}
          label="back side"
        />
        <button type="button" onClick={() => fields.remove(index)} >
          <span className="glyphicon glyphicon-trash"/>
        </button>
      </div>
    ))}
    <div className="add-btn">
      <button type="button" onClick={() => fields.push({})} >
        <span className="glyphicon glyphicon-plus"/>
      </button>
      {submitFailed && error && <span>{error}</span>}
    </div>
  </div>
);

const FlashcardSetForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <div className="flashcard-form-page">
      <div className="flashcard-form-container">
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            component={renderField}
            label="flashcard set name"
          />
          <FieldArray name="flashcards" component={renderFlashcard} />
          <div className="save-btn">
            <button type="submit" disabled={submitting} >
              <span className="glyphicon glyphicon-floppy-disk"/> Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

const submit = (values, dispatch) => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  return dispatch(createFlashcards(values));

};

export default reduxForm({
  form: 'flashcardSet',
  onSubmit: submit
})(FlashcardSetForm);

