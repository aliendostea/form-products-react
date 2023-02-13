import { ProductPictureFigure } from "./ProductPicture.styled";

interface ProductPictureProps {
  srcRoute: string;
  imgAlt: string;
}

const ProductPicture = ({ srcRoute, imgAlt }: ProductPictureProps) => {
  return (
    <ProductPictureFigure>
      <img src={srcRoute} alt={imgAlt} loading="lazy" />
    </ProductPictureFigure>
  );
};

export default ProductPicture;
