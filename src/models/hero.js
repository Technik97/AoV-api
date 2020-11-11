const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        comments: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;