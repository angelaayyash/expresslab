const express = require("express");
const cartRoutes = express.Router();

const cartItems = [
  { id: 1, product: "cheese", price: 4, quantity: 1 },
  { id: 2, product: "spinach", price: 3, quantity: 2 },
  { id: 3, product: "bread", price: 2, quantity: 2 },
  { id: 4, product: "milk", price: 1, quantity: 3 }
];

let nextId = cartItems.length;
// GET
cartRoutes.get("/cart-items/", (req, res) => {
  res.status(200);
  res.json(cartItems);
});

cartRoutes.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // get the cartItem by this id
  const foundItem = cartItems.find(item => item.id === id);
  //return matching cart item by id
  if (foundItem) {
    res.status(200);
    res.json(foundItem);
  } else {
    //return error
    res.status(404);
    res.send(`ID (${id}) not found.`);
  }
});

//POST
cartRoutes.post("/cart-items/", (req, res) => {
  const newItem = req.body;
  newItem.id = nextId;
  nextId++;
  //add newItem to cart items array
  cartItems.push(newItem);
  res.status(201);
  res.json(newItem);
});

//PUT
cartRoutes.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = cartItems.findIndex(item => item.id === id);
  if (foundIndex > -1) {
    //get the body from the request to update this cart item
    let updatedItem = req.body;
    updatedItem.id = id;
    //update item (deleted one and replace with updatedItem)
    cartItems.splice(foundIndex, 1, updatedItem);
    //return the updated cart item by id
    res.status(200);
    res.json(updatedItem);
  } else {
    //return error
    res.status(404);
    res.send(`ID (${id}) not found. Nothing to update`);
  }
});

cartRoutes.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundIndex = cartItems.findIndex(item => item.id === id);
  if (foundIndex > -1) {
    cartItems.splice(foundIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(400);
    res.send(`ID (${id}) not found. Nothing to delete.`);
  }
});

module.exports = { cartRoutes };

// send a status = res.send("new item added to cart")
// send a status = res.sendstatus

// cartItems.put(“/cart-items/:id”, (request, response) => {
//     let id = parseInt(request.params.id);
//     let updateCart = request.body;
//     updateCart.id = id;
//     nextId++;
//     let index = carts.findIndex(cart => cart.id === id);
//     if (index >= 0) {
//       carts.splice(index, 1, updateCart);
//       response.json(carts);
//     } else {
//       response.status(200);
//       response.send(“Ok”);
//     }
//   });
//   cartItems.delete(“/cart-items/:id”, (request, response) => {
//     let id = parseInt(request.params.id);
//     let index = carts.findIndex(cart => car.id === id);
//     if (index >= 0) {
//       carts.splice(index, i);
//       response.sendStatus(204);
//     } else {
//       response.status(204);
//       response.send(“No Content”);
//     }
//   });
