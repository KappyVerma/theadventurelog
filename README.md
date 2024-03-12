# ✈️ The Adventure Log

## Overview

The Adventure Log is a web application that enables users to create, share, and rate their travel experiences. Users can manage their destination cards, create to-dos, upload images, and rate various places.

### Problem

Keeping track of our travel experiences has always been a challenge for my wife and me. We've been to many places and had both wonderful and challenging moments, but often forget to write those moments down or rate them.

Just like many others, we've faced the common issue of forgetting important details during our travels. As travelers who enjoy sharing our experiences but don't want the hassle of posting on social media, we see the need for a platform designed for laid-back explorers. We're looking for an app that can help organize our travel memories effortlessly and allows us to share these experiences without the overwhelming nature of mainstream social platforms.

Enter The Adventure Log — our solution to this dilemma. It's a dedicated space for travelers like us to easily curate, celebrate, and connect over our adventures. It's the perfect platform for those who love exploring but prefer simplicity, ensuring that the valuable lessons we've learned during our journeys contribute to a shared knowledge pool, benefiting fellow travelers without the usual fuss.

### User Profile

- **Primary Users**: Travel enthusiasts who want to document and share their travel experiences.

- **How They Use It**: Users can sign up, create and manage destination cards, create to-dos, upload images, and rate different types of places.

### Features

- **User Authentication**: Allows users to sign up, log in, and manage their profiles.

- **Destination Cards Management**: Users can create, edit, and delete destination cards in their list. They can also mark destinations as visited.

- **Notes, Images, and Ratings**: Users can create to-dos, upload images for each destination, and rate various types of places.

## Implementation

### Tech Stack

- **Frontend**: React.js, Sass
- **Backend**: Node.js, Express, Knex
- **Database**: MySQL

### Sitemap

- **Landing Page**
  - Users can create a new account or log into their existing account
![Landing Page](https://github.com/KappyVerma/karan-verma-capstone/assets/104116426/a954f535-1824-4e5f-910e-29e40801c870)

- **Home Page**
  - Users can create/edit or delete destination cards
![Home Page](https://github.com/KappyVerma/karan-verma-capstone/assets/104116426/04af6d6d-74a2-447c-93c1-403e485e2c1c)

- **Venue Page**
  - Inside a destination card, users can create a to-do list and post photos
![Venue Page](https://github.com/KappyVerma/karan-verma-capstone/assets/104116426/abc2fecb-2340-4752-a540-a5a015cb9129)

### Data Structure


              +------------+          +----------------+          +----------+
              |   user     |          |   bucketlist   |          |  venue   |
              +------------+          +----------------+          +----------+
              | id         |<-------->| id             |<---------| id       |
              | username   |          | destination    |          | when     |
              | password   |          | accompany      |          | visited..|
              | created_at |          | duedate        |          | content  |
              | updated_at |          | status         |          | image... |
              +------------+          | user_id (FK)   |          | ratings  |
                                      | created_at     |          | user_id  |
                                      | updated_at     |          | bucket.. |
                                      +----------------+          | created..|
                                                                  | updated..|
                                                                  +----------+
                                                                         |
                                                                         |
                                                                         |
                                                                  +-----------+
                                                                  | todolist  |
                                                                  +-----------+
                                                                  | id        |
                                                                  | todoitem  |
                                                                  | status    |
                                                                  | bucket..  |
                                                                  | created.. |
                                                                  | updated.. |
                                                                  +-----------+


### Endpoints

- **User Management**:

  - POST /signup
  - POST /login
  - GET /:id/bucketlist

- **Bucket List Management**:

  - GET /bucketlist
  - POST /bucketlist
  - PATCH /bucketlist/:id
  - DELETE /bucketlist/:id

- **Venue Management**:
  
  - GET /venue
  - POST /venue
  - PATCH /venue/:id
  - DELETE /venue/:id
    
- **Todo Management**:
  
  - GET /todo
  - POST /todo
  - PATCH /todo/:id
  - DELETE /todo/:id
    
## How to Run

### Client Setup:

1. Open your terminal and navigate to a new directory.
2. Clone the client repository by running: `git clone https://github.com/KappyVerma/theadventurelog.git`.
3. Install necessary dependencies using: `npm install`.
4. Start the client application with: `npm start`.

### Backend Setup:

1. Navigate to a new directory using your terminal.
2. Clone the backend repository by running: `git clone https://github.com/KappyVerma/theadventurelog-api.git`.
3. Install required dependencies by running: `npm install`.
4. Create a MySQL database for the backend.
5. Create a new `.env` file in the root directory and fill it with the following details:
    - `DB_HOST=127.0.0.1`
    - `DB_USER=your_database_username`
    - `DB_PASSWORD=your_database_password`
    - `DB_DATABASE=your_database_name`
6. Populate the database:
    - Run `npm run migrate` to create necessary tables.
    - Run `npm run seed` to populate tables with initial data.
7. Start the backend server by running: `npm run start`.


