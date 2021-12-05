import React, {useState , useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import foodImg from '../pexels-jonathan-borba-2983101.jpg';

export const Cart = () => {

    const getLocalName =()=>{
        let localList = localStorage.getItem('name');
    
        if (localList){
            return JSON.parse(localStorage.getItem('name'));
        } else {
            return [];
        }
    }
    
    const getLocalPrice =()=>{
        let localList = localStorage.getItem('price');
    
        if (localList){
            return JSON.parse(localStorage.getItem('price'));
        } else {
            return 0;
        }
    }

    const [price, setPrice] = useState(getLocalPrice());
    const [list, setList] = useState(getLocalName());

    const Delete= (elem,indx) => {
        setList(list.filter((e,index) => {
          return index !== indx;
        }));
        setPrice(price-elem.price);
    }
    
    useEffect((elem) => {
        if(elem!==undefined){
            setList([...list,elem]);
        }
    }, []);

    const Discount=(discountprice)=>{
        if (price>500){
            discountprice=0.8*price;
            return discountprice;
        }else {
            if(price>100){
                discountprice=0.9*price;
                return discountprice;
            }
        }
            discountprice=price;
            return discountprice;
    }
    
    useEffect(() => {
        localStorage.setItem("name",JSON.stringify(list))
    }, [list])

    useEffect(() => {
        localStorage.setItem("price",JSON.stringify(price))
    }, [price])

    return (
        <div className="container-fluid row " >

            <div className="container-fluid col-sm column rounded text-center mt-3 " ><h2>Items in your cart</h2>
                {
                    list.map((currElem,index) => {
                        return (
                            <div className="col-30 col-md-15 mt-5 p-3 rounded innerbox" key={index}>
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
                }
            </div>

            <div className="container-fluid col-sm column text-center rounded mt-3 p-3 cart">
                <div><h2>Cart Summary</h2></div>
                <div className="col-30 col-md-15 m-5 p-3 column rounded ">
                    <div className="spacecbetween">
                        <h4>Subtotal:</h4><h4>₹{price}</h4>
                    </div>
                    <div className="spacecbetween">
                        <h4>Discount:</h4><h4>₹{price-parseInt(Discount(price))}</h4>
                    </div><hr/>
                    <div className="spacecbetween">
                        <h4>Total:</h4><h4>₹{parseInt(Discount(price))}</h4>
                    </div>
                <div>
                    <Link to="/"><Button variant="btn btn-primary" > Back to Menu </Button></Link>
                </div>
                </div>
            </div>

        </div>
    )
}
