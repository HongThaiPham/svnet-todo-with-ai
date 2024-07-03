import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { handleUserId } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      const userLabels = await ctx.db
        .query("labels")
        .filter((q) =>
          q.or(q.eq(q.field("type"), "system"), q.eq(q.field("userId"), userId))
        )
        .collect();

      // const systemLabels = await ctx.db.query("labels").collect();

      // return [...systemLabels, ...userLabels];
      return userLabels;
    }
    return [];
  },
});

export const getById = query({
  args: {
    id: v.id("labels"),
  },
  handler: async (ctx, args) => {
    const userId = await handleUserId(ctx);
    if (userId) {
      return await ctx.db.get(args.id);
    }
    return null;
  },
});
