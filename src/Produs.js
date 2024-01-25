import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Produs = () => {

  const parametrii = useParams();
  const id = parametrii.id;

  const [title, setTitle] = useState();
  const [pret, setPret] = useState();
  const [alcool, setAlcool] = useState();
  const [cantitate, setCantitate] = useState();  
  const [subCat, setSubCat] = useState();

  const storedCosValue = window.localStorage.getItem('cosDinLocalStorage');
  const initialCosValue = storedCosValue ? JSON.parse(storedCosValue) : [];
  
  const [produseCos, setProduseCos] = useState(initialCosValue);
  
  useEffect(() => {
    if (produseCos?.[0]) {
      window.localStorage.setItem('cosDinLocalStorage', JSON.stringify(produseCos));
    }
  }, [produseCos]);

  useEffect(() => {
      fetch('http://localhost:8000/produs/' + id)
      .then((res) => {return res.json()})
      .then((ceva) => {console.log(ceva); 
        setTitle(ceva[0].title);
        setPret(ceva[0].pret);
        setAlcool(ceva[0].alcool);
        setCantitate(ceva[0].cantitate);
        setSubCat(ceva[0].subcat);
      });
      if(!produseCos?.[0]) {setProduseCos([])};
  }, [])

  function adaugaInCos() {
    let updatedProduseCos = [...produseCos]; // Create a copy of the state array
  
    let flag = 0;
  
    for (let i = 0; i < updatedProduseCos.length; i++) {
      if (updatedProduseCos[i].id === id) {
        updatedProduseCos[i] = { ...updatedProduseCos[i], cant: updatedProduseCos[i].cant + 1 };
        flag++;
      }
    }
  
    if (flag === 0) {
      updatedProduseCos = [...updatedProduseCos, { id: id, cant: 1 }];
    }
  
    setProduseCos(updatedProduseCos);
  }

  return (
    <div>
      <h1 className="titlu-produs">{title}</h1>
      <h2 className="date-produs">{subCat} {cantitate}CL / {alcool} COD PRODUS {id}</h2>
        <img src={`http://localhost:8000/imagini-mari/${id}.jpg`} />
        <div>{title}</div>
        <div>Pret: {pret} Lei</div>
        <div>Alcool: {alcool}</div> 
        <div>Cantitate: {cantitate} ml</div>
        <Button onClick = {() => {adaugaInCos()}} icon = {<ShoppingCartOutlined />} type="primary">Cumpara</Button>
        
    </div>
    
  )
}

export default Produs