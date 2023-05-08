const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/auth");
const {
  registerUser,
  loginUser,
  getUserItemsByStatus,
  getUsers,
  getUserLostItems,
  getUserFoundItems,  
  deleteFoundItem,
  deleteLostItem,
  addItem,
} = require("../Controllers/controller");
const itemController = require("../Controllers/controller");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/items/:status", verifyToken, getUserItemsByStatus);

router.get("/items/lost", verifyToken, getUserLostItems);

router.get("/items/found", verifyToken, getUserFoundItems);

router.delete("/items/found/:id", verifyToken, deleteFoundItem);

router.delete("/items/lost/:id", verifyToken, deleteLostItem);

router.get("/allItems/found", itemController.getAllFoundItems);

router.get("/allItems/lost", itemController.getAllLostItems);

router.post("/addItem", verifyToken, addItem);

router.get("/users", getUsers);

module.exports = router;
