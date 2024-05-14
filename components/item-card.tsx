import React, { DragEvent, useState } from 'react'
import { Item } from '@prisma/client'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Image from 'next/image'
import { RefreshCcw } from 'lucide-react'

type Props = {
    item: Item,
    draggable: boolean,
    onDragStart: (e: DragEvent) => void,
    onDragEnd: (e: DragEvent) => void
}

function ItemCard({ item, draggable, onDragStart, onDragEnd }: Props) {
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [iconWidth, setIconWidth] = useState(10);  // Add this line

    const rotateImage = () => {
        setRotation(rotation + 30);
    }

    return (
        <Card
            className='w-16 h-16 bg-transparent border-none '
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardContent
                className='p-0 items-center flex justify-center align-middle relative'
                onMouseEnter={() => { setIsHovered(true); setIconWidth(20); }}  // Modify this line
                onMouseLeave={() => { setIsHovered(false); setIconWidth(10); }}  // And this line
            >
                <Image
                    draggable="false"
                    src={item.image || 'https://placehold.co/300x300 '}
                    alt={item.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', transform: `rotate(${rotation}deg)` }} />
                {isHovered && <button className=' absolute -mt-12 ml-10' onClick={rotateImage}><RefreshCcw width={iconWidth} /></button>}
            </CardContent>
        </Card>
    )
}

export default ItemCard