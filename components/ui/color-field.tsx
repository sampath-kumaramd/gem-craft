import { useDescription, useTsController } from "@ts-react/form";
import MultipleSelector, { Option } from "./multi-selector";

export default function ColorField({ 
  label2,
 }: { 
  label2: string;
}) {
  const { field } = useTsController<string>();
  const { label, placeholder } = useDescription();

  const OPTIONS: Option[] = [
    { label: 'nextjs', value: 'Nextjs' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt', disable: true },
    { label: 'Vue', value: 'vue, disable: true', disable: true },
    { label: 'Remix', value: 'remix' },
    { label: 'Svelte', value: 'svelte', disable: true },
    { label: 'Angular', value: 'angular', disable: true },
    { label: 'Ember', value: 'ember', disable: true },
    { label: 'React', value: 'react' },
    { label: 'Gatsby', value: 'gatsby', disable: true },
    { label: 'Astro', value: 'astro', disable: true },
  ];

  return (
    <div className="mt-5 grid grid-cols-4 ">
      <div className=" col-span-1 ">
        <div className="mr-5">{label}</div>
        <div className="mr-5 text-gray-400">{label2}</div>
      </div>

      <MultipleSelector
        defaultOptions={OPTIONS}
        placeholder="Select frameworks you like..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
}
