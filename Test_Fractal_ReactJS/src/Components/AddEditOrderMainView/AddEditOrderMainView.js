import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { formatDate } from "../../functions/DateFunctions";
import { url } from "../../constants/url";
import Button from '@mui/material/Button';
import FormCreateEditOrder from "./AddEditOrder/FormCreateEditOrder";
import TableProductsAvailable from "./AddEditOrder/TableProductsAvailable";

export default function AddEditOrderMainView() {
    const idPath = window.location.pathname.split("/")[2];
    const [dateString] = useState(formatDate(new Date()));
    const [numProduct, setnumProduct] = useState(0);
    const [listProduct, setlistProduct] = useState([]);
    const [listAllProduct, setlistAllProducts] = useState([]);
    const [orderNumber, setorderNumber] = useState(0);  
    const [finalPriceD, setfinalPrice] = useState(0); 
    const [stateOrder, setstateOrder] = useState();  
    
    
    const propsApiOrder = {
        // completed
        dateD: dateString,
        // to complete
        numOrderD: orderNumber,
        setorderNumber: setorderNumber,
        numProductsD: numProduct,
        setnumProduct:setnumProduct,
        finalPriceD: finalPriceD,
        setfinalPrice: setfinalPrice,
        stateOrder: stateOrder,
        setstateOrder: setstateOrder,
        products: listProduct,
        setlistProduct: setlistProduct
    };
    console.log(propsApiOrder)
    useEffect(() => {

        Promise.all([
            fetch(`${url}/product/available/all`).then(res => res.json()),
            fetch(`${url}/order/${idPath}`).then(res => res.json())
        ]).then(([res1, res2]) =>{

            if (res2.idOrderD) {
                
                setfinalPrice(res2.finalPriceD);
                setnumProduct(res2.numProductsD);
                setorderNumber(res2.numOrderD);
                setlistProduct(res2.products);

                res1.forEach((item) => {
                    let isinarray = false
                    res2.products.forEach((item2) =>{   
                        if (item.idProductD === item2.productId) isinarray = true;
                    })
                    //if (!isinarray) auxList.push(item) 
                    if (!isinarray) item.wasSelected = false;
                    else item.wasSelected = true;
                })
                console.log(res1)
                setlistAllProducts(res1);
            }
            else{
                setlistAllProducts(res1);
            }
            
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const EditSaveOrder = () => {

        
        let totalBuy = 0;
        propsApiOrder.products.forEach((item) => {
            totalBuy += item.totalBuy;
        })

        const dataOrderAddEdit = {
            numOrderD: Number(propsApiOrder.numOrderD),
            dateD: propsApiOrder.dateD,
            numProductsD: propsApiOrder.numProductsD,
            finalPriceD: totalBuy,
            orderState: 0,
            products: propsApiOrder.products
        };
        console.log(dataOrderAddEdit)

        
        
        // task: add api to update product table Qty and Total Price	
        if (idPath === ":id"){ // Add
            fetch(`${url}/order/add`,{
                method:"POST", 
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(dataOrderAddEdit)
            })
            propsApiOrder.products.forEach((item) => {
                const dataProductUpdate = {
                    idProductD: item.productId,
                    nameD: item.name,
                    unitPriceD: item.unitPriceD,
                    quantityD: item.quantityD - item.quantityBuy,
                };
                fetch(`${url}/product/update`,{
                    method:"PUT", 
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(dataProductUpdate)
                }).then(res => res.json()).then(result => console.log("The order was added successfully"))
            })
        
            
        }
        
        else { // Edit
            dataOrderAddEdit.idOrderD = Number(idPath);
            fetch(`${url}/order/update`,{
                method:"PUT", 
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(dataOrderAddEdit)
            }).then(res => res.json()).then((result) => {
                console.log("The order was edited successfully")
            })
        }

    }


    return(
        <section>
            <div className="padded titlebgcolor">
                <Container maxWidth="sm" style={{"textAlign": "center"}}>
                    {idPath !== ":id"?<h1>Edit Order</h1>:<h1>Add Order</h1>}
                </Container>
            </div>
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"textAlign": "center", 
                "backgroundColor":"rgb(235 227 227)", "padding": "20px"}}>
                    <FormCreateEditOrder
                        {...propsApiOrder}
                        listAllProduct = {listAllProduct}
                        setlistAllProducts = {setlistAllProducts}
                        idPath = {idPath}
                    />

                </Container>
            </div>

            <div className="padded titlebgcoloravprod">
                <Container maxWidth="sm" style={{"text-align": "center"}}>
                    <h1>Available Products</h1>
                </Container>
            </div>
            <div className="padded tablecolor">
                <Container maxWidth="md" style={{"text-align": "center"}}>
                    <TableProductsAvailable
                        {...propsApiOrder} 
                        listAllProduct = {listAllProduct}
                        setlistAllProducts = {setlistAllProducts}
                        idPath = {idPath}
                    />
                </Container>
            </div>
            <div className="padded">
                <Container maxWidth="sm" style={{"textAlign": "center"}}>
                    <Button variant="contained" fullWidth onClick={EditSaveOrder}>Edit/Save Order</Button>
                </Container>
            </div>
        </section>
    );
}


                //para editar producto - puntos extras
// fetch(`${url}/product/${e.target.value}`).then(res => res.json()).then((result) => {
//     setProductSelected(result)
// })
