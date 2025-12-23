import { MAIN_COLOR } from "@/constants/colors";

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
      <label className="text-sm text-black">{label}</label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-white
            border
            rounded-xl
            px-4 py-3
            text-sm
            text-black
            borderColor: black
            placeholder-gray-500
            focus:outline-none
            focus:ring-0
            transition
          "
        />

        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
