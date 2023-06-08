import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";

import { getProducts, getCategory, getTax, getFindProducts } from '@/services/Get/Api';
import {useQueries} from "@tanstack/react-query";
import ProductsDeleteService from "@/services/useProducts/delete";

import {ModalProductsEdit} from "@/components/Products";
import {getLocalStorage} from "@/util/Helpers";




export default function EditProduct( props ) {

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




    const [products, category, tax, find_products] =
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

                {
                    queryKey: ["Tax"],
                    queryFn: () => getTax(),

                },
            ],
        });


    if (products.isLoading) return "Carregando todos prododutos...";
    if ( products.error ) return products.error.message;

    if (category.isLoading) return "Carregando categorias...";
    if ( category.error ) return category.error.message;

    if (tax.isLoading) return "Carregando impostos...";
    if ( tax.error ) return category.error.message;




    return (
        <>

            <Card style={ { width: '18rem' } }   className="mx-auto my-2">
                <Card.Body>
                    <input type='hidden' id={'products_id'} value={props.id} />
                    <Card.Title>{props.nome }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> R$ {props.valor}</Card.Subtitle>
                    <Card.Text>
                        <Badge bg="secondary">   { category?.data.find( word => word.id === props.category_id )?.nome } </Badge>

                    </Card.Text>

                    <Alert variant="danger" className='mt-3'>
                        { tax?.data?.find( word => word.id_category === props.category_id )?.valor }
                        % de imposto dessa categoria de produto
                    </Alert>

                    <ButtonGroup size="sm" className='mt-2' variant="outline-warning">

                        <ModalProductsEdit id={props.id}  category_options={ category.data } />
                        <Button variant="secondary" onClick={delete_f}  data-exclude={props.id}>Excluir</Button>
                    </ButtonGroup>

                </Card.Body>
            </Card>

        </>




    );
}