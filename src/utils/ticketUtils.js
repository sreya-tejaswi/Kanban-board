export const groupTickets = (tickets, users, groupBy) => {
    let groupedTickets = {};
  
    switch (groupBy) {
      case "status":
        groupedTickets = groupByStatus(tickets);
        break;
      case "user":
        groupedTickets = groupByUser(tickets, users);
        break;
      case "priority":
        groupedTickets = groupByPriority(tickets);
        break;
      default:
        groupedTickets = groupByStatus(tickets);
    }
  
    return groupedTickets;
  };
  
  const groupByStatus = (tickets) => {
    const fixedStatuses = ["Backlog", "To Do", "In Progress", "Done", "Cancelled"];
    const groups = fixedStatuses.reduce((acc, status) => {
      acc[status] = [];
      return acc;
    }, {});
  
    tickets.forEach((ticket) => {
      // Normalize the status to match fixed statuses
      const normalizedStatus = ticket.status ? ticket.status.trim().toLowerCase() : "backlog";
  
      // Map normalized statuses to fixed statuses
      const statusMap = {
        backlog: "Backlog",
        todo: "To Do",
        "in progress": "In Progress",
        done: "Done",
        cancelled: "Cancelled",
      };
  
      const status = statusMap[normalizedStatus] || "Backlog"; // Default to Backlog if status not recognized
      groups[status].push(ticket);
    });
  
    return groups;
  };
  
  
  const groupByUser = (tickets, users) => {
    const userMap = users.reduce((map, user) => {
      map[user.id] = user.name;
      return map;
    }, {});
  
    return tickets.reduce((groups, ticket) => {
      const user = userMap[ticket.userId] || "Unassigned";
      if (!groups[user]) {
        groups[user] = [];
      }
      groups[user].push(ticket);
      return groups;
    }, {});
  };
  
  const groupByPriority = (tickets) => {
    const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
  
    return tickets.reduce((groups, ticket) => {
      const priority = priorityLabels[ticket.priority] || "No priority";
      if (!groups[priority]) {
        groups[priority] = [];
      }
      groups[priority].push(ticket);
      return groups;
    }, {});
  };
  
  export const sortTickets = (tickets, sortBy) => {
    return [...tickets].sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };
  