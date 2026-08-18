# Card Game Development and Playtesting Platform

>*Project Status: The card editor, deck builder, and playtesting environment are currently functional. User authentication and persistent accounts are under development.*

A web application designed to assist with the creation and playtesting of a card game. The platform centralizes card creation, deck building, and online playtesting, allowing developers and playtesters to collaborate remotely. The shared card database connects directly to the deck builder and play environment, allowing changes to cards and decks to be tested quickly.

## Features

This project consists of three components:
* A card editor and gallery
* A deckbuilder
* A simulated play environment

### Card Editor & Gallery

The card editor and gallery has endpoints for creation, retrieval, updating and deletion (CRUD) of cards and sets.

### Deck Builder
The deckbuilder allows the creation of new decks, and the ability to add and remove copies of cards existing within the database. There is no restriction on what can be added to a deck, and it is up to players to create a legal deck with whatever ruleset they play by.

### Play Environment

The play environment consists of server-hosted games with no rules automation. Players are given mostly unrestricted freedom to move cards to whichever zone they want, to draw cards whenever they want, etc. It is up to the players to communicate what they wish to do and to keep track of turns, action priority, etc.

## **Stack Overview**

The backend is written in Python, using FastAPI and SQLAlchemy, with PostgreSQL for the database. The play environment also uses websockets for real time updates of the game state.

The frontend was designed with Next.js, using Tailwind CSS for styling.

## **Running Locally**

In order to run locally, you will need a postgres database set up, and a .env file with the following line:

```DATABASE_URL=postgresql+psycopg://user:password@localhost/database```

This .env file should be placed inside the backend folder.

You will also need to have alembic installed. From the backend folder, run 

```alembic upgrade head```

to create the initial database tables.

---

Next, from the backend folder, with uvicorn installed, run the following command: 

```uvicorn app.main:app --reload```

or

```python -m uvicorn app.main:app --reload```

To confirm the backend is working, you might want to open http://localhost:8000/docs and see if the endpoints are available from the docs page.

---

From the frontend folder, run

```npm install```

```npm run dev```

You should now be able to open the frontend at http://localhost:3000. 

## **Future Improvements/ Reflections**

* The current prototype randomly assigning user ID's for the game lobbies. An authentication system with persistent user accounts is planned and currently in development. In addition, the current frontend is not fully implemented or stylized. These changes are my top priority in this project.

* The way the game state is constructed in the backend and broadcasted through the play environment endpoints ended up being rather inconvenient, as several helper functions were needed in both the back and frontend to resolve the context of each card in order to make functional changes. Potentially at some point, a refactor of the game state structure or implementation of a fast lookup function could simplify this.

* There is currently no toggle for any sorting methods in the get endpoints for cards, and only filtering by sets. Adding more sorting/ filtering methods in future is a potential improvement.

* The ordering of cards in decklists is also not organized, and is simply the order in which they were added to the deck. Adding a standardized ordering (and also optional orderings) would make deck building and editing much easier.

* Decks are not currently tied to any user, as persistent user ID's are not yet implemented. I am still not decided firmly, but I think that in future, decks will have an associated user ID, but remain available to anyone, to help collaboration in deckbuilding and playtesting.