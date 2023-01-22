export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: { [key: string]: any };
    category: string;
}