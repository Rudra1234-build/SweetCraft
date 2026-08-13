import { BrowserRouter as Router, Routes, Route } from "react-router";
import RecipeList from "@/react-app/pages/RecipeList";
import RecipeDetail from "@/react-app/pages/RecipeDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}
