const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
const { Mongoose } = require('mongoose');
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
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        if(!user){
            throw new AuthenticationError();
        }

        //check to see if the user has already favorited the note
        let heroCheck = await models.Hero.findById(id);
        const hasUser = heroCheck.favoritedBy.indexOf(user.id);

        //if the user exists in the list
        //pull them from the list and reduce the favoriteCount by 1
        if(hasUser >= 0){
            return await models.Hero.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.objectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    //set new to true to return the updated doc
                    new: true
                }
            )
        }else{
            //if the user doesn't exist in the list
            //add them to the list and increment the favoriteCount by 1
            return await models.Hero.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.objectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            );
        }
    }
}