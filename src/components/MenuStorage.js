import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import foodImg from '../pexels-jonathan-borba-2983101.jpg';
import { Link } from "react-router-dom";

export const MenuStorage = () => {

    const getLocalName =()=>{
        let localList = localStorage.getItem('name');
    
        if (localList!==[]&&localList!==null){
            return JSON.parse(localStorage.getItem('name'));
        } else {
            return [];
        }
    }
    
    const getLocalPrice =()=>{
        let localList = localStorage.getItem('price');
    
        if (localList!==0&&localList!==null){
            return JSON.parse(localStorage.getItem('price'));
        } else {
            return 0;
        }
    }

    const [items, setItems] = useState([]);

    const [price, setPrice] = useState(getLocalPrice());
    const [list, setList] = useState(getLocalName());
    
    const Add = (elem) => {
        setList([...list, elem]);
        setPrice(price+elem.price);
    }

    const Delete= (elem,indx) => {
      setList(list.filter((e,index) => {
        return index !== indx;
      }));
      setPrice(price-elem.price);
    }

    useEffect(() => {
        localStorage.setItem("name",JSON.stringify(list))
    }, [list]);

    useEffect(() => {
        localStorage.setItem("price",JSON.stringify(price))
    }, [price]);

    const getMenu = async () => {
        const response = await fetch('https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7');
        setItems(await response.json());
    }

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <div className="container-fluid row " >
            
            
            <div className="container-fluid col-sm column text-center mt-3 rounded menu"><h2>Menu Items</h2>
                {
                    items.slice(0, 5).map((currElem,index) => {
                        return (
                            <div className="col-30 col-md-15 m-5 p-3 rounded innerbox" key={index}>
                                <div className="congrid m-1 boxname">
                                    <h4>{currElem.item_name}</h4>
                                </div>
                                <div className="congrid m-2">
                                    <h5>Price:<br/>₹{currElem.price}</h5>
                                </div>
                                <div className="congrid m-1">
                                    <Button variant="btn btn-primary" onClick={()=>Add(currElem)}>Add</Button>
                                </div>
                                <img src={foodImg} className="img-thumbnail rounded float-right img-responsive smimg" alt="img not loading" />
                            </div>
                        )
                    })

                }
            </div>
            <div className="container-fluid col-sm column text-center mt-3 rounded cart" ><h2>Cart</h2>
                
                {
                    list.map((currElem,index) => {
                        return (
                            <div className="col-30 col-md-15 m-5 p-3 rounded innerbox" key={index}>
                                <div className="congrid m-1 boxname">
                                    <h4>{currElem.item_name}</h4>
                                </div>
                                <div className="congrid m-2">
                                    <h5>Price:<br/>₹{currElem.price}</h5>
                                </div>
                                <div className="congrid m-1">
                                    <Button variant="btn btn-danger" onClick={()=>Delete(currElem,index)}>Remove</Button>
                                </div>
                                <img src={foodImg} className="img-thumbnail rounded float-right img-responsive smimg" alt="img not loading" />
                            </div>
                        )
                    })
                } <div className="spacecbetween"> <h3 >Subtotal:</h3><h3>₹{price}</h3></div>
                <Link to="/Cart"><Button variant="btn btn-success" className="w-50 mb-3 p-2 checkout">Checkout</Button></Link><br/>
            </div>
            
        </div>
    )
}

