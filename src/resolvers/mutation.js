module.exports = {
    newHero: async (parent, args, { models }) => {
        return await models.Hero.create({
            name: args.name,
            category: args.category,
            role: args.role
        });
    }
}