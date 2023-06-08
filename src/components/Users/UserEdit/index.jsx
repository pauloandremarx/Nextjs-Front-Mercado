import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { getProducts, getCategory, getTax, getFindProducts } from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";
import ProductsDeleteService from "@/services/useProducts/delete";

import {ModalUserEdit} from "@/components/Users";
import {getLocalStorage} from "@/util/Helpers";

export default function EditUser( props ) {

    const [error, setError] = useState('')
    const delete_f = (e) => {
        e.preventDefault();

        let data = {
            token: getLocalStorage('token')
        };

        let id = parseInt( e.target.closest(`button`).dataset.exclude);

        ProductsDeleteService.delete(id, data)
            .then((response) => {
                setError(JSON.stringify(response));
                console.log( JSON.stringify(response));
                alert(JSON.stringify(response));
                setTimeout(window.location.reload(), 1000);
            })
            .catch((error, response) => {
                setError(JSON.stringify(response));
                console.log( JSON.stringify(response))
            })
    }

    /*MODAL*/

    const [users] =
        useQueries({
            queries: [
                {
                    queryKey: ["Users"],
                    queryFn: () => getUsers(),

                },
            ],
        });


    if (users.isLoading) return "Carregando todos usuários...";
    if ( users.error ) return users.error.message;


    return (
        <>

            <Card style={ { width: '18rem' } }   className="mx-auto my-2">
                <Card.Body>
                    <Card.Title>{props.nome }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> {props.email}</Card.Subtitle>
                    <Card.Text>
                        <Badge bg="secondary"> {props.admin ? 'Administrador' : 'Cliente'} </Badge>
                    </Card.Text>
                    <Card.Text>Criado em {props.created_on}</Card.Text>
                    <ButtonGroup size="sm" className='mt-2' variant="outline-warning">

                        <ModalUserEdit id={props.id}  />
                        <Button variant="secondary" onClick={delete_f}  data-exclude={props.id}>Excluir</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>


        </>




    );
}