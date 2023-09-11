import * as React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Button from "../../../../components/Button";
import ListCard from "../../../../components/ListCard";
import Text from "../../../../components/Text";
import {IProduct} from "../../../../store/ItemStore.ts";

export interface ItemProps {
  product: IProduct;
}

const Item: React.FC<ItemProps> = ({product}) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <ListCard
      image={product.images[0]}
      title={product.title}
      captionSlot={product.category.name}
      subtitle={product.description}
      contentSlot={product.price}
      actionSlot={
        <Button>
          <Text maxLines={1} view="button" tag="div" weight="normal">Add to Cart</Text>
        </Button>
      }
      onClick={(): void => {
        navigate(`/product/${product.id}`)
      }}
    />
  );
};

export default Item;