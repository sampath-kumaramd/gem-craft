import { useTsController } from "@ts-react/form";
import ImageUpload from "./image-upload";
import { CreateItemType, ItemType } from "@/hooks/items";

export default function TextField({
  label,
  label2,
}: {
  label: string;
  label2: string;
}) {
  const { field } = useTsController<string>();

  let itemData: CreateItemType = {
    name: "",
    categoryId: "",
    type: ItemType.BEADS,
    material: [],
    natural: false,
    shape: "",
    texture: "",
    colors: [],
    image:''
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
          itemData.image = url.url;
          itemData.name = url.name;
          field.onChange(itemData.image);
        }}
        onRemove={() => field.onChange("")}
      />
    </div>
  );
}
