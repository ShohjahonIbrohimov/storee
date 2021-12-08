// import { Accordion } from "react-bootstrap";
import { styled } from '@mui/material/styles';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { ArrowForward } from '@material-ui/icons';


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

let Accordions = ({data,accordionClass})=>{
  const [expanded, setExpanded] = useState([]);
  const handleChange  =(panel: string) =>{
      let i:any
      expanded.map((one,ind)=>{
        if(one === panel){
          i =  ind
        }
      })
      let array = [...expanded]
      expanded?.includes(panel) ? delete array[i] : array?.push(panel)
      setExpanded(array);
  };
  
    return( 
        <div>
        {data.map((one,ind)=>
        <Accordion className={accordionClass} expanded={expanded?.includes(`panel${ind}`)} onChange={()=>handleChange(`panel${ind}`)}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{one.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
                <div className="whitespace-break" dangerouslySetInnerHTML={{__html: one.text}} />
            </Typography>
          </AccordionDetails>
        </Accordion>
       )}
      </div>
    )  
}
export default Accordions;


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