import {AiOutlineShoppingCart} from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export const Navbar = () => {

  const {toggleCart,cartQuantity} = useShoppingCart();

  return (
    <div className="container mx-auto flex justify-between pt-3">
        <nav className='flex gap-5'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/store">Store</NavLink>
        </nav>
        <button onClick={toggleCart} className='relative'>
            <AiOutlineShoppingCart style={{ fontSize:'40px', padding:'8px', border:'1px solid black', borderRadius:'100px' }} />

            <div className='w-6 h-6 bg-red-500 rounded-full absolute right-[-8px] bottom-[-8px] text-white'>
                {cartQuantity}
            </div>
        </button>
    </div>
  )
}
