import { LuTrash2 } from "react-icons/lu";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onRemove?: () => void;
  index?: number;
};

export default function AnswerInput({
  value,
  placeholder,
  onChange,
  onRemove,
  index,
}: Props) {
  return (
    <div className="flex items-start gap-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="placeholder: flex-1 rounded-md border border-foreground-tertiary bg-transparent px-4 py-3 text-foreground-tertiary focus:border-my-primary"
      />
      {onRemove && (
        <button
          type="button"
          aria-label={`remove-answer-${index ?? ""}`}
          onClick={onRemove}
          className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-error cursor-pointer"
        >
          <LuTrash2 />
        </button>
      )}
    </div>
  );
}
