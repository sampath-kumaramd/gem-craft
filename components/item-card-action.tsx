"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";

interface ItemCardActionProps {
    padding: number;
    setPadding: (width: number) => void;
    rotate: number;
    setRotate: (rotate: number) => void;
}

export const ItemCardAction: React.FC<ItemCardActionProps> = ({ padding, setPadding, rotate, setRotate }) => {
    const scaleUp = () => {
        if (padding <= 0) return;
        setPadding(padding - 2);
    }

    const scaleDown = () => {
        if (padding >= 10) return;
        setPadding(padding + 2);
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="absolute -mt-16 ml-2'">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => setRotate(rotate + 30)}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        Rotate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => scaleUp()}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Scale Up
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => scaleDown()}>
                        <Trash className="mr-2 h-4 w-4" />
                        Scale Down
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
