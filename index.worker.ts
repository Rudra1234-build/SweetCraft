import { Hono } from "hono";
import { z } from "zod";

type Bindings = {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// Review schema
const reviewSchema = z.object({
  recipe_id: z.string(),
  author_name: z.string().min(1).max(50),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(500),
});

// Get reviews for a recipe
app.get("/api/reviews/:recipeId", async (c) => {
  const recipeId = c.req.param("recipeId");
  
  const reviews = await c.env.DB.prepare(
    "SELECT * FROM reviews WHERE recipe_id = ? ORDER BY created_at DESC"
  )
    .bind(recipeId)
    .all();

  return c.json(reviews.results);
});

// Get average rating for a recipe
app.get("/api/reviews/:recipeId/average", async (c) => {
  const recipeId = c.req.param("recipeId");
  
  const result = await c.env.DB.prepare(
    "SELECT AVG(rating) as average, COUNT(*) as count FROM reviews WHERE recipe_id = ?"
  )
    .bind(recipeId)
    .first();

  return c.json({
    average: result?.average || 0,
    count: result?.count || 0,
  });
});

// Submit a review
app.post("/api/reviews", async (c) => {
  try {
    const body = await c.req.json();
    const data = reviewSchema.parse(body);

    await c.env.DB.prepare(
      "INSERT INTO reviews (recipe_id, author_name, rating, comment) VALUES (?, ?, ?, ?)"
    )
      .bind(data.recipe_id, data.author_name, data.rating, data.comment)
      .run();

    return c.json({ success: true }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid input", details: error.errors }, 400);
    }
    return c.json({ error: "Failed to submit review" }, 500);
  }
});

export default app;
