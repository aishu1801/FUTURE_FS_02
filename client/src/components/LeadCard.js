import React from "react";

function LeadCard({
  lead,
  deleteLead,
  updateStatus,
}) {

  return (

    <tr>

      <td>{lead.name}</td>

      <td>{lead.email}</td>

      <td>{lead.source}</td>

      <td>

        <span
          className={`badge ${lead.status}`}
        >
          {lead.status}
        </span>

      </td>

      <td>
        {new Date().toLocaleDateString()}
      </td>

      <td>{lead.notes}</td>

      <td className="action-buttons">

        <select
          value={lead.status}
          onChange={(e) =>
            updateStatus(
              lead._id,
              e.target.value
            )
          }
        >

          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Converted">
            Converted
          </option>

        </select>

        <button
          className="delete-btn"
          onClick={() =>
            deleteLead(lead._id)
          }
        >
          Delete
        </button>

      </td>

    </tr>
  );
}

export default LeadCard;