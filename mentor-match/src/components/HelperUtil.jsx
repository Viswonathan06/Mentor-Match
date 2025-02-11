const HelperUtil = () => {
    // Function to generate random colors for mentor cards
 const getRandomColor = () => {
    const colors = [
      "#FFCDD2",
      "#C8E6C9",
      "#BBDEFB",
      "#FFE0B2",
      "#D1C4E9",
      "#B2EBF2",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to get color based on session status
 const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#d4edda"; // Green
      case "upcoming":
        return "#cce5ff"; // Blue
      case "cancelled":
        return "#f8d7da"; // Red
      default:
        return "#ffffff"; // Default white
    }
  };

};

export default HelperUtil;