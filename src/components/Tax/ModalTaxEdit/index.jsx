import React, {useState, useEffect} from "react";

import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {getTax } from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";

import TaxUpdateService from "@/services/useTax/update";

import InputCuston from "@/components/InputCuston";

export default function EditProduct( props ) {


    const [valor, setValor] = useState( '')
    const [category_select, setCategory] = useState( 1);
    const [error_modal, setErrorModal] = useState('')

    const [id, setId] = useState(false);

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setId(props.id)};


    const  products_id = props?.id;
    console.log( products_id );

    const handleChangeSelect = (event) => { setCategory(event.target.value); };


    const update_f = (e) => {
        e.preventDefault();

        let data = {
            id_category: category_select,
            valor:  valor,
            enabled: !!id,

        };


        TaxUpdateService.update(id, data)
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

    const [find_tax] =
        useQueries({
            queries: [
                {
                    queryKey: ["Find Tax"],
                    queryFn: () => getTax(),
                },
            ],
        });

    const filterProductsByIdCerto = (tax) => {
        return tax
            ?.filter((tax) => tax.id === id)
            ?.map((tax) => ({ id: tax.id, id_category: tax.id_category,  valor: tax.valor   }));
    };


    const filteredProducts = filterProductsByIdCerto(find_tax.data);

    console.log(filteredProducts);


    useEffect(() => {
        if (id) {
            setCategory(filteredProducts[0]?.id_category)
            setValor(filteredProducts[0]?.valor)
        }
    }, [id]);

    if (find_tax.isLoading) return "Carregando categorias unicas...";
    if ( find_tax.error ) return find_tax.error.message;

    return (
        <>
            <Button  className='me-2' onClick={handleShow} data-edit={id}>Editar</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto {filteredProducts[0]?.id_category}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        submit={update_f}

                    >

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