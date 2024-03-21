"use client";

import { Sidebar } from "@/components/sidebar";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { useQuery } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { getCategory } from "@/hooks/category";

const CategoryDataPage = () => {
  const {
    status,
    error,
    data: categoryData,
  } = useQuery({
    queryKey: ["getCategory"],
    queryFn: getCategory,
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div> {JSON.stringify(error)} </div>;
  }

  if (status === "success") {
    console.log(categoryData);
    const formattedcategoryData: CategoryColumn[] = categoryData.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      createdAt: dateFormat(item.createdAt, "fullDate"),
    }));

    return (
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-8">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-7 lg:col-span-7 lg:border-l">
                <div className="h-full px-2 py-6 lg:px-8">
                  <div className="relative">
                    <div className="flex-col">
                      <div className="flex-1 space-y-4 p-8 pt-6">
                        <CategoryClient data={formattedcategoryData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default CategoryDataPage;
