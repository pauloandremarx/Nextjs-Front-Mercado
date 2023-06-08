import React from 'react'
import styles from './form.module.css';
import Image from 'next/image';

const FormCuston = ({children, titulo, tamanho='0px', submit}) => {

    return (

          <div className={`min-vh-100 d-flex justify-content-center w-100 align-items-center me-auto ms-auto`} style={{ maxWidth: tamanho }}>

              <form onSubmit={submit} className={'w-100'} >
                {children}
              </form>

          </div>

    )
  }

export default FormCuston