import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getProducts, getCategory, getTax, getFindProducts } from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";
import ProductsDeleteService from "@/services/useProducts/delete";
import ProductsUpdateService from "@/services/useProducts/update";

import {getLocalStorage} from "@/util/Helpers";
import InputCuston from "@/components/InputCuston";



export default function EditProduct( props ) {

    const [nome, setNome] = useState('')
    const [valor, setValor] = useState( '')
    const [category_select, setCategory] = useState( 1);

    const [error_modal, setErrorModal] = useState('')

    const [id, setId] = useState(false);

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setId(props.id)};


    const handleChangeSelect = (event) => { setCategory(event.target.value); };


    const update_f = (e) => {
        e.preventDefault();

        let data = {
            nome: nome,
            valor:  valor,
            category_id:  category_select,
        };


        ProductsUpdateService.update(id, data)
            .then((response) => {
                setErrorModal(JSON.stringify(response));

                console.log( JSON.stringify(response));

                response.message === 'success' ?  setTimeout(window.location.reload(), 1000) : '';
            })
            .catch((error, response) => {
                setErrorModal(JSON.stringify(response));

                console.log( JSON.stringify(response))
            })
    }

    const [find_products] =
        useQueries({
            queries: [
                {
                    queryKey: ["Products"],
                    queryFn: () => getProducts(),
                    enabled: !!id,

                },
            ],
        });


    const filterProductsByIdCerto = (products) => {
        return products
            .filter((product) => product.id === id)
            .map((product) => ({ id: product.id, nome: product.nome,  valor: product.valor, category_id: product.category_id }));
    };


    const filteredProducts = filterProductsByIdCerto(find_products.data);

    console.log(filteredProducts);


    useEffect(() => {
        if (id) {
            setNome(filteredProducts[0]?.nome)
            setValor(filteredProducts[0]?.valor)
            setCategory(filteredProducts[0]?.category_id)
        }
    }, [ id]);

    if (find_products.isLoading) return "Carregando produtos unicos...";
    if ( find_products.error ) return find_products.error.message;




    return (
        <>
            <Button  className='me-2' onClick={handleShow} data-edit={id}>Editar {id}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto {filteredProducts[0]?.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        submit={update_f}

                    >
                        <InputCuston
                            defaultValue={filteredProducts[0]?.nome}
                            name = "nome"
                            placeholder ="Nome do produto"
                            value = {nome}
                            type="text"
                            handleOnchange = {e => setNome(e.target.value)}
                            className="form-control"

                        />

                        <InputCuston
                            defaultValue={filteredProducts[0]?.valor}
                            name = "valor"
                            placeholder ="Valor do produto"
                            value = {valor}
                            type="number"
                            handleOnchange = {e => setValor(e.target.value)}
                            className="form-control"

                        />

                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control aria-label="Default select example" as="select"   custom value={category_select}  onChange={handleChangeSelect}>
                                {props.category_options?.map( function ( item, i ) {
                                    return (
                                        <option key={`teste_${i}`} value={item.id} onChange={handleChangeSelect}>{item.nome}</option>
                                    )})}

                            </Form.Control>
                        </Form.Group>

                        <div className='alert-danger fs-6 text-break'>{error_modal}</div>
                        <div className="mt-3 uk-width-1-1 ">
                            <input onClick={update_f} type='submit' className='btn btn-primary'   value='Enviar' />
                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Sair
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    );
}