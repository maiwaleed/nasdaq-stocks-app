import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "../screens/SplashScreen"; // or ../modules/splash/SplashScreen
import ExploreScreen from "../screens/ExploreScreen"; // or ../modules/explore/ExploreScreen
import SelectedStockScreen from "../screens/SelectedStockScreen"; //or ../modules/stock/SelectedStockScreen

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />

      <Route path="/explore" element={<ExploreScreen />} />
      <Route path="/stock/:ticker" element={<SelectedStockScreen />} />
    </Routes>
  );
};

export default AppNavigator;
