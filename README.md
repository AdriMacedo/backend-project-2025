# BACKEND_MOVIE-API

é uma API RESTful para gerir trailers de filmes, com autenticacao JWT e controlo de acesso baseado em funçoes. 

## Tecnologias Usadas

- TypeScript
- Express.js
- MongoDB + Mongoose
- JWT
- Bcrypt
- express-fileupload
- express-validator
- dotenv

## Estrutura do projeto

```
/static/posters         #imagens filmes
/src
    /controllers        #lógica endpoints (auth,movies,users)
    /middleware         #JWT e role middleware
    /models             #esquemas Mongoose
    /routes             #rotas express    
    /models             #esquemas Mongoose
    /services           #lógica de validacoes, DB
    
    /validator          #validacao 
    /main.ts        #inicio da app
```

## API Endpoints
- `POST /auth/register` - User registration.
- `POST /auth/login` - User login to obtain a JWT.
- `GET /auth/users` - (Admin only) Fetch a list of users.
- `PUT /auth/users/:id` - (Admin only) Update user details.
- `DELETE /auth/user/:id` - (Admin only) Delete a user.
- `GET /api/movies` - (Only logged users) Fetch a list of movie trailers with details.
- `GET /api/movies/search` - (Only logged users) Fetch a list of movie with pagination and sort and filters (sortBy realiseDate, search by realise year, name or genre).
- `POST /api/movies` - (Admin only) Add a new movie.
- `PUT /api/movies/:id` - (Admin only) Update movie details.
- `DELETE /api/movies/:id` - (Admin only) Delete a movie.


## exemplos de filmes
```JSON
[
    {
    "title": "Step Up 3D",
    "releaseDate": "2010-08-06",
    "trailerLink": "https://www.youtube.com/watch?v=Ee7V9sJv030",
    "poster": "Step_up_3d_poster.jpg",
    "genres": ["Dança","Drama","Romance","Adventure","Comédia"]
    },
    {
    "title": "The North Shore",
    "releaseDate":"1987-08-14",
    "trailerLink": "https://www.youtube.com/watch?v=QxTjTGhQ9jY",
    "poster": "North_shore_poster.jpg",
    "genres": ["Action","Drama","Romance","Sport"]
    },
    {
    "title": "Top Gun",
    "releaseDate":"2010-05-16",
    "trailerLink": "https://www.youtube.com/watch?v=xa_z57UatDY",
    "poster": "Top_Gun_Movie_poster.jpg",
    "genres": ["Action","Drama","Romance","Adventure"]
    }
]
```
## repositório

