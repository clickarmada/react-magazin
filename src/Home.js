import React, { useState, useEffect } from 'react';
import { FireOutlined, ThunderboltOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Menu, Slider, Pagination, message } from 'antd';
import {Link} from 'react-router-dom';


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


const products = [

  {
    label: 'The Irishman Harvest',
    key: 'the-irish-man-harvest',
    Brand: 'Walsh',
    subcat: 'whiskey',
    litraj: 0.7,
    alcool: 40,
    stil: 'Single Malt',
    afumat: 'Nu',
    regiune: 'Irlanda',
    pret: 189.99
  },
  {
    label: 'The Irishman',
    key: 'the-irish-man',
    Brand: 'Walsh',
    subcat: 'whiskey',
    litraj: 0.7,
    alcool: 43,
    stil: 'Single Malt',
    vechime: 12,
    afumat: 'Nu',
    regiune: 'Irlanda',
    pret: 289.99
  },
  {
    label: 'Monkey Shoulder',
    key: 'monkey-shoulder',
    brand: 'Monkey Shoulder',
    subcat: 'whiskey',
    litraj: 0.7,
    alcool: 40,
    stil: 'Single Malt',
    afumat: 'Nu',
    regiune: 'Scotia',
    pret: 179.99
  },
  {
    label: 'Beluga Noble',
    key: 'beluga-noble',
    brand: 'Beluga',
    subcat: 'vodka',
    litraj: 1,
    alcool: 40,
    stil: 'Fara Aroma',
    regiune: 'Rusia',
    pret: 209.99
  },
  {
    label: 'Beefeater',
    key: 'beefeater',
    brand: 'Beefeater',
    subcat: 'gin',
    litraj: 1,
    alcool: 40,
    stil: 'Fara Aroma',
    regiune: 'Anglia',
    pret: 97.99
  },
  {
    label: 'Dom Perignon Brut',
    key: 'dom-perignon-brut',
    brand: 'Dom Perignon',
    subcat: 'sampanie',
    litraj: 0.75,
    alcool: 12.5,
    stil: 'Brut',
    vechime: 'Vintage',
    culoare: 'Alba',
    regiune: 'Franta',
    pret: 179.99
  },
  {
    label: 'Grande Alberone Moscato Vino Spumante Dolce',
    key: 'grande-alberone-moscato-vino-spumante-dolce',
    brand: 'Grande Alberone',
    subcat: 'vin-spumant',
    litraj: 0.75,
    alcool: 6.5,
    stil: 'Brut',
    vechime: 'Vintage',
    culoare: 'Alba',
    regiune: 'Italia',
    pret: 59   
  },
  {
    label: 'Academia Purcari Feteasca Neagra',
    key: 'academia-purcari-feteasca-neagra',
    brand: 'Crama Purcari',
    subcat: 'vin-rosu',
    litraj: 0.75,
    alcool: 13.5,
    stil: 'Sec',
    culoare: 'Rosu',
    regiune: 'Republica Moldova',
    pret: 244.99
  },
  {
    label: 'Recas Muse White',
    key: 'recas-muse-white',
    brand: 'Cramele Recas',
    subcat: 'vin-alb',
    litraj: 0.75,
    alcool: 12.5,
    stil: 'Demisec',
    vechime: 'Vintage',
    culoare: 'Alb',
    regiune: 'Romania',
    pret: 72.99
  }

]


