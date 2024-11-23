export interface Card {
    id: number | string;
    name: string;
    image: string;
    mealType: string[];
    instructions: string[];
    cuisine: string;
    rating: number;
    week?: string;
  }
  
  export interface CardProps {
    data: Card;
    handleDeleteDeal: (data: Card) => void;
  }
  