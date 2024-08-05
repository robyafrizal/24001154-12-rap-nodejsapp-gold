//-----------------User Handler------------------------------
//Dependency Injection Method
const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/auth");

const UserRepository = require("../repository/user");
const UserService = require("../service/user");
const UserHandler = require("../handler/user");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      return callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const router = express.Router();

router.get(
  "/users",
  authMiddleware.authenticate,
  authMiddleware.checkUserIsDian,
  userHandler.getAll
);
// router.get("/users", userHandler.getAll);
router.get("/users/:id", userHandler.getId);
router.put("/users/:id", userHandler.update);
router.delete("/users/:id", userHandler.delete);
// router.put("/users/:id/profilePicture", userHandler.updateProfile);

router.post("/profile", upload.single("avatar"), userHandler.profile);
router.post("/photos/upload", upload.array("photos", 12), userHandler.photos);

module.exports = router;
