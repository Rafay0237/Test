import { Check } from "lucide-react";

export default function CheckboxButton({ isChecked, onClick }: { isChecked: boolean; onClick: () => void }) {
    return (
      <button
        type="button"
        className={`w-5 h-5 rounded flex items-center justify-center border ${
          isChecked ? "bg-blue-500 text-white" : "border-[#CDCDCD] bg-white"
        }`}
        onClick={onClick}
        aria-checked={isChecked}
        role="checkbox"
      >
        {isChecked && <Check className="w-3.5 h-3.5" />}
      </button>
    );
  }
