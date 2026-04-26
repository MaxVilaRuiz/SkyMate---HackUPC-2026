type TripType = "round_trip" | "one_way";

type TripTypeSelectorProps = {
  value: TripType;
  onChange: (value: TripType) => void;
};

export function TripTypeSelector({ value, onChange }: TripTypeSelectorProps) {
  return (
    <div>
      <span className="mb-2 block text-xs font-semibold text-slate-500">
        Trip type *
      </span>

      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "round_trip", label: "Round trip" },
          { id: "one_way", label: "One way" },
        ].map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id as TripType)}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              value === option.id
                ? "border-[#0770E3] bg-[#EAF6FF] text-[#0770E3]"
                : "border-sky-100 bg-sky-50 text-slate-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}