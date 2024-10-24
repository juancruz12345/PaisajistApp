import { DropIcon, ShovelIcon, SunIcon } from "./Icons"
import { Dropdown } from "react-bootstrap"

export function FilterDropDown({plantasArray, setPlants}){

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

    const filterArrayPlants = (event) =>{
        let filteredArray = plantasArray.filter(e=>e.riego===event)
        setPlants(filteredArray)
        
      }
      const filterArrayPlantsMant = (event) =>{
        let filteredArray = plantasArray.filter(e=>e.mantenimiento===event)
        setPlants(filteredArray)
        
      }
      const allArrayPlants = () =>{
        sortArrayByName(plantasArray)
        setPlants(plantasArray)
        
      }

    return(
        <div className='filters-dropdown'>
<Dropdown >
      <Dropdown.Toggle  className="toogle"  variant="secondary" id="dropdown-basic">
        Riego
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item id='filter-item' onClick={(e)=>{filterArrayPlants(e.currentTarget.textContent)}} >Bajo</Dropdown.Item>
        <Dropdown.Item id='filter-item' onClick={(e)=>{filterArrayPlants(e.currentTarget.textContent)}}>Moderado</Dropdown.Item>
        <Dropdown.Item id='filter-item' onClick={(e)=>{filterArrayPlants(e.currentTarget.textContent)}} >Alto</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item id='filter-item' onClick={allArrayPlants} >Todos</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   

    <Dropdown>
      <Dropdown.Toggle className="toogle" variant="secondary" id="dropdown-basic">
        Manten.
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item id='filter-item' onClick={(e)=>{filterArrayPlantsMant(e.currentTarget.textContent)}} >Facil</Dropdown.Item>
        <Dropdown.Item id='filter-item' onClick={(e)=>{filterArrayPlantsMant(e.currentTarget.textContent)}}>Moderado</Dropdown.Item>
        <Dropdown.Item id='filter-item' onClick={(e)=>{filterArrayPlantsMant(e.currentTarget.textContent)}} >Dificil</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item id='filter-item' onClick={allArrayPlants} >Todos</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
</div>
    )
}