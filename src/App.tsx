import "./App.css";

import AppNavigator from "./navigation/AppNavigator";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppNavigator />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
