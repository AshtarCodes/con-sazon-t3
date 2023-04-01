import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const recipesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),
  getSingle: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const theRecipe = await ctx.prisma.recipe.findFirst({
          where: {
            path: input.text,
          },
        });
        if (theRecipe) {
          const ingredients = theRecipe?.ingredients as Prisma.JsonObject[];
          theRecipe.ingredients = ingredients;
          return theRecipe;
        }
        return null;
      } catch (error) {
        console.error(error);
      }
    }),
});
