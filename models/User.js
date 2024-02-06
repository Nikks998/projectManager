const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    },
    checked: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

/* se ejecuta antes de guardar el documento */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { //evita volver a hashear el password cuando este no ha sido modificado
        next()
    }
    this.password = await hash(this.password, 10);
});

/* puedo crear más métodos */
userSchema.methods.checkedPassword = async function (password) {
    return await compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema);

//Export the model
module.exports = mongoose.model('User', userSchema);