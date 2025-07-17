import { formatPrice } from "@/lib/format"

interface PriceTagProps {
    price: number,
    className?: string,
}

export default function PriceTag({price,  }: PriceTagProps){

    return <span className={'badge ${className}'}> {formatPrice(price)}</span>
}   