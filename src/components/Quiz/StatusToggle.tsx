type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  id?: string;
};

export default function StatusToggle({ checked, onChange, id }: Props) {
  return (
    <label
      htmlFor={id}
      className="relative inline-flex h-6 w-11 cursor-pointer items-center"
      aria-label="Toggle quiz visibility status"
    >
      {/* The real control (screen-reader friendly) */}
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-green-500 dark:bg-gray-600 dark:peer-checked:bg-green-600" />
      <span className="pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5" />
    </label>
  );
}
