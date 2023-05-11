import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json";
import {AiOutlineCloseSquare} from "react-icons/ai"
import { formatCurrency } from "../utilities/formatCurrency";

interface CartItemProps{
    id:number
    quantity:number
}

export const CartItem = ({id,quantity}:CartItemProps) => {

  const {removeItem} = useShoppingCart();
  const item = storeItems.find(i => i.id === id)
  if(item === null) return null


  return (
    <div className="flex items-center justify-between gap-5 p-4 text-white border-b border-white w-full">
      <img src={item?.imgUrl} alt="" width={105} height={75} />
      <div>
        <div className="flex gap-3">
          <h5>{item?.name}</h5>
          <p>x{quantity}</p>
        </div>
        <p>{item?.price}$</p>
      </div>
      <div>{item?.price && formatCurrency(item.price * quantity)}$</div>
      <button onClick={()=> item && removeItem(item.id)} className=""><AiOutlineCloseSquare style={{ color:'red', fontSize:'40px' }} /></button>
    </div>
  )
}
