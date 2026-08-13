import { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  recipeId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ recipeId, onReviewSubmitted }: ReviewFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipe_id: recipeId,
          author_name: authorName,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setAuthorName('');
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Review</h3>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            maxLength={50}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoveredRating(value)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    value <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            maxLength={500}
            rows={4}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all resize-none"
            placeholder="Share your experience with this recipe..."
          />
          <div className="text-xs text-gray-500 mt-1">
            {comment.length}/500 characters
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !rating}
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
