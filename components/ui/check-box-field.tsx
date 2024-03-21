import { useDescription, useTsController } from "@ts-react/form";
export default function CheckBoxField({ name }: { name: string }) {
  const { label } = useDescription();
  const { field, error } = useTsController<boolean>();

  return (
    <>
      {/* <label>
                {label}
                <input
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value ? field.value : false}
                    type="checkbox"
                />
            </label>
        {error?.errorMessage && <span className={"error"}>{error?.errorMessage}</span>} */}
      <div className="mt-5 grid grid-cols-4 mb-5">
        <div className=" col-span-1 ">
          <div className="mr-5">{label}</div>
          {/* <div className="mr-5 text-gray-400">{label2}</div> */}
        </div>

        <input
          onChange={(e) => field.onChange(e.target.checked)}
          checked={field.value ? field.value : false}
          type="checkbox"
          
        />
      </div>
    </>
  );
}
