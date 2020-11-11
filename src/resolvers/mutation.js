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
    }
}