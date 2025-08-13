type Props = {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onRemove?: () => void;
  index?: number;
  "aria-label"?: string;
};

export default function AnswerInput({
  value,
  placeholder,
  onChange,
  onRemove,
  index,
  ...rest
}: Props) {
  return (
    <div className="flex items-start gap-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-md border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 text-background"
        {...rest}
      />
      {onRemove && (
        <button
          type="button"
          aria-label={`remove-answer-${index ?? ""}`}
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-md p-2 text-red-600 hover:bg-red-50"
        >
          {/* trash icon*/}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
