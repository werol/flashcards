const validate = values => {
  const errors = {};
  if(!values.name) {
    errors.name = 'Flashcard set name is required!'
  }
  if (values.flashcards && values.flashcards.length) {
    const flashcardsArrayErrors = [];
    values.flashcards.forEach((flashcard, index) => {
      const flashcardsErrors = {};
      if (!flashcard || !flashcard.frontSide) {
        flashcardsErrors.frontSide = 'Required';
        flashcardsArrayErrors[index] = flashcardsErrors;
      }
      if (!flashcard || !flashcard.backSide) {
        flashcardsErrors.backSide = 'Required';
        flashcardsArrayErrors[index] = flashcardsErrors;
      }
      return flashcardsErrors
    });
    if(flashcardsArrayErrors.length) {
      errors.flashcards = flashcardsArrayErrors;
    }
  }
  return errors
};

export default validate;
