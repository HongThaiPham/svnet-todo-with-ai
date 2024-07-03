import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const get = query({
  args: {
    parentId: v.optional(v.id("todos")),
  },
  handler: async (ctx, args) => {
    if (args.parentId) {
      return await ctx.db
        .query("todos")
        .filter((q) => q.eq(q.field("parentId"), args.parentId))
        .collect();
    } else {
      return await ctx.db.query("todos").collect();
    }
  },
});

export const getCompleted = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();
  },
});

export const getIncomplete = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx, args) => {
    const todos = await ctx.db.query("todos").collect();
    return todos.length || 0;
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const newTodoId = await ctx.db.patch(args.id, {
      isCompleted: args.isCompleted,
    });
    return newTodoId;
  },
});
