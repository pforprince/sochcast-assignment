import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EpisodesScreen from "../pages/episodesScreen/page";
import HomeScreen from "../pages/homeScreen/page";
import NotFoundScreen from "../pages/notFound/page";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<HomeScreen />} path="/" />
        <Route element={<EpisodesScreen />} path="/episodes/:slug" />
        <Route element={<NotFoundScreen />} path="*" />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
