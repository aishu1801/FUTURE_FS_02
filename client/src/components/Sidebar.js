import React from "react";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        Mini CRM
      </h2>

      <ul className="menu">

        <li>🏠 Dashboard</li>

        <li>👥 Leads</li>

        <li>📈 Analytics</li>

        <li>📊 Reports</li>

        <li>⚙ Settings</li>

      </ul>

    </div>
  );
}

export default Sidebar;