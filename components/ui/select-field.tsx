import { useTsController } from "@ts-react/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";


export default function SelectField({
  SelectData,
  label,
  label2,
}: {
  SelectData: Category[] ;
  label: string;
  label2: string;
}) {
  const { field } = useTsController<string>();

  if(SelectData === null) return (<div>loading...</div>)
  return (
    <div className=" mt-5 grid grid-cols-4 ">
      <div className=" col-span-1 mb-5">
        <div className="mr-5">{label}</div>
        <div className="mr-5 text-gray-400">{label2}</div>
      </div>
      <Select
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <SelectTrigger className=" col-span-3">
          <SelectValue defaultValue={field.value} />
        </SelectTrigger>
        <SelectContent>
          {SelectData && SelectData.map((data) => (
            <SelectItem key={data.id} value={`${data.id}`}>
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
