import React from "react";
import SuperChart from "../../SuperChart";
import SuperChartProvider from "../../../contexts/superChartContext";


const AppContent: React.FC = () => {
  return (
    <div className="app-content">

      <SuperChartProvider>
        <SuperChart/>
      </SuperChartProvider>
    </div>
  );
}

export default AppContent;