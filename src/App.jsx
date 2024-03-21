import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuestionsProvider } from "./contexts/QuestionsContext";
import { JokesProvider } from "./contexts/JokesContext";

import Homepage from "./pages/Homepage";
import Trivia from "./pages/Trivia";
import Jokes from "./pages/Jokes";
import Facts from "./pages/Facts";

export default function App() {
  return (
    <QuestionsProvider>
      <JokesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="trivia" element={<Trivia />} />
            <Route path="jokes" element={<Jokes />} />
            <Route path="facts" element={<Facts />} />
          </Routes>
        </BrowserRouter>
      </JokesProvider>
    </QuestionsProvider>
  );
}
