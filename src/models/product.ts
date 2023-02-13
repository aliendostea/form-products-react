export interface ImagetProps {
  id: string;
  name: string;
  route: string;
}

export interface ProductProps {
  id?: string;
  internalCode: string;
  name: string;
  price: string;
  power: string;
  description: string;
  available: boolean;
  discount: string;
  image: ImagetProps;
}
