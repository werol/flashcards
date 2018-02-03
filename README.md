
# Flashcards

Aplikacja służąca do tworzenia własnych zestawów fiszek.

## Informacje ogólne

Głównym założeniem projektu jest synchronizacja bazy lokalnej IndexedDB (która umożliwa użytkownikom korzystanie z aplikacji, gdy są offline) z bazą zdalną. Dokładne działanie aplikacji jest opisane w dalszej części.

Podfolder `backend` zawiera kod napisany w Javie, natomiast w podfolderze `frontend` znajduje się kod w JavaScript (w projekcie wykorzystano bibliotekę React oraz Redux do zarządzania
stanem aplikacji i akcjami).

Pracując nad projektem, aby przyspieszyć pracę, zastosowano `hot reloading` - gdy aplikacja uruchamiana jest na serwerze developerskim, zmiany w plikach frontendowych
oraz w stylach przeładowywują się autoamtycznie bez odświeżania przeglądarki.


## Uruchamianie aplikacji w trybie developerskim (hot reloading)

#### Wymagania
* node 6.0+
* yarn (by możliwe było uruchomienie webpack dev server)
* stworzenie bazy danych MySQL (skrypt w głównym folderze projektu) oraz konfiguracja w pliku `backend/src/main/resources/application.properties`

Uruchomienie metody głównej w klasie FlashcardsManagerApplication spowoduje, że aplikacja będzie dostępna pod adresem:
 
``
http://localhost:3000/
`` 

## Uruchomianie aplikacji w trybie produkcyjnym

Aby uruchomić aplikację w trybie produkcyjnym należy wygenerować plik jar:

``
$ ./gradlew assemble
``

Plik wygeneruje się do folderu `backend/build/libs`, następnie należy go uruchomić komendą:

``
$ java -jar flashcards-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
``

Aplikacja zostanie uruchomiona pod adresem:

``
http://localhost:8080/
`` 

## Uruchomianie aplikacji w trybie produkcyjnym

Aby uruchomić aplikację w trybie produkcyjnym należy wygenerować plik jar:

``
$ ./gradlew assemble
``

Plik wygeneruje się do folderu `backend/build/libs`, następnie należy go uruchomić komendą:

``
$ java -jar flashcards-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
``

Aplikacja zostanie uruchomiona pod adresem:

``
http://localhost:8080/
`` 

## Dokumentacja

