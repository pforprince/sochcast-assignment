import {} from "react-router-dom";
import "./App.css";
import AppRoutes from "./utils/routes";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
