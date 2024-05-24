import React, { DragEvent, use, useEffect, useState } from 'react'
import { Item } from '@prisma/client'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Image from 'next/image'
import { RefreshCcw } from 'lucide-react'
import { ItemCardAction } from './item-card-action'

type Props = {
    item: Item,
    draggable: boolean,
    onDragStart: (e: DragEvent) => void,
    onDragEnd: (e: DragEvent) => void
}

function ItemCard({ item, draggable, onDragStart, onDragEnd }: Props) {
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [iconWidth, setIconWidth] = useState(10);
    // const [size, setSize] = useState(0); 
    const [padding, setPadding] = useState(0);

    useEffect(() => {
        console.log('padding', padding);
    }, [padding]);
    
    return (
        <Card
            className='w-16 h-16 bg-transparent border-none '
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardContent
                className='p-0 '
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: `${padding}px` }} // Added style here
                onMouseEnter={() => { setIsHovered(true); setIconWidth(20); }}  // Modify this line
                onMouseLeave={() => { setIsHovered(false); setIconWidth(10); }}  // And this line
            >
                <div className='flex justify-center items-center' style={{ height: '100%' }}>
                    <Image
                        draggable="false"
                        src={item.image || 'https://placehold.co/300x300 '}
                        alt={item.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: `100%`, height: 'auto', transform: `rotate(${rotation}deg)` }}
                    />
                </div>
                <ItemCardAction padding={padding} setPadding={setPadding} rotate={rotation} setRotate={setRotation} />
            </CardContent>
        </Card>
    )
}

export default ItemCard