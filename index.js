const connectDB = require("/project/workspace/Utilis/database.js");

const express = require("express");

const auth = require("./authentication");
const User = require("./src/Models/user");
const Subscriber = require("./src/Models/subscribers");

const respo = {
  name: "tarun",
  age: "25",
};

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  // const userOne = {
  //   firstName: "Kishan",
  //   lastName: "Singh",
  //   emailId: "tarun12@gmail.com",
  //   password: "tarun@123",
  // };
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("posted successfully the user");
  } catch (err) {
    res.status(400).send("Some Error occured" + err.message);
  }
});

app.post("/subscribe", async (req, res) => {
  try {
    const sub = {
      name: "Khalid",
      password: "k@t$irna",
      emailId: "hasda@gmail.com",
    };
    const subi = new Subscriber(sub);

    await subi.save();
    res.send("added subscriber");
  } catch (err) {
    res.send("some error occured: ", err);
  }
});

app.get("/test", auth, (req, res) => {
  console.log("test");
  res.status(300).send("not authorized");
});
app.use("/test", (req, res) => {
  console.log("universal");
  res.send("universal");
});

app.use(
  "/mid",
  (req, res, next) => {
    if (req.method === "GET") next();
    else res.send("this is not next");
  },
  (req, res) => {
    res.send("this is called next");
  }
);

app.get("/feed", async (req, res) => {
  try {
    const usersData = await User.find({});
    res.send(usersData);
  } catch (err) {
    res.status(400).send("Some error occured: ");
  }
});

app.post("/match", async (req, res) => {
  const userPassword = req.body.password;
  try {
    console.log(userPassword);
    const result = await User.findOne({ password: userPassword });
    res.send(result);
  } catch (err) {
    res.status(400).send("some error occured");
  }
});

app.delete("/delUser", async (req, res) => {
  const userID = req.body.userID;

  try {
    console.log(userID);
    const dele = await User.findByIdAndUpdate(userID, { lastName: "Shringi" });
    res.send("deleted successfully");
  } catch (err) {
    res.status(400).send("some error occured");
  }
});

app.patch("/user", async (req, res) => {
  const userID = req.body.userId;
  console.log(userID);

  try {
    const updated = await User.findByIdAndUpdate(
      userID, // ✅ Pass the ID directly
      { firstName: "Updated Name", emailId: "updated@gmail.com", age: 25 },
      { new: true, runValidators: true } // ✅ Return the updated document
    );

    if (!updated) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).send("Some error: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const delUser = req.body.userId;

  try {
    const del = await User.findByIdAndDelete(delUser);

    res.send("user deleted successfully");
  } catch (err) {
    res.status(500).send("Some error occurred" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("connected to database");

    app.listen(7777, () => {
      console.log("connected to app");
    });
  })
  .catch((err) => {
    console.error(err + "  database gnot connected");
  });
