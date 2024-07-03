import { query } from "./_generated/server";
import { handleUserId } from "./auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await handleUserId(ctx);
    if (userId) {
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
    }
    return [];
  },
});
