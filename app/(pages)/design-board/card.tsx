"use client"
import React from 'react'
import { useDrag } from 'react-dnd'
enum ItemTypes {
    CARD = 'card',
    // add other item types as needed
  }
interface CardProps {
    isDragging: boolean;
    text: string;
  }
  
  export default function Card({ isDragging, text }: CardProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}