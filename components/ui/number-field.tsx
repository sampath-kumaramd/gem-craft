import { useDescription, useTsController } from "@ts-react/form";
import { Input } from "./input";

export default function NumberField({ 
  label2,
}: { 
  label2: string 
}) {
  const { field, error } = useTsController<number>();
  const { label, placeholder } = useDescription();
  return (
    <div className="mt-5 grid grid-cols-4 ">
       <div className=" col-span-1 ">
        <div className="mr-5">{label}</div>
        <div className="mr-5 text-gray-400">{label2}</div>
      </div>

      <Input
          value={field.value ? field.value : ''}
       className="col-span-3 mb-5"
        type="number"
        onChange={(e) => {
          field.onChange(Number(e.target.value));
        }}
      />
      {error?.errorMessage && (
        <span className={"error"}>{error?.errorMessage}</span>
      )}
    </div>
  );
}
