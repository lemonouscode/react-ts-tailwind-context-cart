import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext";

interface StoreItemProps{
    id:number,
    name:string,
    price:number,
    imageUrl:string
}


export const StoreItem = ({id,name,price,imageUrl}:StoreItemProps) => {
  
  const {getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem} = useShoppingCart()

  const quantity = getItemQuantity(id);

  return (
    <div className="max-w-md w-full m-auto mt-10 rounded-lg overflow-hidden">
        <img src={imageUrl} alt="" className="object-cover h-52 w-full"/>
        {quantity === 0 
        ?  
        <button onClick={()=> increaseItemQuantity(id)}>+ Add To Cart</button> 
        :
        <div className="border border-black p-5 rounded-b-lg flex flex-col">
            <div className="flex w-full justify-between pt-5">
                <h2>{name}</h2>
                <h4>{formatCurrency(price)}</h4>
            </div>
            <div className="flex gap-3 justify-center align-middle">
                <button onClick={()=> decreaseItemQuantity(id)} className="text-3xl my-auto p-2 bg-blue-600 text-white rounded-lg">-</button>
                <div className="flex my-auto">
                    {quantity} in cart
                </div>
                <button onClick={()=> increaseItemQuantity(id)} className="text-3xl my-auto p-2 bg-blue-600 text-white rounded-lg">+</button>
            </div>  
            <button onClick={()=> removeItem(id)} className="bg-red-600 text-white px-16 mt-5 rounded-lg ">Remove</button>  
        </div>
        }
        
    </div>
  )
}
