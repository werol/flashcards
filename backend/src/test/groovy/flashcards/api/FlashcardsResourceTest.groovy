package flashcards.api

import flashcards.AbstractMvcSpec
import org.springframework.http.HttpStatus
import org.springframework.security.test.context.support.WithMockUser
import spock.lang.Shared
import spock.lang.Stepwise
import spockmvc.RequestParams

@WithMockUser
class FlashcardsResourceTest extends AbstractMvcSpec {

  def "user can get all flashcard sets"() {
    when:
    def response = get('/api/flashcards')

    then:
    response.status == HttpStatus.OK

    def flashcardSets = response.getJson().flashcardSets
    flashcardSets.size == 2

    def numbersSet = flashcardSets.find { set -> set.name == 'Numbers' && set.owner == 'testUser' }
    numbersSet.flashcards.any { flashcard -> flashcard.frontSide == 'jeden' && flashcard.backSide == 'one' }
    numbersSet.flashcards.any { flashcard -> flashcard.frontSide == 'dwa' && flashcard.backSide == 'two'}
    numbersSet.flashcards.any { flashcard -> flashcard.frontSide == 'trzy' && flashcard.backSide == 'three' }

    def colorsSet = flashcardSets.find { set -> set.name == 'Colors' && set.owner == 'testUser' }
    colorsSet.flashcards.any { flashcard -> flashcard.frontSide == 'niebieski' && flashcard.backSide == 'blue' }
    colorsSet.flashcards.any { flashcard -> flashcard.frontSide == 'czerwony' && flashcard.backSide == 'red' }

  }

  def "user can get one flashcard set by id"() {
    when:
    def response = get('/api/flashcards/1')

    then:
    response.status == HttpStatus.OK

    def flashcardSet = response.getJson()
    flashcardSet.name == 'Numbers'
    flashcardSet.owner == 'testUser'

    flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'jeden' && flashcard.backSide == 'one' }
    flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'dwa' && flashcard.backSide == 'two'}
    flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'trzy' && flashcard.backSide == 'three' }

  }

  def "user can create flashcard set"() {
    given:
    def request = [
      'owner': 'testUser',
      'name': 'Animals',
      'flashcards': [
        [
          'frontSide': 'cat',
          'backSide': 'kot',
        ],
        [
          'frontSide': 'dog',
          'backSide': 'pies',
        ]
      ]
    ]

    when:
    def response = post('/api/flashcards', request)

    then:
    response.status == HttpStatus.CREATED
    def setId = response.getJson().setId

    when:
    response = get('/api/flashcards/' + setId)

    then:
    response.status == HttpStatus.OK

    def flashcardSet = response.getJson()
    flashcardSet.name == 'Animals'
    flashcardSet.owner == 'testUser'

    flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'cat' && flashcard.backSide == 'kot' }
    flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'dog' && flashcard.backSide == 'pies'}

    when:
    response = get('/api/flashcards')

    then:
    response.status == HttpStatus.OK

    def flashcardSets = response.getJson().flashcardSets
    def animalsSet = flashcardSets.find { set -> set.name == 'Animals' && set.owner == 'testUser' }

    animalsSet.flashcards.any { flashcard -> flashcard.frontSide == 'cat' && flashcard.backSide == 'kot' }
    animalsSet.flashcards.any { flashcard -> flashcard.frontSide == 'dog' && flashcard.backSide == 'pies'}

  }

  def "user can update flashcard set"() {
    given:
    def setId = 1
    def request = [
      'setId': 1,
      'owner': 'testUser',
      'name': 'Numbers',
      'version': 1,
      'flashcards': [
        [
          'frontSide': 'cztery',
          'backSide': 'four',
        ]
      ]
    ]

    when:
    def response = put('/api/flashcards', request)

    then:
    response.status == HttpStatus.OK

    when:
    response = get('/api/flashcards/' + setId)

    then:
    response.status == HttpStatus.OK
    def flashcardSet = response.getJson()
    flashcardSet.name == 'Numbers'
    flashcardSet.owner == 'testUser'

    assert flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'cztery' && flashcard.backSide == 'four'}
    assert !flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'jeden' && flashcard.backSide == 'one' }
    assert !flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'dwa' && flashcard.backSide == 'two'}
    assert !flashcardSet.flashcards.any { flashcard -> flashcard.frontSide == 'trzy' && flashcard.backSide == 'three' }

  }

  def "user can delete flashcard set by id"() {
    given:
    def setId = 1

    when:
    def response = delete('/api/flashcards/' + setId)

    then:
    response.status == HttpStatus.OK

    when:
    response = get('/api/flashcards/' + setId)

    then:
    response.status == HttpStatus.NOT_FOUND

    when:
    response = get('/api/flashcards')

    then:
    response.status == HttpStatus.OK

    def flashcardSets = response.getJson().flashcardSets
    assert !flashcardSets.any { set -> set.name == 'Numbers' && set.owner == 'testUser' }

  }

}
