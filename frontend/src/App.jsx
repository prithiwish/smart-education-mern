import { Routes, Route, Navigate } from "react-router-dom";
// user components
import Login from "./userComponent/Login";
import Signup from "./userComponent/Signup";
import Profile from "./userComponent/Profile";
import About from "./userComponent/About";
import Game from "./userComponent/Game";
import History from "./userComponent/History";
import Writenote from "./userComponent/Writenote";
import Account from "./userComponent/Account";
// Front Page
import FrontPage from "./FrontViews/FrontPage";
import Explore from "./FrontViews/Explore";
// admin components
import AdminDashbord from "./adminComponent/AdminDashbord";
import AdminAccount from "./adminComponent/AdminAccount";
import Videos from "./adminComponent/Videos";

// game components
import Quiz from "./game/QuizGame";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="/FrontPage" element={<FrontPage />} />
      <Route path="/Explore" element={<Explore />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashbord />
          </ProtectedRoute>
        }
      >
        <Route path="account" element={<AdminAccount />} />
        <Route path="videos" element={<Videos />} />
      </Route>

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRole="user">
            <Profile />
          </ProtectedRoute>
        }
      >
        <Route path="about" element={<About />} />
        <Route path="game" element={<Game />}>
          <Route path="quiz" element={<Quiz />} />
        </Route>
        <Route path="history" element={<History />} />
        <Route path="writenote" element={<Writenote />} />
        <Route path="personal" element={<Account />} />
      </Route>

      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;
