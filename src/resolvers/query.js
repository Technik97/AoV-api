module.exports = {
    
        heroes: async () => {
            return await models.Hero.find();
        },
        hero: async (parent, args) => {
            return await models.Hero.findById(args.id);
        }
    
}