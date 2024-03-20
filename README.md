Movie App

Welcome to the Movie App! This app provides users with a platform to explore various movies, their genres, and detailed information, including cast members. 
Powered by the Movie Database API, users can browse through an extensive collection of movies, search for specific titles, and delve into actor profiles.

----Purpose----
The purpose of the Movie App is to offer users an experience in the world of movies. 
Whether users are casual movie enthusiasts or avid cinephiles, this app aims to cater to their interests by providing details about movies and actors. 
From discovering trending movies to exploring upcoming releases, users can stay informed and engaged with the latest in the film industry.

----Features----
Browse Movies: Users can browse through a diverse selection of movies, sorted by various categories such as popularity, release date, and top-rated.
Search Movies: The app allows users to search for specific movies using keywords, enabling quick and easy access to desired titles.
View Movie Details: Users can view detailed information about each movie, including its synopsis, release date, genres, and cast members.
Explore Genres: The app categorizes movies into different genres, allowing users to explore movies based on their preferred genre.
Actor Profiles: Users can read about their favorite actors, view their filmography, and discover their contributions to the movie industry.

-----Getting Started----
To configure the Movie App for building and testing, follow these steps:

Obtain API Key: The API key required for accessing The Movie Database (TMDb) is provided separately.
Please contact the app developer to obtain the API key.

API Key Configuration: Once you have obtained the API key, you need to add it to the app's source code. 
The API key should be added to a file that is not present in the GitHub repository, since it contains sensitive information = the API key. 
So this file is you need to create on your own. Create a constants folder and inside it place a file called index.js.
project_root/
│
├── constants/
│   └── index.js
│
Now inside index.js file :
export const apiKey ='ADD_API_KEY_HERE';

Dependencies:
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "axios": "^1.6.8",
    "expo": "~50.0.13",
    "expo-linear-gradient": "~12.7.2",
    "expo-status-bar": "~1.11.1",
    "nativewind": "^2.0.11",
    "react": "18.2.0",
    "react-native": "0.73.5",
    "react-native-heroicons": "^4.0.0",
    "react-native-progress": "^5.0.1",
    "react-native-safe-area-context": "^4.9.0",
    "react-native-screens": "^3.29.0",
    "react-native-snap-carousel": "^3.9.1",
    "react-native-svg": "^15.1.0"

Build and Test: After configuring the API key, build and run the app on your preferred development environment or device. 
Ensure that the app functions correctly and retrieves movie data from the Movie Database API.

Enjoy exploring the fascinating world of movies with the Movie App! 🍿🎬
