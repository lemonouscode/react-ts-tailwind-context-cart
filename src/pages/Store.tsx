import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";

export const Store = () => {
  return (
    <div>
      <h1>Store</h1>
      <div className="grid grid-cols-2 gap-4">
        {storeItems.map((element) => (
          <StoreItem key={element.id} {...element} imageUrl={element.imgUrl} />
        ))}
      </div>
    </div>
  )
}
