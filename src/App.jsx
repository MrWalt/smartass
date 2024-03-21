import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import { JokesProvider } from "./contexts/JokesContext";

import Homepage from "./pages/Homepage";
import Trivia from "./pages/Trivia";
import Jokes from "./pages/Jokes";
import Advice from "./pages/Advice";

export default function App() {
  return (
    <QuestionsProvider>
      <JokesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="trivia" element={<Trivia />} />
            <Route path="jokes" element={<Jokes />} />
            <Route path="advice" element={<Advice />} />
          </Routes>
        </BrowserRouter>
      </JokesProvider>
    </QuestionsProvider>
  );
}
