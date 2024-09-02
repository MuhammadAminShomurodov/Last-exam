import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import ViewPage from "./pages/ViewPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
