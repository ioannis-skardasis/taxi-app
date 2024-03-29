const { User, Item } = require("../Model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

require("dotenv").config();

let saltRounds = Number(process.env.SALT_ROUNDS);
let jwtSecret = "process.env.JWT_SECRET";

async function registerUser(req, res) {
  // console.log("Registering user...");
  try {
    const { name, surname, email, username, password } = req.body;

    if (!username || !password) {
      return res.send({ msg: "Both username and password are required" });
    }
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.send({ msg: "Username already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        name,
        surname,
        email,
        username,
        password: hashedPassword,
      });

      const token = jwt.sign(
        { userId: newUser._id, username: newUser.username },
        process.env.TOKEN_PRIVATE_KEY
      );
      return res.send({ msg: "Registered successfully. Welcome!", token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Cannot register. Please try again later.", error });
  }
}

async function loginUser(req, res) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.send({ msg: "Both username and password are required" });
    }
    let userFound = await User.findOne({ username });
    if (!userFound) {
      return res.send({ msg: "Invalid username" });
    } else {
      let validatePassword = await bcrypt.compare(password, userFound.password);
      if (!validatePassword) {
        return res.send({ msg: "Incorrect password" });
      }
      let token = jwt.sign(
        { userId: userFound._id, username: userFound.username },
        process.env.TOKEN_PRIVATE_KEY
      );
      return res.send(token);
    }
  } catch (error) {
    res.status(500).send({ msg: "Cannot login, try later", error });
  }
}

async function getUserItemsByStatus(req, res) {
  try {
    const userId = req.user.userId;
    const { status } = req.params;
    const items = await Item.find({ user: userId, status }).populate("user");
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

async function getUserLostItems(req, res) {
  try {
    const userId = req.user.userId;
    const items = await Item.find({ user: userId, status: "lost" }).populate(
      "user"
    );
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

async function getUserFoundItems(req, res) {
  try {
    const userId = req.user.userId;
    const items = await Item.find({ user: userId, status: "found" }).populate(
      "user"
    );
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

const deleteFoundItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.status !== "found") {
      return res.status(400).json({ message: "Item is not found" });
    }
    await Item.deleteOne({ _id: item._id });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteLostItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.status !== "lost") {
      return res.status(400).json({ message: "Item is not lost" });
    }
    await Item.deleteOne({ _id: item._id });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

async function addItem(req, res) {
  try {
    const { item, description, location, carBrand, date, status } = req.body;
    const userId = req.user.userId;

    const newItem = await Item.create({
      item,
      description,
      location,
      date,
      carBrand,
      status,
      user: userId,
    });
    console.log(newItem);
    return res.send({ msg: "Item added successfully!", newItem });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Cannot add item. Please try again later.", error });
  }
}

const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const { item, description, location, date, carBrand, status } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        item,
        description,
        location,
        date,
        carBrand,
        status,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error: error.message });
  }
};


const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate('user');
    
    if (!item) {
      return res.status(404).json({ msg: "Item not found." });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
};


async function getAllFoundItems(req, res) {
  try {
    const foundItems = await Item.find({ status: "found" }).populate("user");
    res.json(foundItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

async function getAllLostItems(req, res) {
  try {
    const lostItems = await Item.find({ status: "lost" }).populate("user");
    res.json(lostItems);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

const getEmailByItemId = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate('user');
    const user = await User.findById(item.user._id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }
    const email = user.email;
    res.json({ email });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserItemsByStatus,
  getUsers,
  getUserLostItems,
  getUserFoundItems,
  deleteFoundItem,
  deleteLostItem,
  getAllFoundItems,
  getAllLostItems,
  addItem,
  updateItem,
  getItemById,
  getEmailByItemId,
};
