import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = (props: { recipe: Recipe }) => {
  const { recipe } = props;
  return (
    <Link key={recipe.id + `${Math.random()}`} href={`/recipes/${recipe.path}`}>
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

export default RecipeCard;
