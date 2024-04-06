"use client";

import { getCategory } from "@/hooks/category";
import { Sidebar } from "@/components/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";

import { useQuery } from "@tanstack/react-query";
import dateFormat from "dateformat";

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
    return <>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-8">
              <div className=" lg:block h-[99vh] flex flex-col space-y-5">
                <div className="flex items-center space-x-4 mt-10 ml-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[8vw]" />
                    <Skeleton className="h-4 w-[8vw]" />
                  </div>
                </div>
                <div className="flex items-center mt-10 ml-2">
                  <Skeleton className="h-12  w-11/12" />
                </div>
                <div className="flex items-center mt-10 ml-2">
                  <Skeleton className="h-12  w-11/12" />
                </div>
                <div className="flex items-center mt-10 ml-2">
                  <Skeleton className="h-12  w-11/12" />
                </div>
              </div>
              <div className="col-span-7 lg:col-span-7 lg:border-l">
                <div className="h-full px-2 py-6 lg:px-8">
                  <div className="relative">
                    <div className="flex-col">
                      <div className="flex-1  space-y-10 p-8 pt-2">
                        <div className="mt-4">
                          <div className="flex flex-row justify-between items-center border-b">
                            <div className="flex flex-col space-y-3 pb-2">
                              <Skeleton className="h-[6vh] w-[20vw] rounded-xl" />
                              <Skeleton className="h-[2vh] w-[20vw] rounded-xl" />
                            </div>
                            <Skeleton className="h-[6vh] w-[10vw] rounded-xl" />
                          </div>
                        </div>
                        <div className="mt-20 flex flex-col space-y-6">
                          <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[8vh] w-[80vw] rounded-xl" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[78vw]" />
                              <Skeleton className="h-4 w-[75vw]" />
                            </div>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <Skeleton className="h-[8vh] w-[80vw] rounded-xl" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[78vw]" />
                              <Skeleton className="h-4 w-[75vw]" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-end space-x-4">
                          <Skeleton className="h-[5vh] w-[6vw] rounded-xl" />
                          <Skeleton className="h-[5vh] w-[6vw] rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
  }

  if (status === "error") {
    return <div> {JSON.stringify(error)} </div>;
  }

  if (status === "success") {
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
