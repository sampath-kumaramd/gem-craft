import { useDescription, useTsController } from "@ts-react/form";
import MultipleSelector, { Option } from "./multi-selector";

export default function ColorField({ label2 }: { label2: string }) {
  const { field } = useTsController<string[]>();
  const { label, placeholder } = useDescription();
  type Option = {
    label: string;
    value: string;
  };
  const OPTIONS: Option[] = [
    { label: "Red", value: "Red" },
    { label: "Blue", value: "Blue" },
    { label: "Green", value: "Green" },
    { label: "Yellow", value: "Yellow" },
    { label: "Black", value: "Black" },
    { label: "White", value: "White" },
    { label: "Brown", value: "Brown" },
    { label: "Orange", value: "Orange" },
    { label: "Purple", value: "Purple" },
    { label: "Pink", value: "Pink" },
    { label: "Gray", value: "Gray" },
    { label: "Gold", value: "Gold" },
  ];

  return (
    <div className="mt-5 grid grid-cols-4 ">
      <div className=" col-span-1 ">
        <div className="mr-5">Colors</div>
        <div className="mr-5 text-gray-400">{label2}</div>
      </div>

      <MultipleSelector
       value={field.value ? field.value.map(val => ({ label: val, value: val })) : undefined}
        onChange={(options) => field.onChange(options.map(option => option.value))}
        defaultOptions={OPTIONS}
        placeholder="Select colors..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
}