### Spis treści
+ [Dokumentacja API](#docAPI)
  + [Użytkownik](#user)
    + [Rejestracja użytkownika](#register)
    + [Logowanie](#login)
    + [Informacje o sesji](#session)
    + [Wylogowywanie](#logout)
    + [Lista wszystkich użytkowników](#users)
  + [Zestawy fiszek](#flashcardSets)
    + [Tworzenie zestawu](#create)
    + [Edycja zestawu](#update)
    + [Usuwanie zestawu](#delete)
    + [Zestaw](#set)
    + [Lista wszystkich zestawów](#sets)
    + [Synchronizacja](#synchronize)
+ [Zrzuty ekranu](#screenshots)
+ [Wykorzystane wzorce](#patterns)
  + [Optimistic Offline Lock](#optimistic)
  + [Wzorzec modułu](#module)
  + [Strategia](#strategy)
  + [Builder](#builder)
  
<a name="docAPI"/>

## Dokumentacja API  
  
<a name="user"/>

### Użytkownik

<a name="register"/>

#### Rejestracja użytkownika

*URL:*  `/api/register`

 *Metoda:* `POST`

*Przykład:*
```javascript
axios.post('/api/register', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    username: 'Fred41'
    email: 'fredflintstone@yahoo.com'
    password: 'IloveWilma123'
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "username": "Fred41",
    "firstName": "Fred",
    "lastName": "Flintstone",
    "email": "fredflintstone@yahoo.com",
    "role": "USER"
}
```
*Zwracane błędy:*

Warunek: Przesyłane dane nie spełniają kryteriów (np. hasło ma mniej niż 8 znaków, nie zawiera dużej litery i cyfry), lub obiekt JSON nie zawiera wszystkich wymaganych pól

Kod odpowiedzi HTTP: `400 Bad Request`

```javascript
{
    "messageKey": "userData.error.badRequest"
}
```
Warunek: Przesyłany username już istnieje

Kod odpowiedzi HTTP: `400 Bad Request`
```javascript
{
    "messageKey": "register.error.usernameExists"
}
```
Warunek: Przesyłany email już istnieje

Kod odpowiedzi HTTP: `400 Bad Request`
```javascript
{
    "messageKey": "register.error.emailExists"
}
```

<a name="login"/>

#### Logowanie

*URL:*  `/api/session`

 *Metoda:* `POST`

*Przykład:*
```javascript
axios.post('/api/login', {
    username: 'Fred41'
    password: 'IloveWilma123'
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "username": "Fred41",
    "token": "6D55B805C77A21230EA9269091FFBE75",
    "authenticated": true
}
```
*Zwracane błędy:*

Warunek: Niepoprawny login lub hasło

Kod odpowiedzi HTTP: `400 Bad Request`

```javascript
{
    "messageKey": "login.error.badLogin"
}
```
<a name="session"/>

#### Informacje o sesji

*URL:*  `/api/session`

 *Metoda:* `GET`

*Przykład:*
```javascript
axios.get('/api/session')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "username": "Fred41",
    "token": "6D55B805C77A21230EA9269091FFBE75",
    "authenticated": true
}
```
<a name="logout"/>

#### Wylogowywanie

*URL:*  `/api/logout`

 *Metoda:* `DELETE`

*Przykład:*
```javascript
axios.delete('/api/logout')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```

<a name="users"/>

#### Lista wszystkich użytkowników

*URL:*  `/api/users`

 *Metoda:* `GET`

*Przykład:*
```javascript
axios.get('/api/users')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```

*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
[
    {
        "username": "Fred41",
        "firstName": "Fred",
        "lastName": "Flintstone",
        "email": "fredflintstone@yahoo.com",
        "role": "USER"
    },
    {
        "username": "Wilma",
        "firstName": "Wilma",
        "lastName": "Flintstone",
        "email": "wilmaflintstone@yahoo.com",
        "role": "USER"
    }
]
```
<a name="flashcardSets"/>

### Zestawy fiszek

<a name="create"/>

#### Tworzenie zestawu

*URL:*  `/api/flashcards`

 *Metoda:* `POST`

*Przykład:*
```javascript
axios.post('/api/flashcards', {
    owner: 'Fred41',
    name: 'Animals',
    flashcards: [
      {
        frontSide: 'cat',
        backSide: 'kot',
      }, 
      {
        frontSide: 'dog',
        backSide: 'pies',
      }
    ]
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "setId": 2,
    "version": 0,
    "owner": "Fred41",
    "name": "Animals",
    "lastModified": 1517603827715,
    "flashcards": [
        {
            "flashcardId": 13,
            "frontSide": "cat",
            "backSide": "kot"
        },
        {
            "flashcardId": 14,
            "frontSide": "dog",
            "backSide": "pies"
        }
    ]
}
```
*Zwracane błędy:*

Warunek: Obiekt JSON nie zawiera wszystkich wymaganych pól

Kod odpowiedzi HTTP: `400 Bad Request`

```javascript
{
    "messageKey": "flashcards.error.badRequest"
}
```

<a name="update"/>

#### Edycja zestawu

*URL:*  `/api/flashcards`

 *Metoda:* `PUT`

*Przykład:*
```javascript
axios.put('/api/flashcards', {
    setId: 2,
    version: 0,
    owner: 'Fred41',
    name: 'Animals',
    flashcards: [ 
      {
        frontSide: 'fish',
        backSide: 'ryba',
      }
    ]
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "setId": 2,
    "version": 1,
    "owner": "Fred41",
    "name": "Animals",
    "lastModified": 1517604771815,
    "flashcards": [
        {
            "flashcardId": 15,
            "frontSide": "fish",
            "backSide": "ryba"
        }
    ]
}
```
*Zwracane błędy:*

Warunek: Obiekt JSON nie zawiera wszystkich wymaganych pól

Kod odpowiedzi HTTP: `400 Bad Request`

```javascript
{
    "messageKey": "flashcards.error.badRequest"
}
```
<a name="delete"/>

#### Usuwanie zestawu

*URL:*  `/api/flashcards/{setId}`

 *Metoda:* `DELETE`

*Przykład:*
```javascript
axios.delete('/api/flashcards/2')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`

*Zwracane błędy:*

Warunek: Set o podanym id nie istnieje

Kod odpowiedzi HTTP: `404 Not Found`

<a name="set"/>

#### Zestaw

*URL:*  `/api/flashcards/{setId}`

 *Metoda:* `GET`

*Przykład:*
```javascript
axios.get('/api/flashcards/2')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```

*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`

```javascript
{
    "setId": 2,
    "version": 1,
    "owner": "Fred41",
    "name": "Animals",
    "lastModified": 1517604771815,
    "flashcards": [
        {
            "flashcardId": 15,
            "frontSide": "fish",
            "backSide": "ryba"
        }
    ]
}
```

*Zwracane błędy:*

Warunek: Set o podanym id nie istnieje

Kod odpowiedzi HTTP: `404 Not Found`

<a name="sets"/>

#### Lista wszystkich zestawów

*URL:*  `/api/flashcards`

*Metoda:* `GET`

*Przykład:*
```javascript
axios.get('/api/flashcards')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "flashcardSets": [
        {
            "setId": 2,
            "version": 1,
            "owner": "Fred41",
            "name": "Animals",             
            "lastModified": 1517604771815,
            "flashcards": [
                {
                    "flashcardId": 15,
                    "frontSide": "fish",
                    "backSide": "ryba"
                }
            ]
        },
        {
            "setId": 3,
            "version": 1,
            "owner": "Fred41",
            "name": "Numbers",
            "lastModified": 1517431161000,
            "flashcards": [
                {
                    "flashcardId": 5,
                    "frontSide": "one",
                    "backSide": "jeden"
                }
            ]
        }
    ],
    "version": 1517602995656
}
```
<a name="synchronize"/>

#### Synchronizacja

*URL:*  `/api/synchronize`

*Metoda:* `POST`

*Przykład:*
```javascript
axios.post('/api/synchronize', {
    version: 1517431172887,	
    flashcardSets: [{
      setId: 1,
      version: 1,
      name: 'Animals',
      flashcards: [{
        frontSide: 'cat',
        backSide: 'kot'
      }]
    }, {
      name: 'Numbers',
      flashcards: [{
        frontSide: 'one',
        backSide: 'jeden'
      }, {
        frontSide: 'two',
        backSide: 'dwa'
      }]
    }]
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
*Odpowiedź:*

Kod odpowiedzi HTTP: `200 OK`
```javascript
{
    "flashcardSets": [
        {
            "setId": 2,
            "version": 2,
            "owner": "Fred41",
            "name": "Animals",             
            "lastModified": 1517604771815,
            "flashcards": [
                {
                    "flashcardId": 15,
                    "frontSide": "fish",
                    "backSide": "ryba"
                }
            ]
        }
    ],
    "version": 1517602995656
}
```
<a name="screenshots"/>

## Zrzuty ekranu 

![alt text](https://image.ibb.co/ga6hjR/1.png)
![alt text](https://image.ibb.co/kq8gB6/10.png)
![alt text](https://image.ibb.co/dLYgB6/11.png)
![alt text](https://image.ibb.co/hggtr6/2.png)
![alt text](https://image.ibb.co/jv14ym/3.png)
![alt text](https://image.ibb.co/cTWF4R/4.png)
![alt text](https://image.ibb.co/h2kmB6/5.png)
![alt text](https://image.ibb.co/iPO6B6/6.png)
![alt text](https://image.ibb.co/mEDv4R/7.png)
![alt text](https://image.ibb.co/mRszW6/8.png)
![alt text](https://image.ibb.co/d8Btr6/9.png)

<a name="patterns"/>

## Wykorzystane wzorce

<a name="optimistic"/>

### Optimistic Offline Lock

Ten wzorzec pozwala na zachowanie spójności edytowanych danych, informując użytkownika na końcu procesu edycji, że edycja jest niemożliwa z powodu zmiany, jaka zaszła w trakcie jego próby edycji.
Blokada optymistyczna dopuszcza wielu użytkowników do operowania na wspólnych danych. W przypadku, gdy jeden z użytkowników chce dokonać aktualizacji danych, sprawdzane jest, czy dysponuje on aktualną wersją rekordu, który jest w bazie. W przypadku, gdy jego wersja jest starsza, wprowadzone zmiany są
wycofywane. 
W implementacji blokady optymistycznej został wykorzystany numer wersji, który inkrementuje się po każdej aktualizacji rekordu.

#### Implementacja

`backend/src/main/java/flashcards/model/FlashcardSet.java`
```java
@Entity
@Table(name="flashcard_sets")
public class FlashcardSet implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO )
  private Long setId;

  @Version
  private Long version;

  // ...
```

`backend/src/main/java/flashcards/service/FlashcardSetServiceImpl.java`

```java
flashcardSets.getFlashcardSets().forEach(set -> {
  try {
    // aktualizacja rekordu w bazie
    flashcardSetRepository.save(set);
  } catch (ObjectOptimisticLockingFailureException e) {
    // obsługa wyjątku, gdy wersje nie są zgodne
  }
});
```

<a name="module"/>

### Wzorzec modułu

Wzorzec zastosowany do organizacji kodu służącego do obsługi IndexedDB. Obiekt przechowuje wewnątrz pewne zmienne jako prywatne (nazwa bazy, wersja), natomiast kod zwracany jest traktowany jako publiczny (funkcje służące np. do wstawiania, pobierania rekordu). Pozwala
to na ukrycie części implementacji i dostęp do metod spoza samego obiektu.

#### Implementacja

`frontend/src/indexedDB/dbHandler.js`

```javascript
const INDEXED_DB_HANDLER_MODULE = (function () {

  const dbName = 'datebase';
  const version = 1;

  return {
    initDb: function (objectStoreName, key){
      // implementacja
    },
    addData: function (objectStoreName, data) {
      // impementacja
    },
    getData: function (objectStoreName, key) {
      // implementacja
    }
  };
})();
```

<a name="strategy"/>

### Strategia

Wzorzec ten został użyty do wymiennego stosowania implementacji obsługi IndexedDB w zależności czy użytkownik jest offline czy online.

#### Implementacja

`frontend/src/ui/handlingIndexedDB/HandlingIndexedDBStrategy.js`

```javascript
const HandlingIndexedDBStrategy = function(dispatch) {
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

```

`frontend/src/ui/handlingIndexedDB/OnlineStrategy.js`

```javascript
const OnlineStrategy = function () {

  this.getAllFlashcards = function(dispatch) {
    // implementacja
  };

  this.getCurrentFlashcards = function(dispatch, setId) {
    // implementacja
  };

  this.deleteFlashcardSet = function(dispatch, setId) {
    // implementacja
  };

  this.saveFlashcards = function(dispatch, values) {
    // implementacja
  }
};
```

`frontend/src/ui/handlingIndexedDB/OfflineStrategy.js`

```javascript
const OfflineStrategy = function () {

  this.getAllFlashcards = function(dispatch) {
    // implementacja
  };

  this.getCurrentFlashcards = function(dispatch, setId) {
    // implementacja
  };

  this.deleteFlashcardSet = function(dispatch, setId) {
    // implementacja
  };

  this.saveFlashcards = function(dispatch, values) {
    // implementacja
  }
};
```

<a name="builder"/>

### Builder

Wzorzec został zastosowany do budowania obiektów pól formularza.

#### Implementacja

`frontend/src/ui/component/forms/FormFieldBuilder.js`

```javascript
class FormFieldBuilder {

  withName(name) {
    this.name = name;
    return this;
  }

  withPlaceholder(placeholder) {
    this.placeholder = placeholder;
    return this;
  }

  withType(type) {
    this.type = type;
    return this;
  }

  withPattern(pattern) {
    this.pattern = pattern;
    return this;
  }

  build() {
    return Object.assign({}, {
      name: this.name,
      placeholder: this.placeholder,
      type: this.type,
      pattern: this.pattern
    })
  }
}
```
