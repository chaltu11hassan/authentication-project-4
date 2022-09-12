require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

const { isAuthenticated } = require("./middleware/isAuthenticated");
const { register, login } = require("./controllers/auth");
// const { logout } = require("./controllers/auth");

const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const app = express();
app.use(express.json());
app.use(cors());

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
User.hasMany(Post);
Post.belongsTo(User);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/register", register);
app.post("/login", login);
// app.post("/logout", logout);

app.get("/posts", getAllPosts);

app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

/////////////////////////////////////////////////////////////////////

// the force: true is for development --DROPS tables
sequelize.sync({ force: true })
  // sequelize.sync()
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`db sync & server running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
