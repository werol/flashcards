import FlashcardShow from '../component/flashcards/FlashcardShow';
import {connect} from 'react-redux';
import {fetchCurrentFlashcards} from '../../reducers/flashcards';

export default connect(
  state => (
    {
      set: state.flashcards.currentItems,
      loading: state.flashcards.loading
    }),
  {fetchCurrentFlashcards}
)(FlashcardShow);
