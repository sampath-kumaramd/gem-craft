import { Item } from '@prisma/client'
import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import Image from 'next/image'


type Props = { item: Item }

function ItemCard({ item }: Props) {
    return (
        <Card className='w-20 h-16'>
            <CardContent className='p-0 items-center flex justify-center align-middle'>
                <Image src={item.image || 'https://placehold.co/300x300 '} alt={item.name} width={60} height={60} />
            </CardContent>
        </Card>
    )
}

export default ItemCard