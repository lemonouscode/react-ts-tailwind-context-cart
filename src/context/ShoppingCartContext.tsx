import {createContext,useContext,useState} from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface ShoppingCartProviderProps{
    children:React.ReactNode
}

interface CartItem{
    id:number
    quantity:number
}

interface ShoppingCartContext{
    getItemQuantity: (id:number)=>number
    increaseItemQuantity: (id:number)=>void
    decreaseItemQuantity: (id:number)=>void
    removeItem: (id:number)=>void
    cartItems: CartItem[]
    cartQuantity: number
    toggleCart: ()=>void
    isOpen: boolean
}




const ShoppingCartContext = createContext({} as ShoppingCartContext)


export const useShoppingCart = ()=>{
    return useContext(ShoppingCartContext)
} 





export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps)=>{

    
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )

    const [isOpen, setIsOpen] = useState<boolean>(false);
    

    const toggleCart = ()=>{
        setIsOpen(!isOpen);
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )


    const getItemQuantity = (id:number)=>{
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseItemQuantity = (id:number)=>{
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1 } ]
            }
            else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity:item.quantity + 1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
    }





    const decreaseItemQuantity = (id:number)=>{
        
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            }
            else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity:item.quantity - 1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
        
    }

    const removeItem = (id:number)=>{
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value={{ 
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeItem,
            cartQuantity,
            cartItems,
            toggleCart,
            isOpen
            }}>
    
            {children}
            <ShoppingCart />
        </ShoppingCartContext.Provider>
    )
    
}
































// import {createContext, useContext, useState} from 'react';

// interface ShoppingCartProviderProps{
//     children:React.ReactNode
// }

// interface CartItem {
//     id:number
//     quantity: number
// }

// interface ShoppingCartContext {
//     getItemQuantity: (id: number) => number
//     increaseCartQuantity: (id: number) => void
//     decreaseCartQuantity: (id: number) => void
//     removeFromCart: (id: number) => void
// }

// const ShoppingCartContext = createContext({} as ShoppingCartContext);

// export const useShoppingCart = ()=>{
//     return useContext(ShoppingCartContext);
// }

// export const ShoppingCartProvider = ({children}:ShoppingCartProviderProps)=>{
    
//     const [cartItems, setCartItems] = useState<CartItem[]>([]);

//     const getItemQuantity = (id:number) => {
//         // console.log(id)
//         console.log(cartItems.find(item => item.id === id)?.quantity || 0) 
//         return cartItems.find(item => item.id === id)?.quantity || 0
//     }

//     const increaseCartQuantity = (id:number)=>{
//         setCartItems(currItems => {
//             if(currItems.find(item => item.id === id) == null ){
//                 return [...currItems, {id, quantity: 1}]
//             }
//             else{
//                 return currItems.map((item) => {
//                     if(item.id === id){
//                         return {...item, quantity: item.quantity + 1}
//                     }
//                     else{
//                         return item
//                     }
//                 })
//             }
//         })
//     }


//     const decreaseCartQuantity = (id:number)=>{
//         setCartItems(currItems => {
//             if (currItems.find((item) => item.id === id)?.quantity === 1){
//                 return currItems.filter(item => item.id !== id)
//             }
//             else{
//                 return currItems.map((item) => {
//                     if(item.id === id){
//                         return { ...item, quantity: item.quantity - 1}
//                     }
//                     else {
//                         return item
//                     }
//                 })
//             }
//         })
//     }


//     const removeFromCart = (id:number)=>{
//         setCartItems(currItems => {
//             return currItems.filter(item => item.id !== id)
//         })
//     }

 
//     return (
//         <ShoppingCartContext.Provider value={{ getItemQuantity,increaseCartQuantity, decreaseCartQuantity, removeFromCart }} >
//             {children}
//         </ShoppingCartContext.Provider>
//     )
// }