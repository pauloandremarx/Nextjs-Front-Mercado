'use client'


import FormCuston from '@/components/Form';
import InputCuston from '@/components/InputCuston'
import InputPassword from '@/components/InputPassword'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Select from 'react-select';
import { localStorageExpires, getLocalStorage} from '@/util/Helpers'
import ProductsPostService from '@/services/useProducts/post'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Product as Products, ProductsEdit as EditProduct} from "@/components/Products";
import Layout from "@/components/Layout";
import {getCategory, getProducts, getTax} from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";

import Button from "react-bootstrap/Button";

export default function Login() {

    const [products, category] =
        useQueries({
            queries: [
                {
                    queryKey: ["Products"],
                    queryFn: () => getProducts(),

                },
                {
                    queryKey: ["Category"],
                    queryFn: () => getCategory(),

                },

            ],
        });


    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [category_select, setCategory] = useState(1);
    const [error, setError] = useState('')
    const handleChangeSelect = (event) => { setCategory(event.target.value); };

    const create_f = (e) => {

        e.preventDefault();
        let data = {
            nome: nome,
            valor: valor,
            category_id: category_select,
        };

        alert(JSON.stringify(data));

        ProductsPostService.create(data)
            .then((response) => {
                setError(JSON.stringify(response));
                setTimeout(window.location.reload(), 1000);
            })
            .catch((error) => {
                setError(JSON.stringify(error));
            })
    }


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    if( getLocalStorage('nome') != 'undefined' || getLocalStorage('nome') != null || getLocalStorage('nome') != '' ){

        return (
            <>
            <Layout>
                <Container className="mt-5 min-vh-100">
                    <Row>
                        <Col><Button  className='me-2' variant="primary" onClick={handleShow}  >Adicionar</Button></Col>
                    </Row>
                    <Row>
                        { products.data?.map( function ( item, i ) {
                            return (
                                <Col key={`teste_${i}`}>
                                    <EditProduct nome={item.nome} valor={item.valor} category_id={item.category_id} id={item.id}  />
                                </Col>
                            )})}
                    </Row>
                </Container>
            </Layout>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Produto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form
                            submit={create_f}

                        >
                            <InputCuston
                                name = "nome"
                                placeholder ="Nome do produto"
                                value = {nome}
                                type="text"
                                handleOnchange = {e => setNome(e.target.value)}
                                className="form-control"
                            />

                            <InputCuston
                                name = "valor"
                                placeholder ="Valor do produto"
                                value = {valor}
                                type="number"
                                handleOnchange = {e => setValor(e.target.value)}
                                className="form-control"
                            />

                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control aria-label="Default select example" as="select" custom value={category_select} onChange={handleChangeSelect}>
                                    {category.data?.map( function ( item, i ) {
                                        return (
                                            <option key={`teste_${i}`} value={item.id} onChange={handleChangeSelect}>{item.nome}</option>
                                        )})}

                                </Form.Control>
                            </Form.Group>

                            <div className='alert-danger fs-6 text-break'>{error}</div>
                            <div className="mt-3 uk-width-1-1 ">
                                <input onClick={create_f} type='submit' className='btn btn-primary' value='Enviar' />
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
        )

    }else{

        return (
            window.location.href='/'
        )
    }
}




