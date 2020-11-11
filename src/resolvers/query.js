module.exports = {
    
        heroes: async (parent, args, { models }) => {
            return await models.Hero.find();
        },
        hero: async (parent, args, { models }) => {
            return await models.Hero.findById(args.id);
        }
    
}