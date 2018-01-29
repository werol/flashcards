import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import {saveFlashcards, saveFlashcardsToIndexedDBSuccess} from "../../../reducers/flashcardsSave";
import {addData, getAllKeys, putData} from "../../../indexedDB/dbHandler";
import { browserHistory } from 'react-router';
import {INDEXED_DB_OBJECT_STORE_NAME, OFFLINE, ONLINE} from "../../constants/constants";
import {getStrategy} from "../../utils";


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
  return handleSavingFlashcards(getStrategy(), values, dispatch);

};

const handleSavingFlashcards = (strategy, values, dispatch) => {
  const saveFlashcardsActions = {
    [OFFLINE] : () => {
      values.setId ?
        putData(INDEXED_DB_OBJECT_STORE_NAME, values)
          .then(browserHistory.push('/'))
      : getAllKeys(INDEXED_DB_OBJECT_STORE_NAME).then(result => {
          addData(INDEXED_DB_OBJECT_STORE_NAME, {...values, setId: parseFloat(`${parseInt(result[result.length - 1] + 1)}.1`)});
          dispatch(saveFlashcardsToIndexedDBSuccess());
          browserHistory.push('/');
        });
    },
    [ONLINE] : () => dispatch(saveFlashcards(values))
  };
  return saveFlashcardsActions[strategy]();
};

FlashcardsForm = reduxForm({
  form: 'flashcardSet',
  onSubmit: submit
})(FlashcardsForm);

FlashcardsForm = connect(
  state => ({
    initialValues: state.flashcards.mode === "UPDATE" ?
      {
        owner: state.authentication.username,
        name: state.flashcards.currentItems.name,
        flashcards: state.flashcards.currentItems.flashcards,
        setId: state.flashcards.currentItems.setId,
        version: state.flashcards.currentItems.version
      } :
      {
        owner: state.authentication.username,
        name: "",
        flashcards: [{}]
      }

})
)(FlashcardsForm);

export default FlashcardsForm;
