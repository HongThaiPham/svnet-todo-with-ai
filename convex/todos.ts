import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { handleUserId } from "./auth";
import { redirect } from "next/navigation";
import { api } from "./_generated/api";
export const get = query({
  args: {
    parentId: v.union(v.id("todos"), v.null()),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      redirect("/");
    }
    if (args.parentId) {
      return await ctx.db
        .query("todos")
        .filter((q) =>
          q.and(
            q.eq(q.field("userId"), userId),
            q.eq(q.field("parentId"), args.parentId)
          )
        )
        .collect();
    } else {
      return await ctx.db.query("todos").collect();
    }
  },
});

export const getCompleted = query({
  args: {
    parentId: v.union(v.id("todos"), v.null()),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      redirect("/");
    }
    return await ctx.db
      .query("todos")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("parentId"), args.parentId),
          q.eq(q.field("isCompleted"), true)
        )
      )
      .collect();
  },
});

export const getIncomplete = query({
  args: {
    parentId: v.union(v.id("todos"), v.null()),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      redirect("/");
    }
    return await ctx.db
      .query("todos")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("parentId"), args.parentId),
          q.eq(q.field("isCompleted"), false)
        )
      )
      .collect();
  },
});

export const totalTodos = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      redirect("/");
    }
    const todos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    return todos.length || 0;
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      redirect("/");
    }

    const todos = await ctx.db
      .query("todos")
      .filter((q) =>
        q.and(q.eq(q.field("userId"), userId), q.eq(q.field("_id"), args.id))
      )
      .collect();

    if (todos.length === 0) {
      throw new ConvexError("You are not authorized to update this todo");
    }

    const newTodoId = await ctx.db.patch(args.id, {
      isCompleted: args.isCompleted,
    });
    return newTodoId;
  },
});

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    embedding: v.optional(v.array(v.float64())),
    parentId: v.union(v.id("todos"), v.null()),
  },
  handler: async (
    ctx,
    {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      embedding,
      parentId,
    }
  ) => {
    try {
      const userId = await handleUserId(ctx);

      if (!userId) {
        redirect("/");
      }
      if (userId) {
        const newTaskId = await ctx.db.insert("todos", {
          userId,
          taskName,
          description,
          priority,
          dueDate,
          projectId,
          labelId,
          isCompleted: false,
          embedding,
          parentId: parentId ?? null,
        });
        return newTaskId;
      }

      return null;
    } catch (err) {
      console.log("Error occurred during create a todo mutation", err);

      return null;
    }
  },
});

export const createTodoAndEmbeddings = action({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.union(v.id("todos"), v.null()),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, parentId }
  ) => {
    const embedding = [1, 2, 3]; //await getEmbeddingsWithAI(taskName);
    await ctx.runMutation(api.todos.createATodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      embedding,
      parentId: parentId ?? null,
    });
  },
});
