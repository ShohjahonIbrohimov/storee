// import { Accordion } from "react-bootstrap";
import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import React, {useState } from 'react';
import { ArrowForward } from '@material-ui/icons';
import ProductCard7 from './product-cards/ProductCard7';
import Divider from './Divider';
import { H4 } from './Typography';
import { FormattedMessage } from 'react-intl';
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForward  />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'white',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));


  export type AccordionsType = {
    data?:any,
    fetch_basket_list_panel?:any,
    setloading?:any,
    setcartthings?:any,
    cartThings:any
    changed?:any,
    setchanged?:any

  }



let Accordions_Cart:React.FC<AccordionsType> = ({
  data,
  fetch_basket_list_panel,
  setcartthings,
  setloading,
  cartThings,

})=>{
    const [expanded, setExpanded] = useState([]);
    console.log(expanded);
    let [loadedFully,setLoadedFully] = useState(false)
    const handleChange  =(panel: string) =>{
      let array2 = [];
      if(!loadedFully){
        console.log("It comes");
        for (let i = 0; i < data.length; i++) {
          array2.push(`panel${i}`)
        }
        
        let i:any
        array2.map((one,ind)=>{
          if(one === panel){
            i =  ind
          }
        })
        let array = [...array2]
        array?.includes(panel) ? delete array[i] : array?.push(panel)
        setExpanded(array);
        setLoadedFully(true)
      }
      else{
        let i:any
        expanded.map((one,ind)=>{
          if(one === panel){
            i =  ind
          }
        })
        let array = [...expanded] 
        array?.includes(panel) ? delete array[i] : array?.push(panel)
        setExpanded(array);
      }
    };
    
    return( 
        <div>
        {data?.map((one,ind)=>
        <Accordion expanded={loadedFully ?  expanded?.includes(`panel${ind}`) : true} onChange={()=>handleChange(`panel${ind}`)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{one.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {one?.products?.map((item,ind) => (
                <div className="shadow-none" key={ind}>
                <ProductCard7
                    key={item.id}
                    mb="1.5rem"
                    id={item.keyword}
                    name={item.name}
                    qty={item.count}
                    price={item.price}
                    imgUrl={item.image}
                    categoryKeyword={item.categoryKeyword}
                    totalPrice = {item?.totalPrice}
                    fetch_basket_list = {()=>fetch_basket_list_panel()}
                    setloading={(e)=>setloading(e)}
                    setcartthings = {(e)=>setcartthings(e)}
                    cart={cartThings}
                />
                <Divider/>
                </div>
                
            ))}
            <H4 className="w-100 text-right delivery_cost_cart">
                <FormattedMessage id="Shipping" />: {one?.delivery_money || 0}
            </H4>
          </AccordionDetails>
        </Accordion>
       )}
      </div>
    )  
}
export default Accordions_Cart;


// <Accordion>
//           {data.map((one,ind)=>{
//               return (  <Accordion.Item className={accordionClass} eventKey={ind}>
//                             <Accordion.Header>{one.name}</Accordion.Header>
//                             <Accordion.Body>
//                                 <div className="whitespace-break" dangerouslySetInnerHTML={{__html: one.text}} />
//                             </Accordion.Body>
//                         </Accordion.Item>
//               )
//           })}
//         </Accordion>