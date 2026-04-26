type TextFieldProps = {
    label: string;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (value: string) => void;
  };
  
  export function TextField({
    label,
    value,
    placeholder,
    required = false,
    onChange,
  }: TextFieldProps) {
    return (
      <label className="space-y-1">
        <span className="text-xs font-semibold text-slate-500">
          {label} {required && "*"}
        </span>
  
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm outline-none focus:border-[#0770E3]"
        />
      </label>
    );
  }