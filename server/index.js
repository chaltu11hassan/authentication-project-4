require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { SERVER_PORT } = process.env;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
User.hasMany(Post);
Post.belongsTo(User);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

app.post("/register", register, isAuthenticated);
app.post("/login", login, isAuthenticated);
// app.post("/logout", logout, isAuthenticated);

app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", addPost, isAuthenticated);
app.put("/posts/:id", editPost, isAuthenticated);
app.delete("/posts/:id", deletePost, isAuthenticated);

/////////////////////////////////////////////////////////////////////

// the force: true is for development --DROPS tables
sequelize
  .sync({ force: true })
  // sequelize
  //   .sync()
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`db sync & server running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));
