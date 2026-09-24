import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomSelect = ({
  options = [],
  value = "",
  onChange,
  name = "select",
  placeholder = "Select an option",
  icon: Icon,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) =>
    typeof opt === "object" ? opt.value === value : opt === value
  );

  const selectedLabel = selectedOption
    ? typeof selectedOption === "object"
      ? selectedOption.label
      : selectedOption
    : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (onChange) {
      onChange({ target: { name, value: val } });
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
          isOpen
            ? "border-blue-600 bg-white ring-4 ring-blue-500/10 shadow-md text-slate-900"
            : "border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-slate-300 text-slate-800"
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          {Icon && <Icon className="text-blue-600 text-base shrink-0" />}
          <span className={!value ? "text-slate-400 font-medium" : "text-slate-900 font-bold"}>
            {selectedLabel}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 max-h-60 overflow-y-auto rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-1.5 shadow-2xl shadow-slate-900/15 animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt, idx) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            const OptIcon = typeof opt === "object" ? opt.icon : null;
            const isSelected = val === value;

            return (
              <div
                key={idx}
                onClick={() => handleSelect(val)}
                className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {OptIcon && <OptIcon size={16} className={isSelected ? "text-white" : "text-slate-400"} />}
                  <span className="truncate">{label}</span>
                </div>
                {isSelected && <Check size={16} className="shrink-0" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
