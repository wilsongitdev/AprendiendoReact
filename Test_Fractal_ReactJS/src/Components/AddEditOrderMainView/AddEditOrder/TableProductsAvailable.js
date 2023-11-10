import {useState} from 'react'
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';

import { url } from '../../../constants/url';

export default function TableProductsAvailable(props) {

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
    const [open2, setOpen2] = useState(false);
    const [quantity, setquantity] = useState(0);
    const [productById, setProductById] = useState([]);
    const [idselected, setidSelected] = useState(0);

    
    const openModalEditProduct = (row) => {
        setOpen(true);
        fetch(`${url}/product/${row.idProductD}`).then(res => res.json()).then((result) => {
            
            setProductById(result)

        })
    }

    const openModalDeleteProduct = (row) => {
        setOpen2(true);
        setidSelected(row.idProductD);
    }

    const handleChangeQuantity = (e) =>{
        setquantity(e.target.value);
    };


    
    const btnConfirmAndSaveEdit = () => {

            
        // Hacer el for each  de todos  los productos del componenete padre 
        const quantityNumber = Number(quantity);

        props.products.forEach((item,index) => {
            if (item.productId === productById.idProductD){
                props.products[index].quantityBuy = quantityNumber;
                props.products[index].totalBuy = quantityNumber * productById.unitPriceD; 
            }
        })
        
        // props.listAllProduct.forEach((item) => {
        //     if (item.idProductD === productById.idProductD){
        //         props.listAllProduct.quantity =  props.listAllProduct.quantity - quantityNumber ;
        //     }
        // })
        props.setlistProduct(props.products)

        setOpen(false);

    }
    
    const btnConfirmAndSaveDelete = (idProduct) => {

        props.products.forEach((item,index) => {
            if (item.productId === productById.idProductD){
                props.products[index] = [];
            }
        })
        props.setlistProduct(props.products)

        setOpen2(false);
    }


  return (
    <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">UnitPrice</TableCell>
                        <TableCell align="center">Qty</TableCell>
                        <TableCell align="center">Total Price</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.listAllProduct.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.idProductD}
                            </TableCell>
                            <TableCell align="right">{row.nameD}</TableCell>
                            <TableCell align="right">{row.unitPriceD}</TableCell>
                            <TableCell align="right">{row.quantityD}</TableCell>
                            <TableCell align="right">{row.unitPriceD * row.quantityD}</TableCell>
                            <TableCell align="right">

                                    <Button variant="contained"  onClick={row.wasSelected?()=>openModalEditProduct(row):null}>Edit Product</Button>

                                    <Button variant="contained" color="error" onClick={()=>openModalDeleteProduct(row)}>delete</Button>
                                
                            </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
            </TableContainer>

                <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h1">
                        Edit Product Added
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={4}>
                            quantityBuy
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
                        onClick={btnConfirmAndSaveEdit}>Confirm and Save
                    </Button>
                    </Typography>
                    
                </Box>
            </Modal>
            <Modal
                open={open2}
                onClose={()=> setOpen2(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                            Delete Product Added
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to delete the product n° {idselected}?
                    </Typography>
                    <Typography>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={() => btnConfirmAndSaveDelete(idselected)}>Quitar orden</Button>
                    </Typography>
                    
                </Box>
                </Modal>
        </section>
  );
}
