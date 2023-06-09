import { GraphQLError } from "graphql";
export const resolvers = {
    Mutation: {
        removeTodo: async (_, { removeTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: removeTodoInput.todoId,
                },
            });
            if (!existingTodo) {
                // TODO: handle an error
                throw new GraphQLError("Not found");
            }
            await prismaClient.todo.delete({
                where: {
                    id: existingTodo.id,
                },
            });
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
