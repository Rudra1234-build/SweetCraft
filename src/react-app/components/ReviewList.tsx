import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  recipe_id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewListProps {
  recipeId: string;
  refreshTrigger: number;
}

export default function ReviewList({ recipeId, refreshTrigger }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/reviews/${recipeId}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [recipeId, refreshTrigger]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="text-center text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
        <p className="text-gray-500">No reviews yet. Be the first to review this recipe!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Reviews ({reviews.length})
      </h3>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-gray-900">{review.author_name}</div>
                <div className="text-sm text-gray-500">{formatDate(review.created_at)}</div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-4 h-4 ${
                      value <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
