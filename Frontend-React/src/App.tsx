import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import BookPage from "./pages/BookPage.tsx";
import ReaderPage from "./pages/ReaderPage.tsx";
import LendBookPage from "./pages/LendBookPage.tsx";
import ReturnBookPage from "./pages/ReturnBookPage.tsx";
import LendingHistoryPage from "./pages/LendingHistoryPage.tsx";
import OverdueBooksPage from "./pages/OverdueBooksPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Future protected route */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/books" element={<BookPage />} />
                <Route path="/readers" element={<ReaderPage />} />
                <Route path="/lending/lend" element={<LendBookPage />} />
                <Route path="/lending/return" element={<ReturnBookPage />} />
                <Route path="/lending/history" element={<LendingHistoryPage />} />
                <Route path="/lending/overdue" element={<OverdueBooksPage />} />
            </Routes>
        </Router>
    );
}

export default App;
