import FlashcardShow from '../component/flashcards/FlashcardShow';
import {connect} from 'react-redux';
import {fetchCurrentFlashcards, setCurrentFlashcards, startGettingCurrentFlashcards} from '../../reducers/flashcards';

export default connect(
  state => (
    {
      set: state.flashcards.currentItems,
      loading: state.flashcards.loading
    }),
  {
    fetchCurrentFlashcards,
    startGettingCurrentFlashcards,
    setCurrentFlashcards
  }
)(FlashcardShow);
