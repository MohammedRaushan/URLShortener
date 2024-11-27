const User = require('../db/models/User');

// Create user function
const createUser = async (userData) => {
    const newUser = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
    });
    let response = await newUser.save();
    console.log(response);
    return response;
};

// Delete user function
const deleteUser = async (userId) => {
    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            console.log("User not found");
            return { message: "User not found" };
        }

        console.log("User deleted successfully");
        return {message:"User deleted",data:user};
    } catch (error) {
        console.error("Error deleting user:", error);
        return { message: "Error deleting user", error };
    }
};

// Get user function
const getUser = async (userId) => {
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            console.log("User not found");
            return { message: "User not found" };
        }

        console.log("User found:", user);
        return {message:"User found",data:user};
    } catch (error) {
        console.error("Error getting user:", error);
        return { message: "Error getting user", error };
    }
};

const getUserByEmailAndPassword = async (email, password) => {
    try {
        // Find the user by ID
        const user = await User.find({"email":email,"password":password});

        if (!user) {
            console.log("User not found");
            return { message: "User not found" };
        }

        console.log("User found:", user);
        return {message:"User found",data:user};
    } catch (error) {
        console.error("Error getting user:", error);
        return { message: "Error getting user", error };
    }
};

// PUT update-user
const updateUser = async (userId, newData) => {
    try {
        const user = await User.findById(userId)
        if(!user){
            return {message:"User not found"}
        }
        user.name = newData.name
        user.email = newData.email
        user.password = newData.password
        user.save()
        return {message:"User updated",data:user}
    }
    catch (err) {
        return {message:"Error while updating user",details:err}
    }
}

const getAllUsers = async ()=>{
    try{
        const users = await User.find() // returns all users
        if(!users){
            return {message:"Users not found"}
        }
        return {message:"List of users found", data:users}
    }catch(err){
        return {message:"Error while fetching all the users",details:err}
    }
}

module.exports = { createUser, getUser, deleteUser, updateUser, getAllUsers, getUserByEmailAndPassword };
