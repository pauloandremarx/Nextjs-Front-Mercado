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

import CategoryUpdateService from "@/services/useCategory/update";

import {getLocalStorage} from "@/util/Helpers";
import InputCuston from "@/components/InputCuston";



export default function EditProduct( props ) {

    const [nome, setNome] = useState('')


    const [error_modal, setErrorModal] = useState('')

    const [id, setId] = useState(false);

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setId(props?.id)};


    const update_f = (e) => {
        e.preventDefault();
        let data = {
            nome: nome,
        };

        CategoryUpdateService.update(id, data)
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

    const [find_category] =
        useQueries({
            queries: [
                {
                    queryKey: ["Find Category"],
                    queryFn: () => getCategory(),

                },
            ],
        });


    const filterCategoryByIdCerto = (category) => {
        return category
            ?.filter((category) => category.id === id)
            ?.map((category) => ({ id: category.id, nome: category.nome}));
    };


    const filteredCategory = filterCategoryByIdCerto(find_category.data);

    console.log(filteredCategory);


    useEffect(() => {
        if (id) {
            setNome(filteredCategory[0]?.nome)
        }
    }, [ id]);

    if (find_category.isLoading) return "Carregando produtos unicos...";
    if ( find_category.error ) return find_category.error.message;




    return (
        <>
            <Button  className='me-2' onClick={handleShow} data-edit={id}>Editar</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Produto {filteredCategory[0]?.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        submit={update_f}
                    >
                        <InputCuston
                            defaultValue={filteredCategory[0]?.nome}
                            name = "nome"
                            placeholder ="Nome do produto"
                            value = {nome}
                            type="text"
                            handleOnchange = {e => setNome(e.target.value)}
                            className="form-control"

                        />

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