const express = require("express");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
app.use(express.json());

const client = new MongoClient(
  "mongodb+srv://ooyundari887:kPDwz0ydJKmhNTvX@cluster-1.l6azy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1"
);
let db;
const connectDB = () => {
  try {
    client.connect();
    db = client.db("sample_mflix");
    console.log("Connect to DB");
  } catch (error) {
    console.log("failed to connect");
  }
};
connectDB();

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.status(200).send(users);
});

// app.post("/signUp", async (req, res) => {
//   try {
//     const body = req.body;
//     const { name, email, password } = body;
//     const hashed = await bcrypt.hash(password, 10);
//     const users = await db.collection("users").insertOne({
//       name,
//       email,
//       password: hashed,
//     });
//     res.send("amjillttai burtegdlee");
//   } catch (error) {
//     res.send("amjiltgui");
//   }
// });

app.post("/users", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const response = await db.collection("users").insertOne(body);
    res.send(response);
  } catch (error) {
    res.send(`error ${error}`);
  }
});

app.put("/users", async (req, res) => {
  const body = req.body;
  const response = await db.collection("users").updateOne(
    { _id: new ObjectId("6732f69cfaaee2f04090c347") },
    {
      $set: {
        name: "asdf",
      },
    }
  );

  res.send(response);
});

app.delete("/users", async (req, res) => {
  const { id } = req.body;
  const response = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });

  res.send(response);
});
app.listen(8080, console.log("Your sever is running"));
