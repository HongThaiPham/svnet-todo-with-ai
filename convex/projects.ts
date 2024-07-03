import { ConvexError, v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { handleUserId } from "./auth";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      throw new ConvexError("Unauthorized access");
    }
    const userProjects = await ctx.db
      .query("projects")
      .filter((q) =>
        q.or(q.eq(q.field("type"), "system"), q.eq(q.field("userId"), userId))
      )
      .collect();

    // const systemProjects = await ctx.db
    //   .query("projects")
    //   .filter((q) => q.eq(q.field("type"), "system"))
    //   .collect();

    // return [...systemProjects, ...userProjects];
    return userProjects;
  },
});

export const getById = query({
  args: {
    id: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      throw new ConvexError("Unauthorized access");
    }
    // const project = await ctx.db
    //   .query("projects")
    //   .filter((q) => q.eq(q.field("_id"), args.id))
    //   .collect();
    // return project?.[0] || null;
    return await ctx.db.get(args.id);
  },
});

export const createAProject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      const userId = await handleUserId(ctx);
      if (!userId) {
        throw new ConvexError("Unauthorized access");
      }
      const newTaskId = await ctx.db.insert("projects", {
        userId,
        name,
        type: "user",
      });
      return newTaskId;
    } catch (err) {
      console.log("Error occurred during createAProject mutation", err);

      return null;
    }
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const userId = await handleUserId(ctx);
      if (!userId) {
        throw new ConvexError("Unauthorized access");
      }
      const taskId = await ctx.db.delete(projectId);
      //query todos and map through them and delete

      return taskId;
    } catch (err) {
      console.log("Error occurred during deleteProject mutation", err);

      return null;
    }
  },
});

export const deleteProjectAndItsTasks = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const allTasks = await ctx.runQuery(api.todos.getTodosByProjectId, {
        projectId,
      });

      const promises = Promise.allSettled(
        allTasks.map(async (task: Doc<"todos">) =>
          ctx.runMutation(api.todos.deleteATodo, {
            taskId: task._id,
          })
        )
      );
      await promises;

      await ctx.runMutation(api.projects.deleteProject, {
        projectId,
      });
    } catch (err) {
      console.error("Error deleting tasks and projects", err);
    }
  },
});
