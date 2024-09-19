# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

**Example**: A SHOW route: 'blogs/:id' [GET]

- Index : '/products' [GET]
- Show : '/product/:id' [GET]
- Create [token required]: '/products' [POST]
  <!-- - [OPTIONAL] Top 5 most popular products  -->
  <!-- - [OPTIONAL] Products by category (args: product category) -->

#### Users

- Index [token required]: '/Users' [GET]
- Show [token required] '/Users/:id' [GET]
- Create N[token required]: '/Users' [POST]

#### Orders

- Current Order by user (args: user id)[token required]
<!-- - [OPTIONAL] Completed Orders by user (args: user id)[token required] -->

## Data Shapes

#### Product

- id: VARCHAR
- name: VARCHAR
- price: INTEGER
- [OPTIONAL] category: VARCHAR

#### User

- id: VARCHAR
- firstName: VARCHAR
- lastName: VARCHAR
- password: string

#### Orders

- id: VARCHAR
- id of each product in the order: VARCHAR (Forgien key)
- quantity of each product in the order: INTEGER
- user_id: VARCHAR (Forgien key)
- status of order (active or complete): CHAR (A/C)

## Database

### Products Table:

- Products (id:varchar, name:varchar, price:INTEGER, category:VARCHAR)

### Users Table:

- Users (id:varchar, firstName:varchar, lastName:varchar, password:string)

### Orders Table:

- Orders (id:varchar, product_id:varchar[forgien key to Products table], prod_quantity:integer, user_id:varchar[forgien key to Users table], status_of_order:char)
