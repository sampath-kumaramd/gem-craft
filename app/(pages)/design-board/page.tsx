"use client";
import Image from "next/image";
import styles from "./page.module.css";
import DndExample from "@/components/DndExample";
import { useEffect, useState } from "react";
import { getAllItems } from "@/hooks/items";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    status,
    error,
    data: allItems,
  } = useQuery({
    queryKey: ["items_getAllItems"],
    queryFn: getAllItems,
  });

  const necklessLengths = [
    { id: 1, name: "16 inch" },
    { id: 2, name: "18 inch" },
    { id: 3, name: "20 inch" },
    { id: 4, name: "22 inch" },
    { id: 5, name: "24 inch" },
  ]

  const matalColors = [
    { id: 1, name: "Gold", src: "/ring/G.png", alt: "Gold", chainSrc: "/chain/Chain_1.png" },
    { id: 2, name: "Antique Gold", src: "/ring/AG.png", alt: "Antique Gold", chainSrc: "/chain/Chain_2.png" },
    { id: 3, name: "Silver", src: "/ring/S.png", alt: "Silver", chainSrc: "/chain/Chain_3.png" },
    { id: 4, name: "Antique Silver", src: "/ring/AS.png", alt: "Antique Silver", chainSrc: "/chain/Chain_4.png" },
    { id: 5, name: "Gold Matte", src: "/ring/GM.png", alt: "Gold Matte", chainSrc: "/chain/Chain_5.png" },
  ]

  const skinColors = [
    { id: 1, name: "Light" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Dark" },
    { id: 4, name: "Black" },
    { id: 5, name: "White" },
  ]

  const [currentChainImage, setCurrentChainImage] = useState(matalColors[0].chainSrc);

  const handlClickOnRing = (chainSrc: string) => {
    // Update the current chain image when the button is clicked
    setCurrentChainImage(chainSrc);
  }

  if (status === "error") {
    console.log(error);
  }
  if (status === "pending") {
    return (<div>Loading...</div>)
  }
  if (status === "success") {
    console.log(allItems.flat());
    return (
      // <DndExample />
      // <>
      // {allItems.flat().map((item) => {
      //   return (
      //     <div key={item.id} className={styles.card}>
      //       <Image
      //         src={item.image || 'https://via.placeholder.com/300'}
      //         alt={item.name}
      //         width={300}
      //         height={300}
      //       />
      //       <h3>{item.name}</h3>
      //       <p>{item.description}</p>
      //       {/* <p>{item.price}</p> */}
      //       <p>{item.stock}</p>
      //       <p>{item.material}</p>
      //       <p>{item.natural}</p>
      //       <p>{item.shape}</p>
      //       <p>{item.texture}</p>
      //       <p>{item.colors}</p>
      //       {/* <p>{item.weight}</p> */}
      //       <p>{item.quantity}</p>
      //       <p>{item.active}</p>
      //       <p>{item.dimensions}</p>
      //       <p>{item.categoryId}</p>
      //     </div>
      //   );
      // })};

      // </>

      <>
        <div className="flex justify-center space-x-6 my-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className=" text-lg">Gem Caft</span>
        </div>
        <Separator />
        <div className=" grid space-x-4 grid-cols-12 mx-16 mt-16 ">
          <div className=" col-span-3  space-y-8">
            <div className=" text-lg text-gray-600">Select Your neckless length</div>
            <div className="flex justify-start space-x-6 my-4">
              {necklessLengths.map((length) => {
                return (
                  <Avatar key={length.id}>
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
            <div className="text-4xl mt-12">Beads</div>
            <div className=" border-dashed w-full h-[50vh] border-2">
              ji
            </div>
          </div>
          <div className=" col-span-6 space-y-8 text-center items-center">
            <div className=" text-lg text-gray-900">Select Your Metal color</div>
            <div className="flex justify-center items-center space-x-10 my-4">
              {matalColors.map((color) => {
                return (
                  <Button key={color.id} variant='link' className="w-4 h-4" onClick={() => handlClickOnRing(color.chainSrc)}>
                    <Avatar >
                      <AvatarImage src={color.src} />
                      <AvatarFallback>{color.name}</AvatarFallback>
                    </Avatar>
                  </Button>

                );
              })}</div>
            <div className=" flex justify-center">
              <Image src="/skin.png" width={700} height={500} alt="image" />
              <Image src={currentChainImage} width={700} height={500} alt="image" className=" absolute mt-36" />
            </div>
          </div>
          <div className=" col-span-3 space-y-8 text-end">
            <div className=" text-lg text-gray-600">Select Your Skin color</div>
            <div className="flex justify-end space-x-6 my-4">
              {skinColors.map((color) => {
                return (
                  <Avatar key={color.id}>
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                );
              })}</div>
            <div className="text-4xl mt-12">Drops, Links, pendants</div>
            <div className=" border-dashed w-full h-[50vh] border-2">
              ji
            </div>
          </div>
        </div>

        <div className="mx-16 mt-8">*  Be careful how you place the beads. We will make them the
          way you Show us. Place them
          on the chain for inline, under it
          for dangling.</div>
        <div className="mx-16 my-2">*  Some are dangles, som
          Inline, some are both. It you place
          them on the chain, we will make
          them inline. If you place them
          under the chain, we will dangle them.</div>
      </>
    );
  }
}
