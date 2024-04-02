import { Item } from '@prisma/client'
import React from 'react'

type Props = { item: Item }

function ItemCard({ item }: Props) {
    return (
        <div>{item.name}</div>
    )
}

export default ItemCard