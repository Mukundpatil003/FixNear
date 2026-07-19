import {
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

const steps = [
  "Pending",
  "Accepted",
  "On The Way",
  "Working",
  "Completed",
];

const Timeline = ({ status }) => {

  const activeIndex = steps.indexOf(status);

  return (

    <div className="space-y-5">

      {steps.map((step, index) => (

        <div
          key={step}
          className="flex items-center gap-4"
        >

          {index <= activeIndex ? (

            <FaCheckCircle
              className="text-green-500"
              size={20}
            />

          ) : (

            <FaCircle
              className="text-gray-300"
              size={18}
            />

          )}

          <p
            className={
              index <= activeIndex
                ? "font-semibold"
                : "text-gray-400"
            }
          >
            {step}
          </p>

        </div>

      ))}

    </div>

  );
};

export default Timeline;