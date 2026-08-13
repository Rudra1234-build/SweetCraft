import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Clock, Users, ChefHat, Lightbulb, Star } from 'lucide-react';
import { recipes } from '@/data/recipes';
import Header from '@/react-app/components/Header';
import ReviewForm from '@/react-app/components/ReviewForm';
import ReviewList from '@/react-app/components/ReviewList';
import { useRecipeRating } from '@/react-app/hooks/useRecipeRating';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === id);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { rating } = useRecipeRating(id || '');

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h1>
          <Link to="/" className="text-pink-600 hover:text-pink-700">
            Return to recipes
          </Link>
        </div>
      </div>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to recipes
        </Link>

        {/* Hero Image */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            loading="eager"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-600 text-white mb-3">
              {recipe.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {recipe.title}
            </h1>
            <p className="text-white/90 text-lg mb-3">
              {recipe.description}
            </p>
            {rating.count > 0 && (
              <div className="flex items-center gap-2 text-white">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-5 h-5 ${
                        value <= Math.round(rating.average)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-white/40'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">
                  {rating.average.toFixed(1)} ({rating.count} {rating.count === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Recipe Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <Clock className="w-8 h-8 mx-auto mb-2 text-pink-600" />
            <div className="text-2xl font-bold text-gray-900">{totalTime}m</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-gray-900">{recipe.servings}</div>
            <div className="text-sm text-gray-600">Servings</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <ChefHat className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-gray-900">{recipe.difficulty}</div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{recipe.ingredients.length}</div>
            <div className="text-sm text-gray-600">Ingredients</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-pink-600 to-purple-600 rounded-full"></span>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                  </div>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></span>
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 shadow-sm border-2 border-amber-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-600" />
              Pro Tips
            </h2>
            <ul className="space-y-3">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <ReviewForm 
            recipeId={recipe.id} 
            onReviewSubmitted={() => setRefreshTrigger(prev => prev + 1)}
          />
          <ReviewList 
            recipeId={recipe.id} 
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
}
