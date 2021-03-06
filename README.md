# PROJECT 3 --> MGBITE

## Description 
This is a high-level platform for restaurants where customers could order the menus in digital-modern way and, as the restaurant, you can manage all the tasks needed to succeed.

## User stories
- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- Signup: As an anon I can sign up in the platform so that I can start managing my restaurant.
- Login: As a user I can login to the platform so I can edit and see according to my user's role (admin or waiter).
- Logout: As a user I can logout from the platform so no one else can use it.
- Order request: As a client I can demand the order on my own screen.
- CRUD menu: As a user I can create, edit and delete my menus.
- CRUD dishes: As a user I can create, edit and delete my dishes.
- CRUD table: As a user I can create, edit and delete my tables.

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
- Screensaver 
- Several menus
- Delete account

## Tech challenge
- Connect the front-end with the back end
- Apply all the knowledge acquired during the bootcamp

## Client

### Components

### Services

### Routes
|      **Path**      | **Component**             |    **Permissions**   | **Behavior**                                   |
|--------------------|---------------------------| ---------------------| -----------------------------------------------|
| `/`                | HomePageComponent         | Public route         | HomePage                                       |
| `/signup`          | SignupPageComponent       | Public route         | Signup form, link to login, navigate to homepage after signup|
| `/`                |                           |                      |                                                |
| `/`                |                           |                      |                                                |


## Server 

### Models

- Company Model
````
 {
    name: String,
    email: String,
    password: String,
    employees: [{type: Schema.Types.ObjectId, ref: "Employee"}],
    menus: [{type: Schema.Types.ObjectId, ref: "Menu"}],
    tables: [{type: Schema.Types.ObjectId, ref: "Table"}]
 }
````

- Employee Model
````
 {
    name: String,
    password: String,
    companyId: [{type: Schema.Types.ObjectId, ref: "Company"}]
 }
````

- Menu Model
````
 {
    name: String,
    dishes: [ {type: Schema.Types.ObjectId, ref: "Dish"} ] ,
    companyId: [{type: Schema.Types.ObjectId, ref: "Company"}]
 }
````

- Dish Model
````
 {
    name: String,
    typeItem: {type: String, enum: ['Dessert', 'Drinks', 'Appetizers', 'Main Plate', 'Second Plate']},
    ingredients: Array,
    description: String,
    image: String,
    price: Number,
    quantity: Number
 }
````

- Table Model
````
 {
    number: Number, 
    companyId: [{type: Schema.Types.ObjectId, ref: "Company"}],
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
 }
````

- Order Model
````
 {
    dishesId: [{type: Schema.Types.ObjectId, ref: "Dish"}], 
    tableId: [{type: Schema.Types.ObjectId, ref: "Table"}],
    quantity: Array,
    bill: number
 }
````

### Routes
|**HTTP Method**|            **URL**           |          **Request body**         |**Success status**|**Error status**|**Description**                       |
----------------| -----------------------------|-----------------------------------|------------------|----------------|--------------------------------------|
| `POST`        | `/auth/signup`               | {name, password, email}           | 201              | 400            | Create user with encrypted password, stores user in session|
| `POST`        | `/auth/login`                | {name, password}                  | 200              | 400            | If name and password matches, the admin can access the app|
| `POST`        | `/auth/logout`               |                                   | 204              | 400            | Logs out the user                    |
| `POST`        | `/employees/staff/add`       | {name, password}                  | 201              | 400            | Admin can create the employees accounts|
| `POST`        | `/employees/login`           | {name, password}                  | 200              | 400            | If name and password matches, the employee can access the app|
| `GET`         | `/employees/staff`           |                                   | 200              | 400            | Shows company's employees            |
| `PUT`         | `/employees/staff/:id/edit`  |                                   | 200              | 400            | Admin can edit the employees accounts|
| `DELETE`      | `/employees/staff/:id/delete`|                                   | 200              | 400            | Admin can delete the employees accounts|
| `POST`        | `/menus/add`                 | {name, dishes}                    | 201              | 400            | Admin can create menus               |
| `PUT`         | `/menus/:_id/edit`           |                                   | 200              | 400            | Admin can edit menus                 |
| `DELETE`      | `/menus/:_id/delete`         |                                   | 200              | 400            | Admin can delete menus               |
| `GET`         | `/menus/:_id`                |                                   | 200              | 400            | Shows the menu that customers are going to see|
| `GET`         | `/dishes/showAll`            |                                   | 200              | 400            | Shows the dishes that the admin has created|
| `GET`         | `/dishes/:id`                |                                   | 200              | 400            | Shows details of each dish           |
| `POST`        | `/dishes/add`                | {name, typeItem, ingredients, description, image, price}|201|   400   | Admin can create dishes              |
| `PUT`         | `/dishes/:id/edit`           |                                   | 200              | 400            | Admin can edit dishes                |
| `DELETE`      | `/dishes/:id/delete`         |                                   | 200              | 400            | Admin can delete dishes              |
| `POST`        | `/tables/add`                | {number, dishes}                  | 201              | 400            | Admin can create tables              |
| `PUT`         | `/tables/:id/edit`           |                                   | 200              | 400            | Admin can edit tables                |
| `GET`         | `/tables/showAll`            |                                   | 200              | 400            | Shows all the tables with orders     |
| `POST`        | `/orders/add/tableId`        |{quantity, dishesId, tableId, bill}| 201              | 400            | Creates a order in the current table |
| `PUT`         | `/orders/orderId/edit`       |                                   | 200              | 400            | Edit the order in the current table  |
| `PUT`         | `/orders/:orderId/table/:tableId/confirm`|                       | 200              | 400            | Confirms the final order in the current table|
| `DELETE`      | `/orders/staff/:orderId/table/:tableId/delete`|                  | 200              | 400            | Deletes the order                    |

## Links

### Github
https://github.com/victorronda/project_3

### Trello
https://trello.com/b/PDuaPoMc/project-3

### Slides
https://docs.google.com/presentation/d/1M63k4PhfnaDMhEqOfxjthyb88QvB4TpP22yhiDG7u7o/edit?usp=sharing

### Deploy
https://mgbite-2bc7a.firebaseapp.com