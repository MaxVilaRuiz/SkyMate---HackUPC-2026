type NumberFieldProps = {
    label: string;
    value: string;
    min?: number;
    max?: number;
    placeholder?: string;
    required?: boolean;
    onChange: (value: string) => void;
  };
  
  export function NumberField({
    label,
    value,
    min,
    max,
    placeholder,
    required = false,
    onChange,
  }: NumberFieldProps) {
    return (
      <label className="space-y-1">
        <span className="text-xs font-semibold text-slate-500">
          {label} {required && "*"}
        </span>
  
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
        />
      </label>
    );
  }