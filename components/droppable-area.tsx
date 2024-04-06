import { useState } from 'react';
import ItemCard from './item-card';
import { Item } from '@prisma/client';

type Props = {
    allItems: Item[];
    className?: string;
}

function DroppableArea({ allItems, className }: Props) {
    const [droppedItem, setDroppedItem] = useState<Item | null>(null);

    return (
        <div className={`${droppedItem ? '' : 'border-dashed border-2'} h-16 w-16 ${className}`}
            onDragOver={(e) => {
                e.preventDefault(); // This is necessary to allow dropping
            }}
            onDrop={(e) => {
                e.preventDefault();
                // Get the id of the item being dragged
                const itemId = e.dataTransfer.getData('text/plain');
                // Find the item in your state using the id
                const item = allItems.flat().find(item => item.id === itemId);
                // Set the dropped item
                if (item) {
                    setDroppedItem(item);
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