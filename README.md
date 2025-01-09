# W.A.F Challenge Harry Potter Bookshop

This is a Harry Potter bookshop application built with [NestJS](https://nestjs.com) framework powered by [Fastify](https://fastify.dev). It provides an API to retrieve a shopping cart for Harry Potter books and calculate the cheapest price for the cart using the example Task in the challenge.

## Installation & Usage
1. Ensure you have Docker installed on your machine.
2. Copy the `.env.example` file to `.env` in the root directory of the project:

```sh 
cp .env.example .env
```
3. Run the following command:

```sh
docker-compose up --build
```
This will build the Docker image and start the application on the specified port (3000 default or the one specified in the .env file). If you use the default port, you can access the API at [http://localhost:3000/api](http://localhost:3000/api).

## App Overview
There are two modules in the application:
1. **App Module**: This is the root module of the application. It imports the **CartModule** and serves as main module for DI Container.
2. **Cart Module**: This module provides an API to retrieve a shopping cart including the **PriceService** to calculate the cheapest price for the cart.

### Schemas
The application uses the following schemas:
1. **Book**: Represents a Harry Potter book with the following properties:
    - `name`: The name of the volume. For simplification I am using Volume X instead of the original name.
    - `price`: The price of the book.
2. **CartItem**: Represents an item in the shopping cart with the following properties:
    - `book`: The book in the cart.
    - `quantity`: The quantity of each book in the cart.
3. **Cart**: Represents a shopping cart with the following properties:
    - `products`: An array of cart items.
    - `price`: The total price of the cart.

### Price Service
Price Service has one method `calculateCheapestOffer` which calculates the cheapest possible price for the cart. It uses the backtracking algorithm to find the best possible combination of offers for the cart. It explores all possible combinations of offers and returns the cheapest one.

The service is unit tested with different book combinations to ensure the correct calculation of the cheapest price. Test file is named `price.service.spec.ts`.

You can verify that the tests are passing by running the following command:

```sh
docker-compose exec app yarn test
```

### Test Request of Example Task
I have created example /cart endpoint with hardcoded items from example task. You can test the endpoint with the following request:

```sh
curl --request GET \
  --url http://localhost:3000/api/cart
```

It should return products specified in challenge task and return cheapest price for the cart.

# Conclusion
I hope you find this application easy to understand. If you have any questions or suggestions, I would be happy to hear them or explain the coding process in more detail.

## Stay in touch
- Author - [Filip Zrubecký](https://www.linkedin.com/in/filipzrubeck%C3%BD/)