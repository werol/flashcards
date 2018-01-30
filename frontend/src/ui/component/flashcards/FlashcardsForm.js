import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import {getStrategy} from "../../handlingIndexedDB/getStrategy";
import {HandlingIndexedDBStrategy} from "../../handlingIndexedDB/HandlingIndexedDBStrategy";
import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error }, errorClassName }) => (
  <div>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <div className={errorClassName}>{error}</div>}
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
          errorClassName="input-error front-back-error"
        />
        <Field
          name={`${flashcard}.backSide`}
          type="text"
          component={renderField}
          label="back side"
          errorClassName="input-error front-back-error"
        />
        <button type="button" onClick={() => {
          if (fields.length > 1)
            fields.remove(index)
        }}
        >
          <span className="glyphicon glyphicon-trash"/>
        </button>
      </div>
    ))}
    <div className="add-btn">
      <button type="button" onClick={() => fields.push({})} >
        <span className="glyphicon glyphicon-plus"/>
      </button>
    </div>
  </div>
);

let FlashcardsForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <div className="flashcard-form-page">
      <div className="flashcard-form-container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Field
            name="name"
            type="text"
            component={renderField}
            label="flashcard set name"
            errorClassName="input-error name-error"
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
  return handleSavingFlashcards(values, dispatch);

};

const handleSavingFlashcards = (values, dispatch) => {
  const handlingIndexedDBStrategy = new HandlingIndexedDBStrategy(dispatch);
  handlingIndexedDBStrategy.setStrategy(getStrategy());
  handlingIndexedDBStrategy.saveFlashcards(values);
};

FlashcardsForm = reduxForm({
  form: 'flashcardSet',
  onSubmit: submit,
  validate
})(FlashcardsForm);

FlashcardsForm = connect(
  state => ({
    initialValues: state.flashcards.mode === "UPDATE" ?
      {
        owner: state.authentication.username,
        name: state.flashcards.currentItems.name,
        flashcards: state.flashcards.currentItems.flashcards,
        setId: state.flashcards.currentItems.setId,
        version: state.flashcards.currentItems.version,
        lastModified: state.flashcards.currentItems.lastModified
      } :
      {
        owner: state.authentication.username,
        name: "",
        flashcards: [{}]
      }

})
)(FlashcardsForm);

export default FlashcardsForm;
