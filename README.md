
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

## Dokumentacja API

### Spis treści
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

<a name="update"/>

#### Edycja zestawu

*URL:*  `/api/flashcards`

 *Metoda:* `PUT`

*Przykład:*
```javascript
axios.put('/api/flashcards', {
    setId: 2,
    version: 3,
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

<a name="delete"/>

#### Usuwanie zestawu

*URL:*  `/api/flashcards/{setId}`

 *Metoda:* `DELETE`

*Przykład:*
```javascript
axios.delete('/api/flashcards/1')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
<a name="set"/>

#### Zestaw

*URL:*  `/api/flashcards/{setId}`

 *Metoda:* `GET`

*Przykład:*
```javascript
axios.get('/api/flashcards/1')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });  
```
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
	    version: 2,
	    name: 'Animals',
	    flashcards: [{
	      frontSide: 'cat',
	      backSide: 'kot'
	    }, {
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
            "setId": 1,
            "version": 5,
            "owner": "Fred42",
            "name": "Animals",
            "lastModified": 1517431173000,
            "flashcards": [
                {
                    "flashcardId": 2,
                    "frontSide": "cat",
                    "backSide": "kot"
                },
                {
                    "flashcardId": 3,
                    "frontSide": "dog",
                    "backSide": "pies"
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
    "version": 1517434077774
}
```
