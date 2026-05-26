import Analytics from "./components/Analytics";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import LeadCard from "./components/LeadCard";

function App() {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    notes: "",
  });

  const fetchLeads = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/leads"
      );

      setLeads(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchLeads();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addLead = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/addLead",
        formData
      );

      fetchLeads();

      setFormData({
        name: "",
        email: "",
        source: "",
        notes: "",
      });

    } catch (error) {

      console.log(error);

    }
  };

  const deleteLead = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/deleteLead/${id}`
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/updateLead/${id}`,
        { status }
      );

      fetchLeads();

    } catch (error) {

      console.log(error);

    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="dashboard">

      <div className="top-nav">

        <div className="nav-logo">
          Mini CRM
        </div>

        <div className="nav-links">

          <span className="active-link">
            Dashboard
          </span>

          <span>Leads</span>

          <span>Analytics</span>

          <span>Reports</span>

          <span>Settings</span>

        </div>

      </div>

      <div className="main">

        <Navbar />

        <StatsCards leads={leads} />
        <Analytics leads={leads} />

        <div className="form-container">

          <form
            onSubmit={addLead}
            className="lead-form"
          >

            <h2>Add New Lead</h2>

            <div className="input-group">

              <label>
                Client Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter client name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>
                Client Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter client email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>
                Lead Source
              </label>

              <input
                type="text"
                name="source"
                placeholder="Instagram / LinkedIn / Website"
                value={formData.source}
                onChange={handleChange}
                required
              />

            </div>

            <div className="input-group">

              <label>
                Client Notes
              </label>

              <textarea
                name="notes"
                placeholder="Add lead details..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>

            </div>

            <div className="button-row">

              <button type="submit">
                + Add Lead
              </button>

            </div>

          </form>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search Leads..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="table-container">

          <h2 className="table-title">
            Lead Details
          </h2>

          <table className="crm-table">

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Source</th>

                <th>Status</th>

                <th>Date</th>

                <th>Notes</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredLeads.map((lead) => (

                <LeadCard
                  key={lead._id}
                  lead={lead}
                  deleteLead={deleteLead}
                  updateStatus={updateStatus}
                />

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default App;