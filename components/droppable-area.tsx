import { useState } from 'react';

import { Item } from '@prisma/client';
import ItemCard from './item-card';

type Props = {
    allItems: Item[];
    className?: string;
    onItemDropped: (item: Item) => void 
}

function DroppableArea({ allItems, className, onItemDropped }: Props) {
    const [droppedItem, setDroppedItem] = useState<Item | null>(null);

    return (
        <div className={`${droppedItem ? '' : 'border-dashed border-2'} h-16 w-16 ${className}`}
            onDragOver={(e) => {
                e.preventDefault(); // This is necessary to allow dropping
            }}
            onDrop={(e) => {
                e.preventDefault();
                const itemId = e.dataTransfer.getData('text/plain');
                const item = allItems.flat().find(item => item.id === itemId);
                if (item) {
                    setDroppedItem(item);
                    onItemDropped(item); // Call the callback function with the dropped item
                }
            }}
        >
            {droppedItem && (
                <ItemCard
                    key={droppedItem.id}
                    item={droppedItem}
                    draggable={true}
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', droppedItem.id);
                    }}
                    onDragEnd={(e) => {
                        // If the item is not dropped on another droppable area, remove it
                        if (e.dataTransfer.dropEffect === 'none') {
                            setDroppedItem(null);
                        }
                    }}
                />
            )}
        </div>
    );
}

export default DroppableArea;