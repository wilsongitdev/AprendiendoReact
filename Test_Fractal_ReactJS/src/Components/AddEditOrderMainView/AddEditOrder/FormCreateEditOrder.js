import {useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



export default function FormCreateEditOrder(props){
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = useState(false);
    const [productSelected, setProductSelected] = useState({});
    const [quantity, setquantity] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        setquantity(0);
        setProductSelected({});
    };

    const handleSelectChange = (e) => {

        props.listAllProduct.forEach((item) => {

            if (item.idProductD === e.target.value) {
                
                productSelected.idProductD = e.target.value;
                productSelected.unitPriceD = item.unitPriceD;
                productSelected.nameD = item.nameD;
                productSelected.quantityD = item.quantityD;
                setProductSelected(productSelected);
            }
        })

    };


    const handleChangeQuantity = (e) =>{
        setquantity(e.target.value);
    };

    const btnConfirmAndSave = () => {
        

        if (productSelected !=={} && quantity > 0){
            
            props.setnumProduct(props.numProductsD +1);
            const objprodadded = {
                productId: productSelected.idProductD,
                quantityBuy: Number(quantity),
                totalBuy: productSelected.unitPriceD * Number(quantity),
                name: productSelected.nameD,
                unitPriceD: productSelected.unitPriceD,
                quantityD: productSelected.quantityD
            };
            
            props.products.push(objprodadded);
            props.listAllProduct.forEach((item) => {
                let isinarray = false
                props.products.forEach((item2) =>{   
                    if (item.idProductD === item2.productId) isinarray = true;
                })
                //if (!isinarray) auxList.push(item) 
                if (!isinarray) item.wasSelected = false;
                else item.wasSelected = true;
            })
            props.setlistAllProducts(props.listAllProduct);
            setOpen(false);

        }
        
    };


    return (
        <section>
            <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
                Order #
            </Grid>
            <Grid item xs={8}>

            <TextField
                id="standard-basic"
                variant="standard"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: '0' }}
                onChange= {(e) => props.setorderNumber(e.target.value)}
                value= {props.numOrderD}
                />
                
            </Grid>
            <Grid item xs={4}>
              Date
            </Grid>
            <Grid item xs={8}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                    label="Current Date"
                    disabled
                    inputFormat="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                    value={props.dateD}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              #Products
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    label="# Products"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ min: '0' }}
                    disabled
                    value= {props.numProductsD}
                />
            </Grid>
            <Grid item xs={4}>
              Final Price
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="standard-basic"
                    variant="standard"
                    label="Final Price"
                    type="number"
                    disabled
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ min: '0' }}
                    value = {props.finalPriceD}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" size="large" onClick={handleOpen}>Add new Product</Button>
            </Grid>
          </Grid>
        </Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Agregar Producto
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            Product
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productSelected.idProductD}
                                label="Age"
                                onChange={(e)=>handleSelectChange(e)}
                                fullWidth
                            >
                                {props?.listAllProduct?.map((item,key)=>{
                                    if (!item.wasSelected){
                                        return <MenuItem value={item.idProductD}>{item.nameD}</MenuItem>;
                                    }
                                    return null;
                                }
                                )}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            Quantity
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                label="Qty required"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ min: '0' }}
                                value={quantity}
                                onChange={(e) => handleChangeQuantity(e)}
                            />
                        </Grid>
                    </Grid>

                    </Typography>
                    <Typography>
                    <Button variant="contained" 
                        color="success" 
                        fullWidth 
                        style={{"margin-top": "10px"}}
                        onClick={btnConfirmAndSave}>Confirm and Save
                    </Button>
                    </Typography>
                    
                </Box>
            </Modal>
        </section>
        
      );
}