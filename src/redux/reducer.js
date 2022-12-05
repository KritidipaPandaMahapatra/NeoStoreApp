const initialState={
    items: {},
    obj:{},
    cartdata:{},
    cartItems:{},
    orderdata:{},
    orderItems:{}
    };

export const mainReducer=(state=initialState,action)=>{
    switch(action.type){

        case "SUBMITDATA" :
            const {allData} =action.payload;
            if(!allData){
                alert('No Data Added')
            }else{
                return{
                    ...state,
                    items:allData,
                }
            }

            case "DASHBOARDDATA" :
            const {products} =action.payload;
            if(!products){
                alert('No Data Added')
            }else{
                return{
                    ...state,
                    obj:products,
                }
            }

            case "ALLPRODUCTDATA" :
                const {allproducts} =action.payload;
                if(!allproducts){
                    alert('No Data Added')
                }else{
                    return{
                        ...state,
                        products:allproducts,
                    }
                }

                case "CARTDETAILS" :
                    const {cart} =action.payload;
                    if(!cart){
                        alert('No Data Added')
                    }else{
                        return{
                            ...state,
                            cartdata:cart,
                        }
                    }

    // case "DISPLAYDATA" :
    //     const {userData} =action.payload;
    //     if(!userData){
    //         alert('No Data Added')
    //     }else{
    //         return{
    //             ...state,
    //             userdata:userData,
    //         }
    //     }

        case "CARTPRODUCT" :
        const {data} =action.payload;
        if(!data){
            alert('No Data Added')
        }else{
            return{
                ...state,
                cartItems:data,
            }
        }
        case "PLACEORDER" :
        const {ordereddata} =action.payload;
        if(!ordereddata){
            alert('No Data Added')
        }else{
            return{
                ...state,
                orderdata:ordereddata,
            }
        }
        case "CONFIRMPLACEORDER" :
        const {orderedItems} =action.payload;
        if(!orderedItems){
            alert('No Data Added')
        }else{
            return{
                ...state,
                orderItems:orderedItems,
            }
        }
    default:state;
}     
}