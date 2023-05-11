import { useEffect, useRef } from 'react';
import {AiOutlineClose} from 'react-icons/ai'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { CartItem } from './CartItem';
import storeItems from "../data/items.json";

export const ShoppingCart = () => {

  const {isOpen, toggleCart, cartItems} = useShoppingCart();


  // This ref will be connected to the box
  const refOne = useRef<HTMLDivElement>(null);

  console.log(isOpen)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true)
  }, [isOpen]);


  const handleClickOutside = (e: MouseEvent) => {
    if (!refOne.current?.contains(e.target as Node) && isOpen) {
      toggleCart()
    }
  }


  return (
    <div className='overflow-hidden'>
        <div ref={refOne} className={`fixed top-0 left-0 flex flex-col max-w-sm bg-slate-800 h-full transition-all ease-linear duration-300 ${isOpen ? "w-1/3" : "w-0"}`}>
          <div className='p-5'>
            <div className='flex justify-between w-full items-center text-white'>
              <p className='text-xl'>Cart</p>
              <button onClick={toggleCart}>
                <AiOutlineClose style={{ fontSize:'25px' }} />
              </button>
            </div>
          </div>


          <div className='overflow-hidden'>
            <div>
              {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
          </div>


          <p className='ml-auto text-2xl font-bold text-white pr-5'>
            Total: {cartItems.reduce((total,cartItem) => {
              const item = storeItems.find(i => i.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity
            }, 0)} $
          </p>
          
  


        </div>

        
      
    </div>
  )
}
