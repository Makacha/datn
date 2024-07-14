import React from "react";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";

const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">

      <AppContent/>
    </div>
  );
}

export default AppLayout;