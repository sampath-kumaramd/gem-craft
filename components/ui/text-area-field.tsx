import { useDescription, useTsController } from "@ts-react/form";
import { Textarea } from "./textarea";

export default function TextAreaField({
  label,
  label2,
}: {
  label: string;
  label2: string;
}) {
  const { field } = useTsController<string>();

  return (
    <div className=" mt-5 grid grid-cols-4 ">
      <div className=" col-span-1 ">
        <div className="mr-5">Description</div>
        <div className="mr-5 text-gray-400">{label2}</div>
      </div>
      <Textarea
          value={field.value ? field.value : ''}
        className=" col-span-3 mb-5"
        onChange={(e) => {
          field.onChange(e.target.value);
          
        }}
      />
    </div>
  );
}
