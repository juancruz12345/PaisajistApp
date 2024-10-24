import { Offcanvas, Image,OverlayTrigger, Tooltip, Badge } from "react-bootstrap"
import './offCanvas.css'
import { DropIcon, SunIcon, ShovelIcon, FlowerIcon } from "./Icons"


export function OffCanvasComponent({show,setShow,nombre, img, descripcion, riego, sol, mantenimiento, floracion}){

  

    const renderTooltip = (name) => (
        <Tooltip id="button-tooltip">
          {name}
        </Tooltip>
      );
     

    return(
        <div>
    <Offcanvas className='offcanvas' show={show} onHide={()=>{setShow(false)}}   backdrop='true' placement='end'>
    <Offcanvas.Header closeButton />
    <Offcanvas.Title><span className="title">{nombre}</span></Offcanvas.Title>
     <Offcanvas.Body>
        
    <Image src={img}></Image>
    
    <div className="overlay-list">
    <div className='overlay'>
    <OverlayTrigger
      
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip('Riego')}
    >
      <div className="overlay-icon"><Badge id="badge"><DropIcon/></Badge></div>
    </OverlayTrigger> {riego}</div>

    <div className='overlay'>
    <OverlayTrigger
      
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip('Cantidad de luz solar')}
    >
      <div className="overlay-icon"><Badge id="badge"><SunIcon/></Badge></div>
    </OverlayTrigger>{sol}</div>

    <div className='overlay'>
    <OverlayTrigger
      
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip('Mantenimiento')}
    >
      <div className="overlay-icon"><Badge id="badge"><ShovelIcon/></Badge></div>
    </OverlayTrigger>{mantenimiento}</div>   

    <div className='overlay'>
    <OverlayTrigger
      
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip('Epoca de floracion')}
    >
      <div className="overlay-icon"><Badge id="badge"><FlowerIcon/></Badge> </div>
    </OverlayTrigger>{floracion}</div>
    
    </div>   
   
      
        <span><strong>Descripción</strong></span>
        <p className="descripcion">
            {descripcion}
        </p>
        
    </Offcanvas.Body>
    

</Offcanvas>

</div>
    )
}

