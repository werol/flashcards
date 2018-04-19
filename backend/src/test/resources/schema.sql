DROP SCHEMA IF EXISTS flashcardsTest;
CREATE DATABASE IF NOT EXISTS flashcardsTest;
USE flashcardsTest;


DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS flashcard_sets;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  username      VARCHAR(30)     NOT NULL,
  password      VARCHAR(60)     NOT NULL,
  email         VARCHAR(50)     NOT NULL,
  first_name    VARCHAR(30)     NOT NULL,
  last_name     VARCHAR(30)     NOT NULL,
  role          VARCHAR(30)     NOT NULL,
  PRIMARY KEY (username)
);


CREATE TABLE flashcard_sets (
  set_id        INTEGER(30)     NOT NULL AUTO_INCREMENT,
  version       INTEGER(30)     NOT NULL,
  owner         VARCHAR(30)     NOT NULL,
  name          VARCHAR(100)    NOT NULL,
  last_modified TIMESTAMP       NOT NULL,
  PRIMARY KEY (set_id),
  FOREIGN KEY(owner) REFERENCES users(username)
);


CREATE TABLE flashcards (
  flashcard_id  INTEGER(30)     NOT NULL AUTO_INCREMENT,
  set_id        INTEGER(30)     NOT NULL,
  front_side    VARCHAR(300)    NOT NULL,
  back_side     VARCHAR(300)    NOT NULL,
  PRIMARY KEY (flashcard_id),
  FOREIGN KEY(set_id) REFERENCES flashcard_sets(set_id)
);
