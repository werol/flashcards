import Home from '../component/Home';
import {connect} from 'react-redux';
import {
  fetchFlashcards, fetchCurrentFlashcards, setFlashcards, setCurrentFlashcards,
  startGettingFlashcards, startGettingCurrentFlashcards
} from '../../reducers/flashcards';
import {deleteFlashcards, deleteFlashcardsFromIndexedDBSuccess} from "../../reducers/flashcardsDelete";

export default connect(
  state => ({items: state.flashcards.items}),
  dispatch => ({
    dispatch: dispatch,
    fetchFlashcards,
    startGettingFlashcards,
    setFlashcards,
    fetchCurrentFlashcards,
    startGettingCurrentFlashcards,
    setCurrentFlashcards,
    deleteFlashcards,
    deleteFlashcardsFromIndexedDBSuccess
  })
)(Home);
