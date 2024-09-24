import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

// Import SVG
import displayImage from './assets/Display.svg'; // Ensure the correct path
import downImage from './assets/down.svg'; // Ensure the correct path

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(() => {
    return localStorage.getItem("groupBy") || "status";
  });
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem("sortBy") || "priority";
  });
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Persist view state in localStorage
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="App">
      <div className="controls">
        {/* Display Dropdown */}
        <div className="display-dropdown">
          <div className="dropdown-trigger" onClick={toggleDropdown}>
            <img 
              src={displayImage} 
              alt="Display" 
              className="display-icon" 
            />
            <span>Display</span>
            <img 
              src={downImage} 
              alt="Display" 
              className="down-icon" 
            />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <div className="dropdown-row">
                <strong>Grouping:</strong>
                <div className="dropdown-select">
                <select value={groupBy} onChange={handleGroupByChange} className="dropdown-select">
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
                </div>
              </div>
              <div className="dropdown-row">
                <strong>Ordering:</strong>
                <div className="dropdown-select">
                <select value={sortBy} onChange={handleSortByChange} className="dropdown-select">
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
}

export default App;
