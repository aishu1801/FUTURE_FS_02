import React from "react";

function StatsCards({ leads }) {

  const contacted =
    leads.filter(
      (lead) =>
        lead.status === "Contacted"
    ).length;

  const converted =
    leads.filter(
      (lead) =>
        lead.status === "Converted"
    ).length;

  return (

    <div className="stats-grid">

      <div className="stat-card">

        <h2>{leads.length}</h2>

        <p>Total Leads</p>

      </div>

      <div className="stat-card blue-card">

        <h2>{contacted}</h2>

        <p>Contacted</p>

      </div>

      <div className="stat-card green-card">

        <h2>{converted}</h2>

        <p>Converted</p>

      </div>

    </div>
  );
}

export default StatsCards;