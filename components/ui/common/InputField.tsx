import { MAIN_COLOR, WHITE_COLOR } from "@/constants/colors";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rightElement,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300">{label}</label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            borderColor: MAIN_COLOR,
            color: WHITE_COLOR,
          }}
          className="
            w-full
            bg-transparent
            border
            rounded-xl
            px-4 py-3
            text-sm
            placeholder-gray-500
            focus:outline-none
            focus:ring-0
            transition
          "
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
