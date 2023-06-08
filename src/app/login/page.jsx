'use client'

import styles from './login.module.css';
import FormCuston from '@/components/Form';
import InputCuston from '@/components/InputCuston'
import InputPassword from '@/components/InputPassword'

import { localStorageExpires, getLocalStorage} from '@/util/Helpers'
import useLogin from '@/services/login/useLogin'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import UsersPostService from "@/services/useUsers/post";


export default function Login() {

    const router = useRouter();

    useEffect(
        () => {
            return () => {
                localStorageExpires() //Auto executa a limpeza
            }
        },
        []
    )

    localStorageExpires(); //Auto executa a limpeza

    const [nome, setNome] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [error, setError] = useState('')

    const entrar = (e) => {
        e.preventDefault();
        let data = {
            nome: nome,
            password: password
        };

        useLogin.login(data)
            .then((response) => {
                console.log(response);
                router.push("/")


            })
            .catch((error) => {
                console.log(error);
                alert("Usuário não existe")

            })
    }



    const create_f = (e) => {

        e.preventDefault();
        let data = {
            nome: nome,
            password: password,
            email: email
        };

        UsersPostService.create(data)
            .then((response) => {
                setError(JSON.stringify(response));
                response.message === 'success' ?  setTimeout(window.location.reload(), 1000) : '';

            })
            .catch((error) => {
                setError(JSON.stringify(error));
            })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    if( getLocalStorage('nome') == 'undefined' || getLocalStorage('nome') == null || getLocalStorage('nome') == '' ){

        return (
            <header className='container '>
                <div  className='d-flex justify-content-center align-self-center w-100'>
                    <div className='w-100 '>
                        <FormCuston
                            submit={entrar}
                            titulo = "Faça seu login"
                            tamanho = "500px"
                        >
                            <InputCuston
                                name = "nome"
                                placeholder ="E-mail"
                                value = {nome}
                                type="nome"
                                handleOnchange = {e => setNome(e.target.value)}
                            />

                            <InputPassword
                                name = "password"
                                value={password}
                                placeholder ="Senha"
                                handleOnchange = {e => setPassword(e.target.value)}
                            />



                            <div className="mb-5 uk-width-1-1">
                                <input onClick={entrar} type='submit'  className="btn btn-primary mt-3" value='Enviar' />
                            </div>
                            <Row>
                                <Col><Button  className='me-2' variant="primary" onClick={handleShow}  >Criar um cadastro</Button></Col>
                            </Row>

                        </FormCuston>


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

                                    <InputPassword
                                        name = "password"
                                        value={password}
                                        placeholder ="Senha"
                                        handleOnchange = {e => setPassword(e.target.value)}
                                    />

                                    <InputCuston
                                        name = "email"
                                        value={email}
                                        placeholder ="E-mail"
                                        handleOnchange = {e => setEmail(e.target.value)}
                                    />

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

                    </div>
                </div>
            </header>
        )

    }else{

        return (
            window.location.href='/'
        )
    }
}




