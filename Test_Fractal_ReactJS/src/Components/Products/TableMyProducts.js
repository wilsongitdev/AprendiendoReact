import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import { url } from '../../constants/url';
  
function TableMyProducts(){
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

    const [open, setOpen] = useState(false); // OPEN EDIT
    const [open2, setOpen2] = useState(false);// OPEN DELETE
    const [open3, setOpen3] = useState(false);// OPEN ADD
    const [listProdutcs, setListProducts] = useState([]);
    const [productSelected, setproductSelected] = useState({});
    const { handleSubmit, control, setValue, reset } = useForm();


    const openModalDeleteProduct = (roworder) => {
        setOpen2(true);
        setproductSelected(roworder);       
    };

    const openModalEditProduct = (roworder) => {
        reset()
        setValue("idProductD",roworder.idProductD)
        setValue("nameD",roworder.nameD)
        setValue("unitPriceD",roworder.unitPriceD)
        setValue("quantityD",roworder.quantityD)
        setOpen(true);
    }

    const openModalAddProduct = () => {
        reset()
        setOpen3(true)
    }

    const confirmEditProduct = (data) => {

        data.unitPriceD = Number(data.unitPriceD);
        data.quantityD = Number(data.quantityD);

        fetch(`${url}/product/update`,{
            method:"PUT", 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 200){
                reset();
                setOpen(false);
                alert("The product has been edited succesfully");
            }
            
        });
    }

    const confirmDeleteProduct = (id) => {
        fetch(`${url}/product/delete/${id}`,{
            method:"DELETE"
        }).then(res => {
            if (res.status === 200) {
                setOpen2(false);
                alert("The product has been deleted succesfully");
            }
        })
        
    }
    
    const confirmAddProduct = (data) => {
        data.unitPriceD = Number(data.unitPriceD);
        data.quantityD = Number(data.quantityD);

        fetch(`${url}/product/add`,{
            method:"POST", 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status === 201){
                reset();
                setOpen3(false);
                alert("The product has been added succesfully");
            }
            
        });

    }
    useEffect(()=>{
        if (!open && !open2 && !open3){
            fetch(`${url}/product/all`).then(res=>res.json()).then(result => {
                result.sort(function(a, b){return a.idProductD - b.idProductD});
                setListProducts(result)
            });
        }

    },[open,open2,open3])
    return(
        <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">unitPrice</TableCell>
                        <TableCell align="center">quantity Available</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {listProdutcs.map((row, key) => (
                            <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="right">{row.idProductD}</TableCell>
                            <TableCell align="right">{row.nameD}</TableCell>
                            <TableCell align="right">{row.unitPriceD}</TableCell>
                            <TableCell align="right">{row.quantityD}</TableCell>
                            <TableCell align="right">

                                    <Link to={"/"}>
                                        
                                    </Link>
                                    <Button variant="contained" onClick={() => openModalEditProduct(row)}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={()=>openModalDeleteProduct(row)}>delete</Button>
                                
                            </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link><Button variant="contained" onClick={() => openModalAddProduct()}>Add Product</Button></Link>
                
            </TableContainer>
            
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Product
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                Name
                            </Grid>
                            <Grid item xs={8}>
                            <Controller
                                name="nameD"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    label="Name"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    autoComplete="off"
                                    inputProps={{ min: '0' }}
                                    {...field}
                                    

                                />
                            }
                            />
                                
                            </Grid>  
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                UnitPrice
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="unitPriceD"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        label="Unit Price"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{ min: '0' }}
                                        {...field}
                                    />
                                }
                                />
                                
                            </Grid>  
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                quantity Available
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="quantityD"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        label="Quantity Available"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{ min: '0' }}
                                        {...field}
                                    />
                                }
                                />
                                
                            </Grid>  
                        </Grid>
                        <Button variant="contained" 
                            color="success" 
                            fullWidth 
                            style={{"marginTop": "10px"}}
                            onClick={handleSubmit(confirmEditProduct)}
                        >Confirm and Save
                        </Button>
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={() => setOpen2(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete Product
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do you want to delete the product n° {productSelected?.idProductD}?
                    </Typography>
                    <Typography>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={() => confirmDeleteProduct(productSelected.idProductD)}>Delete Product</Button>
                    </Typography>
                    
                </Box>
            </Modal>

            <Modal
                open={open3}
                onClose={() => setOpen3(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Product
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                Name
                            </Grid>
                            <Grid item xs={8}>
                            <Controller
                                name="nameD"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => 
                                <TextField
                                    id="standard-basic"
                                    variant="standard"
                                    label="Name"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ min: '0' }}
                                    {...field}
                                />
                            }
                            />
                                
                            </Grid>  
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                UnitPrice
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="unitPriceD"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        label="Unit Price"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{ min: '0' }}
                                        {...field}
                                    />
                                }
                                />
                                
                            </Grid>  
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                quantity Available
                            </Grid>
                            <Grid item xs={8}>
                                <Controller
                                    name="quantityD"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => 
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        label="Quantity Available"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{ min: '0' }}
                                        {...field}
                                    />
                                }
                                />
                                
                            </Grid>  
                        </Grid>
                        <Button variant="contained" 
                            color="success" 
                            fullWidth 
                            style={{"marginTop": "10px"}}
                            onClick={handleSubmit(confirmAddProduct)}
                        >Confirm and Save
                        </Button>
                    </Typography>
                    
                </Box>
            </Modal>
            
        </section>
        
        
    );
}
export default TableMyProducts;