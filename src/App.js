import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Menu, Popover } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import Home from './Home';
import Produs from './Produs';
import './App.css';













const items1 = [
  {
    label: 'Spirits',
    key: 'spirits'
  },
  {
    label: 'Sampanie & Vin Spumant',
    key: 'sampanie-vin-spumant'     
  },
  {
    label: 'Vin',
    key: 'vin'
  }, 
];

const catSubCat = [
  {
      label: 'Whiskey',
      key: 'whiskey',
      cat: 'spirits',
      children: [
        {
          label: 'Stil',
          key: 'stil'    
        },
        {
          label: 'Brand',
          key: 'brand'   
        },
        {
          label: 'Regiune',
          key: 'regiune'   
        }
      ]
  },
  {
      label: 'Vodka',
      key: 'vodka',
      cat: 'spirits',
      children: [
        {
          label: 'Stil',
          key: 'stil'    
        },
        {
          label: 'Brand',
          key: 'brand'   
        },
        {
          label: 'Regiune',
          key: 'regiune'   
        }
      ]
  },
  {
      label: 'Gin',
      key: 'gin',
      cat:'spirits',
      children: [
        {
          label: 'Stil',
          key: 'stil'    
        },
        {
          label: 'Brand',
          key: 'brand'   
        },
        {
          label: 'Regiune',
          key: 'regiune'   
        }
      ]
  },
  {
      label: 'Sampanie',
      key: 'sampanie',
      cat: 'sampanie-vin-spumant',
      children: [
        {
          label: 'Stil',
          key: 'stil'    
        },
        {
          label: 'Brand',
          key: 'brand'   
        },
        {
          label: 'Regiune',
          key: 'regiune'   
        }
      ]
  },
  {
    label: 'Vin Spumant',
    key: 'vin-spumant',
    cat: 'sampanie-vin-spumant',
    children: [
      {
        label: 'Stil',
        key: 'stil'    
      },
      {
        label: 'Brand',
        key: 'brand'   
      },
      {
        label: 'Regiune',
        key: 'regiune'   
      }
    ]
  },
  {
    label: 'Vin Rosu',
    key: 'vin-rosu',
    cat: 'vin',
    children: [
      {
        label: 'Stil',
        key: 'stil'    
      },
      {
        label: 'Brand',
        key: 'brand'   
      },
      {
        label: 'Regiune',
        key: 'regiune'   
      }
    ]
  },
  {
    label: 'Vin Alb',
    key: 'vin-alb',
    cat: 'vin',
    children: [
      {
        label: 'Stil',
        key: 'stil'    
      },
      {
        label: 'Brand',
        key: 'brand'   
      },
      {
        label: 'Regiune',
        key: 'regiune'   
      }
    ]
  },  
]





const CartContext = createContext();




const App = () => {  

  const [cos, setCos] = useState([]);
  const [categorie, setCategorie] = useState('spirits');
  const [subCategorie, setSubCategorie] = useState();
  const [items2, setItems2] = useState();
  const [detaliiCos, setDetaliiCos] = useState();

  const onClick1 = (e) => {
    console.log('click ', e);
    setCategorie(e.key);
  };

  const onClick2 = (e) => {
    console.log('click ', e);
    setSubCategorie(e.key);

  };

  const onClick3 = (e) => {
    let cosDinLocalStorage = JSON.parse(window.localStorage.getItem('cosDinLocalStorage'));
    console.log(cosDinLocalStorage);
    if (!Array.isArray(cosDinLocalStorage)) {
      cosDinLocalStorage = [];
    }
    axios.post(('http://localhost:8000/produse'), { cosDinLocalStorage })
    .then((ceva) => { console.log(ceva.data); setDetaliiCos(arraysMatching(ceva.data, cosDinLocalStorage)) });
  }


  

  function arraysMatching(a, b) {
  return <div>{a.map((prod, i) => { return <div><img src={`http://localhost:8000/thumbnails/${prod.id}.jpg`} />{prod.title} - Cant:{b[i].cant} - Total:{prod.pret * Number(b[i].cant)}</div> })}</div>;
  }

  useEffect(() => {setItems2(catSubCat.filter((e) => e.cat === categorie))}, [categorie]);

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (

    <div>
      <div onClick={onClick3} className="cos-icon">
        <Popover
          placement="bottom"
          content={<div><div>{detaliiCos}</div> <a onClick={hide}>Close</a></div>}
          title="Title"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        ><ShoppingCartOutlined /></Popover>
      </div>
      <Menu onClick={onClick1} selectedKeys={[categorie]} mode="horizontal" items={items1} />
      <Menu onClick={onClick2} selectedKeys={[subCategorie]} mode="horizontal" items={items2} />
      <CartContext.Provider value={{ cos, setCos }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produs/:id/:nume" element={<Produs />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </div>

  );
}

export {App, CartContext};
