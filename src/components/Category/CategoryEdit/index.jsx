import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";

import { getProducts, getCategory, getTax, getFindProducts } from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";
import CategoryDeleteService from "@/services/useCategory/delete";

import {ModalCategoryEdit} from "@/components/Category";
import {getLocalStorage} from "@/util/Helpers";




export default function EditProduct( props ) {

    const [error, setError] = useState('')
    const delete_f = (e) => {
        e.preventDefault();

        let data = {
            token: getLocalStorage('token')
        };

        let id = parseInt( e.target.closest(`button`).dataset.exclude);

        CategoryDeleteService.delete(id, data)
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

    const [category,] =
        useQueries({
            queries: [

                {
                    queryKey: ["Category"],
                    queryFn: () => getCategory(),

                },


            ],
        });

    if (category.isLoading) return "Carregando categorias...";
    if ( category.error ) return category.error.message;




    return (
        <>
            <Card style={ { width: '18rem' } }   className="mx-auto my-2">
                <Card.Body>
                    <input type='hidden' id={'products_id'} value={props.id} />
                    <Card.Title>{props.nome }</Card.Title>
                    <Card.Subtitle>Id: {props.id}</Card.Subtitle>
                    <ButtonGroup size="sm" className='mt-2' variant="outline-warning">
                        <ModalCategoryEdit id={props.id}    />
                        <Button variant="secondary" onClick={delete_f}  data-exclude={props.id}>Excluir</Button>
                    </ButtonGroup>

                </Card.Body>
            </Card>

        </>




    );
}