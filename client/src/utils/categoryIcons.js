import {
  FaBolt,
  FaWrench,
  FaHammer,
  FaPaintRoller,
  FaCar,
  FaBroom,
  FaSnowflake,
  FaCut,
  FaTools,
} from "react-icons/fa";

const categoryIcons = {
  Electrician: FaBolt,
  Plumber: FaWrench,
  Carpenter: FaHammer,
  Painter: FaPaintRoller,
  Mechanic: FaCar,
  Cleaner: FaBroom,
  "AC Repair": FaSnowflake,
  Salon: FaCut,
};

export const getCategoryIcon = (categoryName) => {
  return categoryIcons[categoryName] || FaTools;
};

export default categoryIcons;