const user = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await user.findOne({ username: username });
  if (!existingUser) {
    return res.status(404).json("user not found");
  }
  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json("invalid password");
  }
  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
  res.status(200).json({
    token: token,
    userDetails: {
      _id: existingUser._id,
      username: existingUser.username,
      permissions: existingUser.permissions,
    },
  });
};

exports.resetPassword = async (req, res) => {
  try {
    const userId = req.payload;
    // console.log("Current user id: ", userId);
    const currentUser = await user.findOne({ _id: userId });
    // console.log("Current user: ", currentUser);
    if (!currentUser) {
      console.log("User not found");
      return res.status(404).json("user not found");
    }
    // console.log("request body: ", req.body)
    const editingUserId = req.params.id;
    console.log("Editing user id: ", editingUserId);
    if (editingUserId === userId && currentUser.username !== "admin") {
      const { currentPassword, newPassword } = req.body;
      const isMatch = await currentUser.comparePassword(currentPassword);
      if (!isMatch) {
        res.status(400).json("invalid current password");
      } else {
        currentUser.password = newPassword;
        await currentUser.save();
        res.status(200).json(currentUser);
      }
    } else if (currentUser.username === "admin" && editingUserId !== userId) {
      const { newPassword } = req.body;
      const editingUser = await user.findOne({ _id: editingUserId });
      if (!editingUser) {
        return res.status(404).json("user not found");
      } else {
        editingUser.password = newPassword;
        await editingUser.save();
        res.status(200).json(editingUser);
      }
    } else if (currentUser.username === "admin" && editingUserId === userId) {
    //   console.log("Inside password reset for admin");
      const { currentPassword, newPassword } = req.body;
      const isMatch = await currentUser.comparePassword(currentPassword);
      if (!isMatch) {
        res.status(400).json("invalid current password");
      } else {
        currentUser.password = newPassword;
        await currentUser.save();
        res.status(200).json(currentUser);
      }
    }else{
        res.status(401).json("Unauthorized");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.updatePermissions = async (req, res) => {
  try {
    const userId = req.payload;
    console.log("Current user id: ", userId);
    const currentUser = await user.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(404).json("user not found");
    } else {
      const editingUserId = req.params.id;
      if (currentUser.username === "admin") {
        const { permissions } = req.body;
        const editingUser = await user.findById(editingUserId);
        if (!editingUser) {
          return res.status(404).json("user not found");
        } else {
          editingUser.permissions = permissions;
          await editingUser.save();
          res.status(200).json(editingUser);
        }
      }else{
        res.status(401).json("Unauthorized to reset permissions");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.deleteUser = async (req, res)=>{
  try{
    const userId = req.payload;
    const currentUser = await user.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(404).json("user not found");
    } else {
      if(currentUser.username === "admin"){
        const deletingUserId = req.params.id;
        const deletingUserDetails = user.findOne({_id:deletingUserId});
        if(!deletingUserDetails){
          return res.status(404).json("user not found");
        }
        if(deletingUserDetails.username === "admin"){
          return res.status(401).json("Cannot delete admin user");
        }
        await user.deleteOne({_id:deletingUserId});
        res.status(200).json({_id:deletingUserId});
      }else{
        res.status(401).json("Unauthorized to delete user");
      }
    }
  }catch(err){
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
}
