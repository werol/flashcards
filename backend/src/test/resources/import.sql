USE flashcardsTest;

INSERT INTO users (username, password, email, first_name, last_name, role) VALUES ('testUser', '$2a$10$loJ0DHEVNf8WexRDT.Kr8.deOZWIfhlUarCyp1OiqeFEfkhNoIwT.', 'testUser@test.com', 'Test', 'Test', 'USER');

INSERT INTO flashcard_sets (set_id, version, owner, name, last_modified) VALUES (1, 1, 'testUser', 'Numbers', '2018-01-23 21:40:38');
INSERT INTO flashcards (flashcard_id, set_id, front_side, back_side) VALUES (1, 1, 'jeden', 'one');
INSERT INTO flashcards (flashcard_id, set_id, front_side, back_side) VALUES (2, 1, 'dwa', 'two');
INSERT INTO flashcards (flashcard_id, set_id, front_side, back_side) VALUES (3, 1, 'trzy', 'three');

INSERT INTO flashcard_sets (set_id, version, owner, name, last_modified) VALUES (2, 1, 'testUser', 'Colors', '2018-01-23 22:58:09');
INSERT INTO flashcards (flashcard_id, set_id, front_side, back_side) VALUES (4, 2, 'niebieski', 'blue');
INSERT INTO flashcards (flashcard_id, set_id, front_side, back_side) VALUES (5, 2, 'czerwony', 'red');
