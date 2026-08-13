import { useEffect, useState } from 'react';

interface RatingData {
  average: number;
  count: number;
}

export function useRecipeRating(recipeId: string) {
  const [rating, setRating] = useState<RatingData>({ average: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/reviews/${recipeId}/average`);
        const data = await response.json();
        setRating(data);
      } catch (error) {
        console.error('Failed to fetch rating:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRating();
  }, [recipeId]);

  return { rating, isLoading };
}
