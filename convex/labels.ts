import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { handleUserId } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      throw new ConvexError("Unauthorized access");
    }
    const userLabels = await ctx.db
      .query("labels")
      .filter((q) =>
        q.or(q.eq(q.field("type"), "system"), q.eq(q.field("userId"), userId))
      )
      .collect();

    // const systemLabels = await ctx.db.query("labels").collect();

    // return [...systemLabels, ...userLabels];
    return userLabels;
  },
});

export const getById = query({
  args: {
    id: v.id("labels"),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (!userId) {
      throw new ConvexError("Unauthorized access");
    }
    return await ctx.db.get(args.id);
  },
});

export const createALabel = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      const userId = await handleUserId(ctx);
      if (!userId) {
        throw new ConvexError("Unauthorized access");
      }
      const newTaskId = await ctx.db.insert("labels", {
        userId,
        name,
        type: "user",
      });
      return newTaskId;
    } catch (err) {
      console.log("Error occurred during createALabel mutation", err);

      return null;
    }
  },
});
