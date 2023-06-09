import { GraphQLError } from "graphql";
export const resolvers = {
    Query: {
        getTodo: async (_, { getTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: getTodoInput.todoId,
                },
            });
            if (!existingTodo) {
                // TODO: handle an error
                throw new GraphQLError("Not found");
            }
            return {
                todo: {
                    ...existingTodo,
                    updatedAt: existingTodo.updatedAt,
                    createdAt: existingTodo.createdAt,
                },
            };
        },
    },
};
