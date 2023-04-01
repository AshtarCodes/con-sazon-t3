import { Prisma } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { api } from "~/utils/api";

const SingleRecipe: NextPage = () => {
  const router = useRouter();
  const { recipe_name } = router.query;
  if (typeof recipe_name !== "string") {
    console.log(recipe_name);
    return null;
  }

  const { data: recipe, isLoading } = api.recipes.getSingle.useQuery({
    text: recipe_name,
  });
  if (isLoading) return <p>Loading...</p>;
  else if (!recipe)
    return <div className="text-center">Woops, something went wrong!</div>;

  const tags = recipe.specialDiet?.split(/[,"]{1}/s) || [];
  recipe.recipeType
    ?.split(/[,"]{1}/)
    .forEach((c) => tags.push(c.replaceAll(/-/g, "‑")));
  const ingredients = recipe.ingredients as Prisma.JsonObject[];
  return (
    <>
      <main className="px-3 py-2">
        <Header></Header>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="">
            <Image
              src={recipe.image}
              alt="#"
              height={480}
              width={384}
              className=" bg-cover "
            />
          </div>
          <div className="">
            <h1>{recipe.recipeName}</h1>
            <h2>by {recipe.author}</h2>
            <div className="flex justify-around">
              <button className=" rounded-xl bg-teal-400 px-3 py-1.5">
                See Original
              </button>
              <button className=" rounded-xl bg-teal-400 px-3 py-1.5">
                Back to all recipes
              </button>
            </div>
            <div>
              {recipe.cuisine && <p>Cuisine: {recipe.cuisine}</p>}
              {recipe.allergens && <p>Allergens: {recipe.allergens}</p>}
              {tags && (
                <>
                  <p>Tags:</p>
                  <div className="flex flex-wrap justify-start gap-2">
                    {tags.map((tag) => (
                      <span className=" inline-block rounded bg-emerald-600 px-1 text-white">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <section>
            <h3>Ingredients</h3>
            {ingredients.map((item) => {
              if (typeof item.ingredientRaw === "string") {
                return <p>{item.ingredientRaw}</p>;
              }
            })}
          </section>
          <section>
            <h3>Instructions</h3>
            {recipe.instructions.map((str) => {
              return <p>{str}</p>;
            })}
          </section>
        </section>
      </main>
    </>
  );
};

export default SingleRecipe;
