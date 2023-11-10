import React, { Component } from 'react';
import Lista from './Lista';
import './SelLista.css';
class SelLista extends Component {
    constructor(props){
        super(props)
        this.state = {
            categoriaElegida: ""
        }
        console.log("CONSTRUCTOR")
    }
    seleccionarcategoria(id){
        console.log(id)
        if(this.state.categoriaElegida !== ""){    
            document.getElementById(this.state.categoriaElegida).classList.remove("active")
        }
        this.setState({
            categoriaElegida: id
        })
        document.getElementById(id).classList.add("active")
    }  
    dibujarcuadricula(){

        const elementos=["Inactivo","Activo","Pendiente validación inicial","Rechazo Inicial","Pagar Despues",
                "Deuda 1","Deuda 2","Deuda 3","PreLiquidación","Congelado","Pendiente de Validación Cuota",
                "Rechazo Cuota","Suscripción Finalizada","Pendiente Validación Migración","Rechazo Migración",
                "Liquidación"]
        const items = []
        for (const [index] of elementos.entries()) {
            items.push(<li key={index} className="list-group-item" id={elementos[index]} 
            onClick={() => this.seleccionarcategoria(elementos[index])}>{elementos[index]}</li>)
        }
        return(
            <div>
                {items}
            </div>
        )
    
    }
    
    render() {
    let dibujarlistaelegir=this.dibujarcuadricula()
    let dibujarlistausuario = <Lista categoriaSeleccionada={this.state.categoriaElegida}/>
    return (
        <section id='lista'>
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <h3>Seleccionar estado(click)</h3>
                        <ul className="list-group">
                            {dibujarlistaelegir}
                        </ul>
                    </div>
                    <div className="col-md-10">
                            {dibujarlistausuario}
                    </div>
                </div>
        </div>
        </section>
    );
    }

}

export default SelLista;
