CREATE DATABASE IF NOT EXISTS fleshcards;

USE fleshcards;


DROP TABLE IF EXISTS fleshcards;
DROP TABLE IF EXISTS fleshcard_sets;
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


CREATE TABLE fleshcard_sets (
  set_id        INTEGER(30)     NOT NULL AUTO_INCREMENT,
  owner         VARCHAR(30)     NOT NULL,
  name          VARCHAR(100)    NOT NULL,
  PRIMARY KEY (set_id),
  FOREIGN KEY(owner) REFERENCES users(username)
);


CREATE TABLE fleshcards (
  fleshcard_id  INTEGER(30)     NOT NULL AUTO_INCREMENT,
  set_id        INTEGER(30)     NOT NULL,
  front_side    VARCHAR(300)    NOT NULL,
  back_side     VARCHAR(300)    NOT NULL,
  PRIMARY KEY (fleshcard_id),
  FOREIGN KEY(set_id) REFERENCES fleshcard_sets(set_id)
);
