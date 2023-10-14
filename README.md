## Event Sourcing Card API
### This API provides endpoints for managing cards, adding them to a cart, and making purchases using an event sourcing approach.

### Routes and Request Bodies

# Add Card to Cart
Endpoint: POST /cards/add-to-cart
cardId (string, required): The ID of the card to add to the cart.
userId (string, required): The ID of the user performing the action.

Request Body:
Copy code
```
{
  "cardId": "string",
  "userId": "string"
} 
```


## Purchase Card
Endpoint: POST /cards/purchase
cardId (string, required): The ID of the card being purchased.
userId (string, required): The ID of the user making the purchase.
totalPrice (number, required): The total price of the card.

Request Body:
Copy code
```
{
  "cardId": "string",
  "userId": "string",
  "totalPrice": number
}
```

## Get Cards in Cart
Endpoint: GET /cards/cards-in-cart/:userId

## Get Purchased Cards
Endpoint: GET /cards/cards-purchased/:userId

Setup
Install dependencies: pnpm install
Start the server: pnpm run dev 
Access the API at http://localhost:3000
