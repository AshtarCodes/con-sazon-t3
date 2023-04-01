import {
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import { Recipe } from "@prisma/client";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "~/components/Header";
import HtmlHead from "~/components/HtmlHead";

import { api, RouterOutputs } from "~/utils/api";

// type Recipe = RouterOutputs["recipes"]["getAll"][number];
const RecipeCard = (props: { recipe: Recipe }) => {
  const { recipe } = props;
  return (
    <Link key={recipe.id + `${Math.random()}`} href={`/recipe/${recipe.path}`}>
      <article className="grid w-52 grid-rows-2">
        <div className="row-span-2">
          <Image
            src={recipe.image!}
            alt="The recipe image"
            className="rounded-t-md bg-cover"
            width={208}
            height={260}
          />
        </div>
        <div className="rounded-b-md bg-black p-2 text-slate-200">
          <h3>{recipe.recipeName}</h3>
          <h4 className="text-xs text-teal-600">by {recipe.author}</h4>
        </div>
      </article>
    </Link>
  );
};

const Home: NextPage = () => {
  const { data: recipes } = api.recipes.getAll.useQuery();

  const user = useUser();
  return (
    <>
      <HtmlHead />
      <main className="flex h-screen flex-col justify-start px-3 py-2">
        <Header />
        <div>
          <div className="mt-4 flex flex-wrap justify-around gap-3">
            {recipes &&
              recipes?.map((recipe) => <RecipeCard recipe={recipe} />)}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
