export const HandlingIndexedDBStrategy = function(dispatch) {
  this.strategy = null;
  this.dispatch = dispatch;
};

HandlingIndexedDBStrategy.prototype = {

  setStrategy: function(strategy) {
    this.strategy = strategy;
  },

  getAllFlashcards: function() {
    this.strategy.getAllFlashcards(this.dispatch);
  },

  getCurrentFlashcards: function(setId) {
    this.strategy.getCurrentFlashcards(this.dispatch, setId);
  },

  deleteFlashcardSet: function(setId) {
    this.strategy.deleteFlashcardSet(this.dispatch, setId);
  },

  saveFlashcards: function(values) {
    this.strategy.saveFlashcards(this.dispatch, values);
  }

};
