import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {getProducts, getCategory, getTax, getFindProducts, getUsers} from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";

import UsersUpdateService from "@/services/useUsers/update";

import {getLocalStorage} from "@/util/Helpers";
import InputCuston from "@/components/InputCuston";


export default function EditUser( props ) {

    const [nome, setNome] = useState('')

    const [error_modal, setErrorModal] = useState('')

    const [id, setId] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setId(props.id)};




    const [admin, setAdmin] = useState(false);


    const handleChange = e => {
        setAdmin( e.target.value );
    };


    const update_f = (e) => {
        e.preventDefault();

        let data = {
            admin:  admin ? 1 : 0,
        };


        UsersUpdateService.update(id, data)
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

    const [find_users] =
        useQueries({
            queries: [
                {
                    queryKey: ["Users"],
                    queryFn: () => getUsers(),
                    enabled: !!id,

                },
            ],
        });


    const filterProductsByIdCerto = (products) => {
        return products
            .filter((product) => product.id === id)
            .map((product) => ({ id: product.id, nome: product.nome,  admin: product.admin, email: product.email }));
    };


    const filteredProducts = filterProductsByIdCerto(find_users.data);

    console.log(filteredProducts);


    useEffect(() => {
        if (id) {
            setNome(filteredProducts[0]?.nome)
            setAdmin(filteredProducts[0]?.admin)
        }
    }, [ id]);

    if (find_users.isLoading) return "Carregando...";
    if ( find_users.error ) return find_users.error.message;

    return (
        <>
            <Button  className='me-2' onClick={handleShow} data-edit={id}>Editar {id}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuário {filteredProducts[0]?.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form submit={update_f}  >

                        {filteredProducts[0]?.admin }
                        <Form.Group controlId="Admin">
                            <Form.Check
                                value="true"
                                type="radio"
                                aria-label="radio 1"
                                label="Verdadeiro"
                                onChange={handleChange}
                                checked={filteredProducts[0]?.admin === true}
                            />
                            <Form.Check
                                value="false"
                                type="radio"
                                aria-label="radio 2"
                                label="Falso"
                                onChange={handleChange}
                                checked={filteredProducts[0]?.admin === false }
                            />
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