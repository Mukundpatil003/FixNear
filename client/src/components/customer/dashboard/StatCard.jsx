import clsx from "clsx";

const StatCard = ({
  title,
  value,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="rounded-[28px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-gray-500 text-lg">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-extrabold">
            {value}
          </h2>

        </div>

        <div
          className={clsx(
            "flex h-20 w-20 items-center justify-center rounded-3xl",
            bgColor,
            iconColor
          )}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;