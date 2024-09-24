import React from "react";
import "./UserAvatar.css";

// Function to get initials from the user's name
const getInitials = (name) => {
  const nameParts = name.split(" ");
  return nameParts.length === 1
    ? nameParts[0].charAt(0).toUpperCase()
    : nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
};

// Function to get a random background color for the avatar
const getRandomColor = (name) => {
  // Convert the name to a hash to generate a consistent color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate an RGB color from the hash
  const color = `hsl(${hash % 360}, 70%, 80%)`;
  return color;
};

const UserAvatar = ({ name, available }) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(name);

  return (
    <div className="user-avatar" style={{ backgroundColor }}>
      <span className="initials">{initials}</span>
      <span className={`status-indicator ${available ? 'available' : 'unavailable'}`} />
    </div>
  );
};

export default UserAvatar;
