# The Travel Tea

## Overview

The Travel Tea is a web application that enables users to create, share, and rate their travel experiences. Users can manage their bucket lists, leave comments, upload images, and rate various places.

### Problem

Keeping track of our travel experiences has always been a challenge for my wife and me. We've been to many places and had both wonderful and challenging moments, but often forget to write those moments down or rate them.

Just like many others, we've faced the common issue of forgetting important details during our travels. As travelers who enjoy sharing our experiences but don't want the hassle of posting on social media, we see the need for a platform designed for laid-back explorers. We're looking for an app that can help organize our travel memories effortlessly and allows us to share these experiences without the overwhelming nature of mainstream social platforms.

Enter The Travel Tea — our solution to this dilemma. It's a dedicated space for travelers like us to easily curate, celebrate, and connect over our adventures. It's the perfect platform for those who love exploring but prefer simplicity, ensuring that the valuable lessons we've learned during our journeys contribute to a shared knowledge pool, benefiting fellow travelers without the usual fuss.

### User Profile

- **Primary Users**: Travel enthusiasts who want to document and share their travel experiences.

- **How They Use It**: Users can sign up, create and manage bucket lists, leave comments, upload images, and rate different types of places.

### Features

- **User Authentication**: Allow users to sign up, log in, and manage their profiles.

- **Bucket List Management**: Create, edit, and delete destinations in the user's bucket list.Mark destinations as visited.

- **Comments, Images, and Ratings**: Users can leave comments and upload images for each destination and rate various types of places.

## Implementation

### Tech Stack

- **Frontend**: React
- **Backend**: Express
- **Database**: MySQL
- **Authentication**: JWT

### APIs

Not using any external API.

### Sitemap

- **Sign-in / Sign-up Page**
- **Profile/Bucket List Page**
- **Destination Page**

### Mockups

![Sign-in Page](<Screenshot 2024-01-23 at 11.02.35 PM-1.png>)

![Profile Page](<Screenshot 2024-01-23 at 11.33.56 PM-1.png>)

![Destination Page](<Screenshot 2024-01-23 at 11.34.03 PM-1.png>)

### Data

- **Users Table**: user_id, username, password, email, timestamp.

- **Destination Table**: destination_id, user_id, name, notes, visited, timestamp.

- **Comments Table**: comment_id, user_id, destination_id, comment_text, created_at

### Endpoints

- **User Authentication**:

  - POST /signup
  - POST /login

- **Bucket List Management**:

  - POST /destinations
  - GET /destinations
  - GET /destinations/:id
  - PUT /destinations/:id
  - DELETE /destinations/:id

- **Comments**:

  - GET /destinations/:id/comments
  - POST /destinations/:id/comments

### Auth

I will be using JWT for authentication.

## Roadmap

Timeline to finish this project is 7-10 days.

## Nice-to-haves

Adding Map pin for each destination and rated places.

Making Destinations public or private.

Search for Destinations and rated places.
