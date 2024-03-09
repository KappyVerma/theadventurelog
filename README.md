### https://github.com/KappyVerma/karan-verma-capstone-api

# The Adventure Log

## Overview

The Adventure Log is a web application that enables users to create, share, and rate their travel experiences. Users can manage their destination cards, create todos, upload images, and rate various places.

### Problem

Keeping track of our travel experiences has always been a challenge for my wife and me. We've been to many places and had both wonderful and challenging moments, but often forget to write those moments down or rate them.

Just like many others, we've faced the common issue of forgetting important details during our travels. As travelers who enjoy sharing our experiences but don't want the hassle of posting on social media, we see the need for a platform designed for laid-back explorers. We're looking for an app that can help organize our travel memories effortlessly and allows us to share these experiences without the overwhelming nature of mainstream social platforms.

Enter The Adventure Log — our solution to this dilemma. It's a dedicated space for travelers like us to easily curate, celebrate, and connect over our adventures. It's the perfect platform for those who love exploring but prefer simplicity, ensuring that the valuable lessons we've learned during our journeys contribute to a shared knowledge pool, benefiting fellow travelers without the usual fuss.

### User Profile

- **Primary Users**: Travel enthusiasts who want to document and share their travel experiences.

- **How They Use It**: Users can sign up, create and manage destination cards, create todos, upload images, and rate different types of places.

### Features

- **User Authentication**: Allow users to sign up, log in, and manage their profiles.

- **Destination Cards Management**: Create, edit, and delete destinations cards in the user's destination list. Mark destinations as visited.

- **Notes, Images, and Ratings**: Users can create todos and upload images for each destination and rate various types of places.

## Implementation

### Tech Stack

- **Frontend**: React.js, Sass
- **Backend**: Node.js, Express, Knex
- **Database**: MySQL

### Sitemap

- **Sign-in / Sign-up Page**
- **Home Page**
- **Venue Page**

### Data

- **Users Table**: id, username, password, timestamp.

- **Destination Table**: id, destination, accompany, duedate, status, user_id, timestamp.

- **Venue Table**: id, user_id, destination_id, text, created_at

### Endpoints

- **User Authentication**:

  - POST /signup
  - POST /login

- **Destination Management**:

  - POST /destinations
  - GET /destinations
  - GET /destinations/:id
  - PUT /destinations/:id
  - DELETE /destinations/:id

- **Bucket List Management**:

  - GET /bucketlist
  - POST /bucketlist
  - PUT /bucketlist/:id
  - DELETE /bucketlist/:id
