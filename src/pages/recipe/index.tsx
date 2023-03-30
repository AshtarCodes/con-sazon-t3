import { Recipe } from "@prisma/client";

const RecipeCard = (props: { recipe: Recipe }) => {
    const { recipe } = props;
    return (
      <article key={recipe.id} className="m-4 grid grid-rows-2 w-48">
        <div className="row-span-2">
          <img src={recipe.image!} alt="The recipe image" className="bg-cover  rounded-t-md" />
        </div>
        <div className="bg-black text-slate-200 rounded-b-md">
          <h3>{recipe.recipeName}</h3>
          <h4 className="text-xs">by {recipe.author}</h4>
        </div>
      </article>
    );
  };
  
export default RecipeCard;