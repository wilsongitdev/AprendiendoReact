import React, { Component } from 'react';
import { ApiWebUrl, APP_ID} from '../Utils';
import preloader from '../assets/loader.gif';
import './Post.css';
import axios from 'axios';
class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaPost: [],
            cargando: true
        }
    }
    


    componentDidMount(){
        axios.get(ApiWebUrl+'post/?limit=10', { 
            headers: { 'app-id': APP_ID }
        })
        .then(
            (result) => {
                console.log(result.data.data);
                //La variable result contiene los datos que envia el servicio web
                this.setState({
                    listaPost: result.data.data,
                    cargando: false
                })
                
            }
            
        )
        .catch(function (error) {
            console.log(error);
        });
        
    }
    dibujarCuadricula(datosTabla){
        return(
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {datosTabla.map(datosPost =>
                    <div className="col"  key={datosPost.id}>
                        <div className="card" style={{maxHeight: 540}}>
                            
                        
                            <div class="card mb-3">
                                <div className="row g-0 tam" >
                                    <div className="col-md-2">
                                    <img src={datosPost.owner.picture} style={{maxHeight: 50}} alt={datosPost.owner.title} />
                                    </div>
                                    <div className="col-md-10">
                                        <div className="card-body" style={{maxHeight: 50}}>
                                            <small>{datosPost.owner.firstName} {datosPost.owner.lastName}</small><br/>
                                            <small >{datosPost.owner.email}</small>
                                        </div>
                                    </div>
                                </div>

                            </div> 
                            <img src={datosPost.image} style={{maxHeight: 250}} className="card-img-top" alt= {datosPost.nombres}/>
                            <div className="card-body">
                                
                                 <h5 className="card-title"><a href="#cero">{datosPost.tags[0]}</a>,<a href="#uno">{datosPost.tags[1]}</a>,
                                 <a href="#dos">{datosPost.tags[2]}</a>
                                 </h5>
                                <h6 className="card-text">{datosPost.text}</h6>
                                <h6 className="card-text">{datosPost.publishDate}</h6>
                                <a href="link"><h6 className="card-text">{datosPost.link}</h6></a>
                                <small className="card-text">{datosPost.likes} likes</small>
                            
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    dibujarModal(){
        return(
            <div className="modal fade" id="modalActualizar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-2">
                            <input type="text" className="form-control" disabled
                                value={this.state.categoriaSeleccionadaIdcategoria} />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Nombre" 
                                required minLength="3" maxLength="15"
                                value={this.state.categoriaSeleccionadaNombre} 
                                onChange = { (e) => this.setState({categoriaSeleccionadaNombre: e.target.value})} />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control" placeholder="Descripción"
                                required minLength="3"
                                value={this.state.categoriaSeleccionadaDescripcion} 
                                onChange = { (e) => this.setState({categoriaSeleccionadaDescripcion: e.target.value})} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick = {(e) => this.categoriaActualizar()} >Actualizar</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    
    
    
    render() {
        let contenidoCuadricula = this.state.cargando===true?
            <img src={preloader} alt=""/>
            :this.dibujarCuadricula(this.state.listaPost)
        return (
            <section id="envios" className="padded">
            <div className="container">
                <div className="row">
                    <h2>Últimas publicaciones</h2>
                    {contenidoCuadricula}                        
                </div>
            </div>
        </section>
        );
    }
}


export default Post;