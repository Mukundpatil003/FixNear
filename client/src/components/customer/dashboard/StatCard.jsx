import clsx from "clsx";

const StatCard = ({
  title,
  value,
  icon,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={clsx(
            "flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform hover:scale-105",
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