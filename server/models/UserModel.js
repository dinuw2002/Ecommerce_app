const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Package for hashing passwords

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Crucial: Emails must be unique
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Method to compare entered password with the hashed password in the DB
userSchema.methods.matchPassword = async function (enteredPassword) {
    // 'this.password' refers to the hashed password stored in the database
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware: Encrypt password before saving (the 'pre' save hook)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next(); // Skip if password hasn't been modified
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;