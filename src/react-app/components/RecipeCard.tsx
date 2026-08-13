import { Clock, Users, ChefHat, Star } from 'lucide-react';
import { Recipe } from '@/data/recipes';
import { Link } from 'react-router';
import { useRecipeRating } from '@/react-app/hooks/useRecipeRating';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const { rating } = useRecipeRating(recipe.id);
  
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              recipe.difficulty === 'Easy' 
                ? 'bg-green-500/90 text-white' 
                : recipe.difficulty === 'Medium'
                ? 'bg-amber-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-2">
            <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
              {recipe.category}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
            {recipe.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          {rating.count > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-4 h-4 ${
                      value <= Math.round(rating.average)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {rating.average.toFixed(1)} ({rating.count})
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{totalTime}m</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.ingredients.length} items</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
