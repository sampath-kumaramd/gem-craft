import { useTsController } from "@ts-react/form";
import ImageUpload from "./image-upload";
import { CreateFile } from "@/hooks/file";

export default function TextField({
  label,
  label2,
}: {
  label: string;
  label2: string;
}) {
  const { field } = useTsController<string>();

  let file: CreateFile = {
    imageUrl: "",
    name: "",
  };

  return (
    <div className=" mt-5 grid grid-cols-4 ">
      <div className=" col-span-1  mb-5">
        <div className="mr-5">{label}</div>
        <div className="mr-5 text-gray-400">{label2}</div>
      </div>
      <ImageUpload
        value={field.value ? [field.value] : []}
        onChange={(url) => {
          file.imageUrl = url.url;
          file.name = url.name;
          field.onChange(file.imageUrl);
        }}
        onRemove={() => field.onChange("")}
      />
    </div>
  );
}
