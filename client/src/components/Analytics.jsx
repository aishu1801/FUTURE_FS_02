import React from "react";

function Analytics({ leads }) {

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const conversionRate =
    totalLeads === 0
      ? 0
      : Math.round(
          (convertedLeads / totalLeads) * 100
        );

  return (

    <div className="analytics-section">

      <div className="analytics-card">

        <h3>Total Leads</h3>

        <h1>{totalLeads}</h1>

      </div>

      <div className="analytics-card">

        <h3>New Leads</h3>

        <h1>{newLeads}</h1>

        <div className="progress-bar">

          <div
            className="progress-fill purple"
            style={{
              width: `${newLeads * 10}%`,
            }}
          ></div>

        </div>

      </div>

      <div className="analytics-card">

        <h3>Contacted</h3>

        <h1>{contactedLeads}</h1>

        <div className="progress-bar">

          <div
            className="progress-fill pink"
            style={{
              width: `${contactedLeads * 10}%`,
            }}
          ></div>

        </div>

      </div>

      <div className="analytics-card">

        <h3>Converted</h3>

        <h1>{convertedLeads}</h1>

        <div className="progress-bar">

          <div
            className="progress-fill dark"
            style={{
              width: `${conversionRate}%`,
            }}
          ></div>

        </div>

        <p>
          {conversionRate}% Conversion
        </p>

      </div>

    </div>
  );
}

export default Analytics;