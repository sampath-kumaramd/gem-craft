"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ItemType, getAllItems } from "@/hooks/items";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import ItemCard from "@/components/item-card";
import DroppableArea from "@/components/droppable-area";
import Link from "next/link";
import { Item } from "@prisma/client";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default function Home() {
  const {
    status,
    error,
    data: allItems,
  } = useQuery({
    queryKey: ["items_getAllItems"],
    queryFn: getAllItems,
  });
  const matalColors = [
    { id: 1, name: "Gold", src: "/ring/G.png", alt: "Gold", chainSrc: "/chain/Chain_1.png" },
    { id: 2, name: "Antique Gold", src: "/ring/AG.png", alt: "Antique Gold", chainSrc: "/chain/Chain_2.png" },
    { id: 3, name: "Silver", src: "/ring/S.png", alt: "Silver", chainSrc: "/chain/Chain_3.png" },
    { id: 4, name: "Antique Silver", src: "/ring/AS.png", alt: "Antique Silver", chainSrc: "/chain/Chain_4.png" },
    { id: 5, name: "Gold Matte", src: "/ring/GM.png", alt: "Gold Matte", chainSrc: "/chain/Chain_5.png" },
  ]

  const [currentChainImage, setCurrentChainImage] = useState(matalColors[0].chainSrc);
  const [droppedItem, setDroppedItem] = useState<Item>();
  const [droppedItems, setDroppedItems] = useState<Item[]>([]);

  const handleItemDropped = (item: Item) => {
    setDroppedItems(prevItems => [...prevItems, item]);
  }

  const handlClickOnRing = (chainSrc: string) => {
    // Update the current chain image when the button is clicked
    setCurrentChainImage(chainSrc);
  }

  const handleScreenshot = () => {
    html2canvas(document.body).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'screenshot.png');
        } else {
          console.error('Failed to create blob from canvas');
        }
      });
    });
  };

  if (status === "error") {
    console.log(error);
  }
  if (status === "pending") {
    return (<div>Loading...</div>)
  }
  if (status === "success") {
    console.log(allItems.flat());
    return (
      <>
        <div className="flex justify-center items-center space-x-6 my-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* <UserButton /> */}
          <span className=" text-2xl">Gem Caft</span>
        </div>
        <Separator />
        <div className=" grid space-x-4 grid-cols-12 mx-16 mt-16 ">
          <div className=" col-span-3  space-y-8">
            <div className=" text-lg text-gray-600">Select Your neckless length</div>
            <div className="flex justify-start space-x-6 my-4">
              <div>Comming soon...</div>
            </div>
            <div className="text-4xl mt-12">Beads</div>
            <div className=" border-dashed w-full h-[50vh] border-2">
              <div className=" p-4 flex space-x-4">
                {allItems.flat().map((item) => {
                  if (item.type === "BEADS") {
                    return (
                      <ItemCard
                        key={item.id}
                        item={item}
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', item.id);
                        }}
                        onDragEnd={() => {
                          setDroppedItem(undefined);
                        }}
                      />
                    )
                  }
                })}
              </div>

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
            <div className="relative flex justify-center">
              <Image src="/skin.png" width={700} height={500} alt="image" className=" absolute " />
              <Image src={currentChainImage} width={700} height={500} alt="image" className=" absolute mt-36" />
              <DroppableArea allItems={allItems} className=" absolute  z-20 mt-[24vh] -ml-[33.5vw]" onItemDropped={handleItemDropped} />
              <DroppableArea allItems={allItems} className=" absolute z-20  mt-[36vh] -ml-[24vw]" onItemDropped={handleItemDropped} />
              <DroppableArea allItems={allItems} className=" absolute z-20 mt-[42vh] " onItemDropped={handleItemDropped} />
              <DroppableArea allItems={allItems} className=" absolute z-20 mt-[36vh] ml-[24vw]" onItemDropped={handleItemDropped} />
              <DroppableArea allItems={allItems} className=" absolute z-20 mt-[24vh] ml-[33.5vw]" onItemDropped={handleItemDropped} />
            </div>
          </div>
          <div className=" col-span-3 space-y-8 text-end">
            <div className=" text-lg text-gray-600">Select Your Skin color</div>
            <div className="flex justify-end space-x-6 my-4">
              <div>Comming soon...</div>
            </div>
            <div className="text-4xl mt-12">Drops, Links, pendants</div>
            <div className=" border-dashed w-full h-[50vh] border-2">
              <div className=" p-4 flex space-x-4">
                {allItems.flat().map((item) => {
                  if (item.type === "PENDANTS" || item.type === "DROPS" || item.type === "LINKS") {
                    return (
                      <ItemCard
                        key={item.id}
                        item={item}
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', item.id);
                        }}
                        onDragEnd={() => {
                          setDroppedItem(undefined);
                        }}
                      />
                    )
                  }
                })}
              </div>
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
        <div className=" flex justify-center gap-8">
          <Link href="/category-data"> <Button > Inventory </Button></Link>
          <Button onClick={handleScreenshot} >Take Screenshot</Button>
          <Button onClick={() => console.log(droppedItems)}>Log Items</Button>
        </div>

      </>
    );
  }
}
