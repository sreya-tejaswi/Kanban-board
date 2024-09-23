import React from "react";
import "./KanbanBoard.css";
import { groupTickets, sortTickets } from "../utils/ticketUtils";

// Import SVGs
import userProfileImage from '../assets/user-profile.png'; // Placeholder user profile image
import backlogImage from '../assets/Backlog.svg';
import doneImage from '../assets/Done.svg';
import inProgressImage from '../assets/in-progress.svg';
import cancelledImage from '../assets/Cancelled.svg';
import todoImage from '../assets/To-do.svg';
import noPriorityImage from '../assets/No-priority.svg';
import lowPriorityImage from '../assets/Img - Low Priority.svg';
import mediumPriorityImage from '../assets/Img - Medium Priority.svg';
import highPriorityImage from '../assets/Img - High Priority.svg';
import urgentPriorityImage from '../assets/SVG - Urgent Priority colour.svg';
import addImage from '../assets/add.svg'; // Add icon
import menuImage from '../assets/3 dot menu.svg'; // Menu icon

// Map for status images
const statusImages = {
  "Backlog": backlogImage,
  "To Do": todoImage,
  "In Progress": inProgressImage,
  "Done": doneImage,
  "Cancelled": cancelledImage,
};

// Map for priority images
const priorityImages = {
  0: noPriorityImage,
  1: lowPriorityImage,
  2: mediumPriorityImage,
  3: highPriorityImage,
  4: urgentPriorityImage,
};

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  const groupedTickets = groupTickets(tickets, users, groupBy);
  const sortedTickets = {};

  Object.keys(groupedTickets).forEach((group) => {
    sortedTickets[group] = sortTickets(groupedTickets[group], sortBy);
  });

  return (
    <div className="kanban-board">
      {/* Render columns based on grouping */}
      {Object.keys(sortedTickets).map((group) => (
        <div key={group} className="kanban-column">
          {/* Header with corresponding image and action icons */}
          <div className="column-header">
            {groupBy === "status" && (
              <img src={statusImages[group]} alt={group} className="header-icon" />
            )}
            {groupBy === "priority" && (
              <img src={priorityImages[getPriorityKey(group)]} alt={group} className="header-icon" />
            )}
            {groupBy === "user" && (
              <img src={userProfileImage} alt="User" className="header-icon" />
            )}
            <h3>{group}</h3>
            {/* Ticket count */}
            <span className="ticket-count">{sortedTickets[group].length}</span>
            {/* Add and menu icons */}
            <div className="header-icons">
              <img src={addImage} alt="Add" className="header-action-icon" />
              <img src={menuImage} alt="Menu" className="header-action-icon" />
            </div>
          </div>
          {sortedTickets[group].map((ticket) => (
            <div key={ticket.id} className="kanban-ticket">
              {/* Row 1: Ticket ID and User Profile Image */}
              <div className="ticket-row">
                <span className="ticket-id">{ticket.id}</span>
                {groupBy !== "user" && (
                  <img src={userProfileImage} alt="User" className="user-profile" />
                )}
              </div>

              {/* Row 2: Status Image and Title */}
              <h3>
              <div className="ticket-row">
                {groupBy !== "status" && (
                  <img 
                    src={getStatusImage(ticket.status)} 
                    alt={ticket.status} 
                    className="status-icon" 
                  />
                )}
                <span className="ticket-title">{ticket.title}</span>
              </div>
              </h3>

              {/* Row 3: Priority Image and Tags */}
              <div className="ticket-row">
                {groupBy !== "priority" && (
                  <img 
                    src={getPriorityImage(ticket.priority)} 
                    alt={getPriorityLabel(ticket.priority)} 
                    className="priority-icon" 
                  />
                )}
                <span className="ticket-tag">{ticket.tag.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Function to get the priority key from the group name
const getPriorityKey = (group) => {
  const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
  return priorityLabels.indexOf(group);
};

// Enhanced getStatusImage function
const getStatusImage = (status) => {
  const fixedStatuses = ["Backlog", "To Do", "In Progress", "Done", "Cancelled"];
  const normalizedStatus = status ? status.trim().toLowerCase() : "backlog";

  const statusMap = {
    backlog: "Backlog",
    todo: "To Do",
    "in progress": "In Progress",
    done: "Done",
    cancelled: "Cancelled",
  };

  const mappedStatus = statusMap[normalizedStatus] || "Backlog"; // Default to Backlog if not recognized
  return statusImages[mappedStatus] || backlogImage; // Default to backlog image if not found
};

const getPriorityImage = (priority) => {
  return priorityImages[priority] || noPriorityImage; // Default to no priority image if not found
};

const getPriorityLabel = (priority) => {
  const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
  return priorityLabels[priority] || "No priority"; // Default to no priority if not found
};

export default KanbanBoard;
