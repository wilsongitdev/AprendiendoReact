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
import { url } from '../../constants/url';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

  
function TableMyOrders(){
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
    const [listOrders, setListOrders] = useState([]);

    const [orderstate, setorderstate] = useState(-1);
    const [orderSelected, setorderSelected] = useState({});
    const listStatus = ["Pending", "InProgress", "Completed"];

    const handleOpenandsend = (roworder) => {
        setOpen(true);
        setorderSelected(roworder);

    };
    const handleOpenandEditState = (roworder) => {
        setOpen2(true);
        setorderSelected(roworder);
        setorderstate(roworder.stateOrder);

    }

    const handleSelectChange = (e) =>{
        setorderstate(e.target.value);
    }

    const handleClose = () => {
        setOpen(false);
        setorderstate(-1)
    };

    const deleteorder = (id) => {

        fetch(`${url}/order/delete/${id}`,{
                method:"DELETE"
        }).then(res => {
            handleClose();
        });
        

    }
    const confirmEditStatus = () => {

        let dataSend = orderSelected;
        dataSend.orderState = orderstate;
        dataSend.products = []

        fetch(`${url}/order/update`,{
            method:"PUT", 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(dataSend)
        }).then(res => {
            setOpen2(false);
        });
    }
    useEffect(()=>{

            fetch(`${url}/order/all`).then(res=>res.json()).then(result => {
                result.sort(function(a, b){return a.idOrderD - b.idOrderD});
                setListOrders(result)
            });

        
    },[])
    return(
        <section>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell> ID</TableCell>
                        <TableCell align="center">Order #</TableCell>
                        <TableCell align="center">date</TableCell>
                        <TableCell align="center">#Products</TableCell>
                        <TableCell align="center">Final price</TableCell>
                        <TableCell align="center">Order Status</TableCell>
                        <TableCell align="center">Options</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOrders.map((row) => (
                            <TableRow
                            key={row.idOrderD}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="right">{row.idOrderD}</TableCell>
                            <TableCell align="right">{row.numOrderD}</TableCell>
                            <TableCell align="right">{row.dateD}</TableCell>
                            <TableCell align="right">{row.numProductsD}</TableCell>
                            <TableCell align="right">{row.finalPriceD}</TableCell>
                            <TableCell align="right">{listStatus[row.orderState]}</TableCell>
                            <TableCell align="right">

                                    <Link to={listStatus[row.orderState] !== "Completed"?`/add-order/${row.idOrderD}`:"/"}>
                                        <Button variant="contained" onClick={listStatus[row.orderState] !== "Completed"?null:() => alert("It is not possible to edit completed orders")}>Edit</Button>
                                    </Link>

                                    <Button variant="contained" color="error" onClick={()=>handleOpenandsend(row)}>delete</Button>
                                    <Button variant="contained" color="secondary" onClick={()=>handleOpenandEditState(row)}>EditStatus</Button>
                                
                            </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link to={`/add-order/:id`}><Button variant="contained">Add Order</Button></Link>
                
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete Order
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to delete the order n° {orderSelected?.idOrderD}?
                    </Typography>
                    <Typography>
                        <Button variant="contained" startIcon={<DeleteIcon />} 
                            color="error" 
                            onClick={() => deleteorder(orderSelected.idOrderD)}>
                            Delete Order
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
                    Edit State
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            Order Status
                        </Grid>
                        <Grid item xs={8}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={orderstate}
                                label="Status"
                                onChange={(e)=>handleSelectChange(e)}
                                fullWidth
                            >
                                <MenuItem value={-1}></MenuItem>
                                {listStatus.map((item, key)=>
                                <MenuItem value={key}>{item}</MenuItem>
                                )}
                                
                            </Select>
                        </Grid>
                        
                    </Grid>

                    </Typography>
                    <Typography>
                    <Button variant="contained" 
                        color="success" 
                        fullWidth 
                        style={{"margin-top": "10px"}}
                        onClick={confirmEditStatus}>Confirm and Save
                    </Button>
                    </Typography>
                    
                </Box>
            </Modal>
        </section>
        
        
    );
}
export default TableMyOrders;