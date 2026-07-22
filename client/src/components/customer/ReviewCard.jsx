import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const StarRating = ({
  rating = 0,
  editable = false,
  onChange,
  size = 28,
}) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= rating;

        return (
          <motion.button
            key={star}
            type="button"
            whileHover={editable ? { scale: 1.25 } : {}}
            whileTap={editable ? { scale: 0.9 } : {}}
            onClick={() => editable && onChange(star)}
            className={`transition-colors duration-300 ${
              editable ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <FiStar
              size={size}
              fill={active ? "#FBBF24" : "transparent"}
              color={active ? "#FBBF24" : "#CBD5E1"}
              strokeWidth={2}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;