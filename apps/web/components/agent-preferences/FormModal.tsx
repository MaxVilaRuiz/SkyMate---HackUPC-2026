type FormModalProps = {
    eyebrow: string;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer: React.ReactNode;
  };
  
  export function FormModal({
    eyebrow,
    title,
    description,
    children,
    footer,
  }: FormModalProps) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#0770E3]">
            {eyebrow}
          </p>
  
          <h2 className="mb-2 text-center text-2xl font-bold text-slate-800">
            {title}
          </h2>
  
          {description && (
            <p className="mb-6 text-center text-sm text-slate-500">
              {description}
            </p>
          )}
  
          {children}
  
          <div className="mt-8 flex gap-3">{footer}</div>
        </div>
      </div>
    );
  }