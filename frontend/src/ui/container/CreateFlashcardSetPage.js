import FlashcardSetForm from '../component/flashcards_form/FlashcardSetForm';
import {connect} from 'react-redux';

export default connect(
  state => ({
    initialValues: {
      owner: state.authentication.username,
      name: "",
      flashcards: [{}]
    }
  })
)(FlashcardSetForm);
