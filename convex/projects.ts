import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { handleUserId } from "./auth";

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
