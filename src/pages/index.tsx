import { useUser } from "@clerk/nextjs";
import { Recipe } from "@prisma/client";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "~/components/Header";
import HtmlHead from "~/components/HtmlHead";
import RecipeCard from "~/components/RecipeCard";
import { api, RouterOutputs } from "~/utils/api";

// type Recipe = RouterOutputs["recipes"]["getAll"][number];

const Home: NextPage = () => {
  const { data: recipes } = api.recipes.getAll.useQuery();

  const user = useUser();
  return (
    <>
      <HtmlHead title="Home" />
      <main className="flex h-screen flex-col justify-start px-3 py-2">
        <Header />
        <div>
          <div className="mt-4 flex flex-wrap justify-around gap-3">
            {recipes &&
              recipes?.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
