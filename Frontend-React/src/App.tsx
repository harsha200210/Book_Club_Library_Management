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
import ProfilePage from "./pages/ProfilePage.tsx";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            {/* Toast container should be outside Routes but inside Router */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/books" element={<BookPage />} />
                <Route path="/readers" element={<ReaderPage />} />
                <Route path="/lending/lend" element={<LendBookPage />} />
                <Route path="/lending/return" element={<ReturnBookPage />} />
                <Route path="/lending/history" element={<LendingHistoryPage />} />
                <Route path="/lending/overdue" element={<OverdueBooksPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
