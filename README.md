# PROJECT 3 --> MGBITE

## Description 
This is a high-level platform for restaurants where customers could order the menus in digital-modern way and the restaurant you can manage all the tasks needed to succeed.


## User stories
- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup: As an anon I can sign up in the platform so that I can start managing my restaurant
- Login: As a user I can login to the platform so I can edit and see according to my user's role (admin or waiter).
- Logout: As a user I can logout from the platform so no one else can use it
- Order request: As a client I can demand the order on my own screen.
- CRUD menu: As a user I can create, edit and delete my menus
- CRUD plates: As a user I can create, edit and delete my plates
- CRUD table: As a user I can create, edit and delete my tables
- Random plates: As a user I can look for a random recipe according to the ingredients that I have in stock.


## MVP
- Connect Back-end and Front-end
- CRUD
- Signup/Login/Logout
- Auth


## Backlog
- Custom menu
- Dishes with photos 
- Users for each waiterg
- Pay platform
- Intolerance filter
- Customize error messages


## Tech challenge
- Connect the front-end with the back end
- Apply all the knowledge acquired during the bootcamp


## Client

### Components

### Services

### Routes
| **Path** | **Component**                   | **Permissions**                                                 | **Behavior**|
| ---------- | ----------------------------| ------------------------------------------------------------    | -----------------------------------------------|
| `GET`      | `/`                         | Main page route. Renders home `index` view.                     |                                                |
| `GET`      | `/login`                    | Renders `login` form view.                                      |                                                |
| `POST`     | `/login`                    | Sends Login form data to the server.                            | { username, password }                         |
| `GET`      | `/signup`                   | Renders `signup` form view.                                     |                                                |
| `POST`     | `/signup`                   | Sends SignUp info to the server and creates user in the DB.     | { name, email, password }                      |
| `GET`      | `/random`                   | Renders to the random card page                                 |                                                |
| `GET`      | `/user`                     | Priv route. Renders `user` view and list projects and cards     |                                                |
| `GET`      | `/project/create/`          | Priv route. Renders `create projects` form.                     |                                                |
| `POST`     | `/project/create/:_id`      | Priv route. Sends new projects info to server, updates DB.      | { projectname, description}                    |
| `GET`      | `/project/edit/`            | Priv route. Renders `edit projects` form.                       |                                                |
| `PUT`      | `/project/edit/:_id`        | Priv route. Sends edit projects info to server, updates DB.     | { projectname, description }                   |
| `POST`     | `/card/create/`             | Priv route. Sends new cards info to server, updates DB.         | { description }                                |
| `GET`      | `/card/create/`             | Priv route. Renders `create cards` form.                        |                                                |
| `DELETE`   | `/projects`                 | Priv route. Deletes user project from DB.                       |                                                |
| `DELETE`   | `/cards`                    | Priv route. Deletes user card from DB.                          |                                                |
| `GET`      | `/logout`                   | Priv route. Destroy current session. Renders home `index` view. | 

## Server 

### Models

### Routes
| **HTTP Method** | **URL**                   | **Request body**                                                 | **Success status**                               | **Error status** | **Description**|
 ---------- | ----------------------------|---------------------------|-----------------------------|----------------------------| -----------------------------------------------|
| `GET`      | `/`                         | Main page route. Renders home `index` view.                     |                                                |
| `GET`      | `/login`                    | Renders `login` form view.                                      |                                                |

## Links

### Github
https://github.com/victorronda/project_3

### Trello
https://trello.com/b/PDuaPoMc/project-3

### Firebase