const Home = () => {

    

  const [categorie, setCategorie] = useState('spirits');
  const [subCategorie, setSubCategorie] = useState();
  const [items2, setItems2] = useState();
  const [filtru, setFiltru] = useState();
  const [produse, setProduse] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [stringSortare, setStringSortare] = useState('');
  const [totalProduse, setTotalProduse] = useState();
  const [pretMaxim, setPretMaxim] = useState();
  const [pretMinim, setPretMinim] = useState();
  const [pretMinClient, setPretMinClient] = useState(10);
  const [pretMaxClient, setPretMaxClient] = useState(50);
  const [stringFiltrare, setStringFiltrare] = useState('');
  const [pageSize, setPageSize] = useState(10);
  

  useEffect(() => {
    fetch('http://localhost:8000/stoc-produse?' + stringFiltrare)
    .then((res) => {return res.json()})
    .then((altceva) => {
      for(let i = 0; i < altceva.length; i++){
        if(altceva[i].nume == "totalProduse") { setTotalProduse(altceva[i].numar) }
        if(altceva[i].nume == "pretMaxim") { setPretMaxim(Math.ceil(Number(altceva[i].numar))) }
        if(altceva[i].nume == "pretMinim") { setPretMinim(Math.floor(Number(altceva[i].numar))) }
      }
    })
  }, [stringFiltrare]);
console.log(totalProduse, pretMaxim, pretMaxim);
  useEffect(() => {setItems2(catSubCat.filter((e) => e.cat === categorie))}, [categorie]);
  useEffect(() => {fetch('http://localhost:8000/produse?p=' + pagina + stringSortare + stringFiltrare + '&size=' + pageSize)
  .then((res) => {return res.json(); })
  .then((ceva) => {console.log(ceva); setProduse(ceva)})}, [pagina, stringSortare, stringFiltrare, pageSize]);

  useEffect(() => {setStringFiltrare('&pretMin=' + pretMinClient + '&pretMax=' + pretMaxClient)}, [pretMinClient, pretMaxClient])


  const onChange = (value) => {
    console.log('onChange: ', value);
  };
  const onAfterChange = (value) => {
    console.log('onAfterChange: ', value);
  };

  const onClick1 = (e) => {
    console.log('click ', e);
    setCategorie(e.key);      
  };
  const onClick2 = (e) => {
    console.log('click ', e);
    setSubCategorie(e.key);      
  };

  const sort = (sortare) => {
    if (sortare.target.checked == true) {
      setStringSortare('&sort=' + sortare.target.id);
      setPagina(1);
    }
  }


  return (
    <div>
      <div>
        <div className="container">
          <div className="sidebar">
            <div>
              <div><input onChange = {(e) => {sort(e)}} name="sortare" id="title-asc" type="radio"></input> NUME (A - Z)</div>
              <div><input onChange = {(e) => {sort(e)}} name="sortare" id="title-desc" type="radio"></input> NUME (Z - A)</div>
              <div><input onChange = {(e) => {sort(e)}} name="sortare" id="pret-asc" type="radio"></input> PRET (Mic &gt; Mare)</div>
              <div><input onChange = {(e) => {sort(e)}} name="sortare" id="pret-desc" type="radio"></input> PRET (Mare &gt; Mic)</div>
            </div>
            <div className="slider">
            <Slider
              range
              step={10}
              defaultValue={[20, 50]}
              onChange={(value) => {setPretMinClient(value[0]); setPretMaxClient(value[1])}}
              onAfterChange={onAfterChange}
              value = {[pretMinClient,pretMaxClient]}
              min = {pretMinim}
              max = {pretMaxim}
            />
            <input type ='number' value = {pretMinClient} onChange = {(value) => {setPretMinClient(value.target.value)}}></input>
            <input type ='number' value = {pretMaxClient} onChange = {(value) => {setPretMaxClient(value.target.value)}}></input>
            </div>
          </div> 
          <div className="container-produse">    
            {produse.map((produs) => {return <Link to = {'produs/' + produs.id + '/' + produs.title.replaceAll(" ", "-").replaceAll(".","")}><div className="produs">
              <img src={`http://localhost:8000/thumbnails/${produs.id}.jpg`} />
              <div>{produs.title}</div>
              <div>Pret: {produs.pret} Lei</div>
              <div>Alcool: {produs.alcool}</div>          
            </div></Link>})} 
            <div className="pagination-container">
              <div className="pagination">
                <Pagination current = {pagina} defaultCurrent={1} onChange={setPagina} total={totalProduse} pageSize={pageSize} onShowSizeChange={(current, size) => {setPageSize(size)}} />                
              </div>
          </div> 
          </div>  
        </div>
      </div>
    </div>
  )
};

export default Home