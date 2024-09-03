import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import ViewPage from "./pages/ViewPage";
import { CurrencyProvider } from "./context/CurrencyContext"; // Adjust the path as needed

const App = () => {
  return (
    <CurrencyProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </Router>
    </CurrencyProvider>
  );
};

export default App;
