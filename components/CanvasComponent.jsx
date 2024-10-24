
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { fabric } from 'fabric'
import { useEffect, useState } from 'react';
import { AddIcon, LeafIcon, AddImgIcon, DownloadIcon, SearchIcon, ColumsIcon, ColumnIcon } from './Icons';
import { Button, Container, Row, Col, Form, Card, ButtonGroup } from 'react-bootstrap';
import { plantasArray } from '../src/Plantas';
import { OffCanvasComponent } from './OffCanvasComponent';
import { useContext } from 'react';
import { ThemeContext } from '../context/context';
import './Theme.css'
import { InfoIcon } from 'lucide-react';
import { ModalComponent } from './ModalComponent';
import { FilterDropDown } from './FilterDropDowin';



export function CanvasComponent(){


  const [canvasWidth,setCanvasWidth] = useState(800)
  const [canvasHeight,setCanvasHeight] = useState(600)
  const [plants, setPlants] = useState(plantasArray)
  const [inputValue, setInputValue] = useState('')
  const [selectedObject, setSelectedObject] = useState(null)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [activeMenu, setActiveMenu] = useState('plantas')
  const {theme, toggleTheme} = useContext(ThemeContext)
  const html = document.querySelector('html')
  html.setAttribute('data-bs-theme', theme)
  const [showModal, setShowModal] = useState(false)

  const { editor, onReady } = useFabricJSEditor()

  useEffect(()=>{
  
  sortArrayByName(plants)
  window.addEventListener('keydown', handleKeyDown)
    
  if (editor?.canvas) {
    editor.canvas.setWidth(canvasWidth)
    editor.canvas.setHeight(canvasHeight)
    const canvasElement = editor.canvas.getElement()
    canvasElement.style.borderRadius = '8px'
    editor.canvas.renderAll();

    const canvas = document.querySelector('.canvas') 
    const resizeObserver = new ResizeObserver(entries=>{
      for(let entry of entries){
        const {width, height} = entry.contentRect
        setCanvasWidth(width)
        setCanvasHeight(height)
        editor.canvas.setWidth(width)
        editor.canvas.setHeight(height)
        editor.canvas.renderAll()
      }
    })

    if (canvas) {
      resizeObserver.observe(canvas);
    }
    return () => {
      if (canvas) {
        resizeObserver.unobserve(canvas)
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }
 

  },[plants, editor,selectedObject])

  const sortArrayByName = (array) =>{
    array.sort((a, b) => {
      const nameA = a.nombre.toUpperCase(); // ignore upper and lowercase
      const nameB = b.nombre.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
  
      return 0;
    });
  }

  const handleKeyDown = (event) => {
 
    if (event.key === 'd' || event.key === 'D') {
      handleDuplicate()
    }
  }

  const setBackground = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
  
    reader.onload = (f) => {
      const imgData = f.target.result
  
      fabric.Image.fromURL(imgData, (img) => {
       
        img.scaleToWidth(canvasWidth)
        img.scaleToHeight(canvasHeight)
        
        editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas), {
          selectable: false, 
          evented: false, 
        })
      })
    }
  
    reader.readAsDataURL(file)
  }

  const addPlantToCanvas = (plantSrc) => {
    fabric.Image.fromURL(plantSrc, function (img) {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.3, // Ajustar el tamaño de la planta
        scaleY: 0.3,
        hasControls: true, // Permitir redimensionar y mover
        selectable: true,  // Permitir mover
      })
  
      // Agregar la planta al canvas
      editor.canvas.add(img)
      editor.canvas.setActiveObject(img)// Seleccionar automáticamente la planta
      editor.canvas.requestRenderAll()  // Renderizar el canvas

      setSelectedObject(img)
    })
  }

  
  const handleDuplicate = () => {
    if (selectedObject) {
      selectedObject.clone(function (cloned) {
        cloned.filters = [new fabric.Image.filters.Brightness({ brightness: selectedObject.filters })]
        cloned.set({
          left: selectedObject.left + 20, 
          top: selectedObject.top + 20,
          scaleX: selectedObject.scaleX,
          scaleY: selectedObject.scaleY
        });
        editor.canvas.add(cloned)
        editor.canvas.setActiveObject(cloned)
        editor.canvas.requestRenderAll()
      })
    }
  }


  const generateImage = () => {
    const data = editor?.canvas.toDataURL()
    const a = document.createElement('a')
    a.download = 'image.png'
    a.href = data
    a.click()
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const activeObject = editor?.canvas.getActiveObject()
      if (activeObject) {
        editor?.canvas.remove(activeObject)// Elimina el objeto seleccionado
        editor?.canvas.requestRenderAll() // Renderiza el canvas nuevamente para reflejar los cambios
      }
    }
  }
 
  document.addEventListener('keydown', handleKeyPress)

  const handleChange = (event) => {
    setInputValue(event.target.value)
    
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const newArray = plantasArray.filter(e=>e.nombre.toLowerCase().includes(inputValue.toLowerCase()))
    setPlants(newArray)
 
  }

  const changeColumns =()=>{
    
    const plantList = document.getElementById('plant-list')
    plantList.style.gridTemplateColumns = '1fr 1fr'
  }
  const changeCol = () => {
    const plantList = document.getElementById('plant-list')
    plantList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))'
    
  }
 


  

  return (
  <div>

    <Container fluid >

<Row className='row'>

  <Col id='col-1'  xs={12} md={3}>
  <div className='brand-div'>
  <h3><LeafIcon></LeafIcon>PaisajistApp</h3>
  </div>
   
  
  <ButtonGroup className='select-menu'>
  <Button variant={activeMenu==='plantas' ? 'success' : 'secondary'} onClick={()=>{setActiveMenu('plantas')}}>Plantas</Button>
  <Button variant={activeMenu==='ajustes' ? 'success' : 'secondary'} onClick={()=>{setActiveMenu('ajustes')}}>Lienzo</Button>
  </ButtonGroup>
  

    {
      activeMenu === 'plantas'
      ?

<div>
     
<Form className='form' onSubmit={handleSubmit}>
  <Form.Group>
    <Form.Label>Buscar Planta</Form.Label>
    <div className='div-search'>
    <Form.Control placeholder='Agapanthus' onChange={handleChange}></Form.Control>
    <Button variant='secondary' type='submit'><SearchIcon></SearchIcon></Button>
    </div>
  </Form.Group>
  
</Form>


<div className='div-filter-and-layout'>
<div className='button-group-div'>
 <div className='display-icon' onClick={changeCol}> <ColumnIcon></ColumnIcon></div>
  <div className='display-icon' onClick={changeColumns}><ColumsIcon></ColumsIcon></div>
  
</div>

<FilterDropDown plantasArray={plantasArray} setPlants={setPlants}></FilterDropDown>

</div>

<div className='plant-list' id='plant-list'>
   {
     plants?.map((e,i)=>(
      <Card key={i} className='plant-item'>
      <Card.Subtitle className='plant-title'>{e.nombre}</Card.Subtitle>
    
      <Card.Body onClick={()=>{setSelectedPlant(i)}}><img src={e.src} alt={e.nombre}></img></Card.Body>
      <Card.Footer>
      <Button variant='success' className='add-btn' onClick={()=>{addPlantToCanvas(e.src)}}>Añadir <AddIcon></AddIcon></Button>
      </Card.Footer>
      {selectedPlant === i && (
        <OffCanvasComponent show={selectedPlant === i} setShow={() => setSelectedPlant(null)} nombre={e.nombre} img={e.src} descripcion={e.descripcion} riego={e.riego} sol={e.sol} mantenimiento={e.mantenimiento} floracion={e?.floracion} />
      )}
    </Card>
     ))
   }
 </div>
</div>

:

<div>

<div className='div-input-fondo'>
<input onChange={setBackground}  type='file' accept='/image' className="input-file" id='inputFile'></input>
<Button variant='success' className='btn-file' onClick={()=>{document.getElementById('inputFile').click()}}>Agregar fondo <AddImgIcon> </AddImgIcon></Button>
</div>


<div className='div-file-upload'>

<Button variant='success' className='file-upload-button' onClick={generateImage}>Descargar <DownloadIcon/></Button>
</div>

</div>
    
    }

  
  </Col>



  <Col id='col-2' xs={12} md={8}>
  <div className="canvas-div">
    <FabricJSCanvas className="canvas" id='canvas' onReady={onReady}/>
  </div>
  </Col>
  

<Col xs={12} md={1} id='col-3'>

    {
      theme === 'dark'
      ? <div  className='icon-btn' onClick={toggleTheme}><img src='./sun.png'></img></div>
      : <div  className='icon-btn' onClick={toggleTheme}><img src='./moon.png'></img></div>
    }
    {
      theme=== 'dark'
      ? <div  className='icon-btn' onClick={()=>{setShowModal(true)}}><img src='./info-circle(white).png'></img></div>
      : <div  className='icon-btn' onClick={()=>{setShowModal(true)}}><img src='./info-circle.png'></img></div>
    }
    
    <ModalComponent showModal={showModal} setShowModal={setShowModal}></ModalComponent>
</Col>
</Row>
 

</Container>
    </div>
   
  )

}