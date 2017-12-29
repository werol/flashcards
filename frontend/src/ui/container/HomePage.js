import Home from '../component/Home';
import {connect} from 'react-redux';
import {fetchFlashcards, fetchCurrentFlashcards} from '../../reducers/flashcards';
import {deleteFlashcards} from "../../reducers/flashcardsDelete";

export default connect(
  state => ({items: state.flashcards.items}),
  {
    fetchFlashcards,
    fetchCurrentFlashcards,
    deleteFlashcards
  }
)(Home);
