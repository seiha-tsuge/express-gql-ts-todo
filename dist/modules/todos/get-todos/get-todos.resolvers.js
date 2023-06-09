export const resolvers = {
    Query: {
        getTodos: async (_, args, { prismaClient }, info) => {
            const todos = await prismaClient.todo.findMany();
            return {
                todos,
            };
        },
    },
};
