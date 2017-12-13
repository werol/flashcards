import FleshcardSets from '../component/FlashcardSets';
import {connect} from 'react-redux';
import {fetchFlashcards} from '../../reducers/flashcards';

export default connect(
  state => ({items: state.flashcards.items}),
  {fetchFlashcards}
)(FleshcardSets);
