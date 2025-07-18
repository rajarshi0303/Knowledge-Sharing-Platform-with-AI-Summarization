import User from "../models/User.mjs";
import Article from "../models/Article.mjs";

// GET all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// CREATE new user (admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already in use" });

    // ✅ No need to hash password manually
    const user = new User({ name, email, password, role });
    await user.save(); // This will trigger the userSchema.pre("save") hook

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// UPDATE role or name
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, role } = req.body;

    // Check if anything has changed
    const nameChanged = name && name !== user.name;
    const roleChanged = role && role !== user.role;

    if (!nameChanged && !roleChanged) {
      return res.status(400).json({ message: "No changes detected" });
    }

    // Apply updates
    if (nameChanged) user.name = name;
    if (roleChanged) user.role = role;

    await user.save();
    res.json({ message: "User updated", user });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    // Prevent user from deleting themselves
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all articles created by this user
    const deletedArticles = await Article.deleteMany({
      createdBy: req.params.id,
    });

    res.json({
      message: "User deleted",
      deletedArticlesCount: deletedArticles.deletedCount,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
