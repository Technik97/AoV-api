const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

//const gravatar = require('../util/gravatar');

module.exports = {
    newHero: async (parent, args, { models }) => {
        return await models.Hero.create({
            name: args.name,
            category: args.category,
            role: args.role
        });
    },

    deleteHero: async (parent, { id }, { models }) => {
        try{
            await models.Hero.findOneAndRemove({ _id: id });
            return true;
        }catch(err){
            return false;
        }
    },

    updateHero: async (parent, { role, id }, { models }) => {
        return await models.Hero.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    role
                }
            },
            {
                new: true
            }
        );
    },

    signUp: async (parent, { username, password }, { models }) => {
        const hashed = await bcrypt.hash(password, 10);

        //const avatar = gravatar(username);   //create gravatar url

        try{
            const user = await models.User.create({
                username,
                password: hashed,
            //    avatar
            });

            //create and return the json web token
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        }catch(err){
            //if there's a problem creating the account, throw an error
            throw new Error('Error creating account');
        }
    },

    signIn: async (parent, { username, password }, { models }) => {
        const user = await models.User.findOne({
            $or: [{ username }]
        });

        //if no user is found, throw an authentication error
        if(!user) {
            throw new AuthenticationError('Error signing in');
        }

        //create and return the json web token
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    }
}