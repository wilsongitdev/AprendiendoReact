import React, { Component } from 'react';
import './Lista.css';
import { ApiWebUrl } from '../Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar} from '@fortawesome/free-solid-svg-icons'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import logo from '../assets/barraloading.gif';

class Lista extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaUsuarios: [],
            listaCronograma: [],
            categoriaElegida: props.categoriaSeleccionada,
            ilogo:null
        }

    }
    componentDidMount(){

    }
    componentWillReceiveProps(props){

        console.log(props.categoriaSeleccionada)
        if(props.categoriaSeleccionada){
            this.obtenerUsuariosPorCategoria(props.categoriaSeleccionada)
        }
        this.setState({
            categoriaElegida: props.categoriaSeleccionada
        })
    }

    obtenerUsuariosPorCategoria = (itemCategoria) => {
        const rutaServicio =  ApiWebUrl + "suscription/all/state/15";
        this.setState({
            ilogo: true
        })
        //console.log(logo)
        fetch(rutaServicio)
        .then(
            res => res.json(),
            
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                
                console.log(result)
                
                //La variable result contiene los datos que envia el servicio web
                
                this.setState({
                    listaUsuarios: result,
                    ilogo: false
                })
                 
            }
        )
    }

    dibujarTabla(datosTabla){

        const vArray = datosTabla.objModel
        let t=this.state.categoriaElegida
        console.log(t)
        //JSON.parse(datosTabla.objModel);
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Cronograma</th>
                    </tr>
                </thead>
                <tbody>
                    {vArray.filter(f => f.userResponseDto.stateName===t).map(itemUsuario =>
                        <tr key={itemUsuario.id}>
                            <td>{itemUsuario.userResponseDto.name}</td>
                            <td>{itemUsuario.userResponseDto.lastname}</td>
                            <td>{itemUsuario.userResponseDto.nroTelf}</td>
                            <td>{itemUsuario.userResponseDto.email}</td>
                            <td className="alinear">
                                <FontAwesomeIcon icon={faCalendar} onClick={()=>this.mostrarCronograma()}/>
                         
                            </td>
                            
                        </tr>
                    )}    
                </tbody>
            </table>
        );
    }
    mostrarCronograma(){
        
        const rutaServicio1 =  ApiWebUrl + "payment/schedule/vouchers/383";
        //console.log(logo)
        fetch(rutaServicio1)
        .then(
            res => res.json(),
            
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result1) => {
                
                console.log(result1)
                
                //La variable result contiene los datos que envia el servicio web
                
                this.setState({
                    listaCronograma: result1,
                })
                 
            }
        )
        var myModal = new bootstrap.Modal(document.getElementById('modalCronograma'))
        myModal.show()
    }
    llenarpagos(listaCronograma){
        const vArray1 = listaCronograma.objModel
        let t1=5764
        console.log(vArray1)
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>NroOperación</th>
                        <th>Fecha Pago</th>
                        <th>Balance capital</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {vArray1.filter(f => f.idPayment===t1).map(itemUsuario =>
                        <tr key={itemUsuario.idPayment}>
                            <td>{itemUsuario.nroOperation}</td>
                            <td>{itemUsuario.payDate}</td>
                            <td>{itemUsuario.capitalBalance}</td>
                            
                            
                        </tr>
                    )}    
                </tbody>
            </table>
        );
    }
    dibujarModal(){
        let llenarpago="";
        if (this.state.listaCronograma.length!==0){
            llenarpago=this.llenarpagos(this.state.listaCronograma)
            console.log(this.state.listaCronograma)
        }
        
        return(
            <div className="modal fade" tabIndex="-1" id="modalCronograma">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title"> Cronograma de Pagos</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {llenarpago}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        );
    }
    dibujarlogo=()=>{
        return(
            <div>
            <img src={logo} alt="cargando" />
            </div>
        );
    }
    render() {
        let contenidoTabla = ""
        let contenidoModal = ""
        let contenidologo = ""
        if(this.state.listaUsuarios.length !== 0){
            contenidoTabla = this.dibujarTabla(this.state.listaUsuarios)
            contenidoModal =this.dibujarModal()
        }
        
        if (this.state.ilogo===true){
            contenidologo=this.dibujarlogo()
            contenidoTabla=""
        }
        else if(this.state.ilogo===false){
            contenidologo=<div></div>
            contenidoTabla = this.dibujarTabla(this.state.listaUsuarios)
        }
        
        return(
            <div>
                <div className="alinear">
                    <h3>Listado de Usuarios</h3>    
                </div>
                {contenidologo}
                {contenidoTabla}
                {contenidoModal}
            </div>
        );
    }
}

export default Lista;
