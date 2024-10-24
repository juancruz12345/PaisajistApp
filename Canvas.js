import { fabric } from "fabric";


export function Canvas(){
  
// Inicializar canvas usando Fabric.js




/*function manipulateCanvas(){
    const canvas = new fabric.Canvas('canvas');
 const imageInput = document.getElementById('image-input')


if(imageInput){
    console.log('ejecuting')
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        fabric.Image.fromURL(e.target.result, function(img) {
            // Establecer la imagen de fondo del jardín y redimensionarla al tamaño del canvas
            img.scaleToWidth(canvas.width);
            img.scaleToHeight(canvas.height);

            // Configurar la imagen de fondo para que no sea interactiva
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                selectable: false,
                evented: false
            });

            // Forzar el renderizado del canvas
            canvas.renderAll();
        });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Manejar la selección de plantas y agregarlas al canvas
const plantOptions = document.querySelectorAll('.plant-option');

plantOptions.forEach(plant => {
    plant.addEventListener('click', () => {
        const plantSrc = plant.src;

        fabric.Image.fromURL(plantSrc, function(img) {
            // Establecer el tamaño inicial de la planta
            img.set({
                left: 100,
                top: 100,
                scaleX: 0.3,  // Ajustar el tamaño de la planta
                scaleY: 0.3,
                hasControls: true,  // Permitir redimensionar y mover
                selectable: true    // Permitir mover
            });

            // Agregar la planta al canvas
            canvas.add(img);

            // Renderizar todo el canvas inmediatamente para mantener todo visible
            canvas.requestRenderAll();  // Usar requestRenderAll para forzar renderizado inmediato

           
        });
    });
});

// Asegurar que los objetos no se salgan del canvas al moverlos
canvas.on('object:moving', function(event) {
    const obj = event.target;
    obj.setCoords();

    if (obj.left < 0) obj.left = 0;
    if (obj.top < 0) obj.top = 0;
    if (obj.left + obj.width * obj.scaleX > canvas.width) {
        obj.left = canvas.width - obj.width * obj.scaleX;
    }
    if (obj.top + obj.height * obj.scaleY > canvas.height) {
        obj.top = canvas.height - obj.height * obj.scaleY;
    }

    // Re-renderizar el canvas para mantener las actualizaciones visibles
    canvas.requestRenderAll();  // Usar requestRenderAll en lugar de renderAll
});
    // Eliminar la planta seleccionada cuando se presiona la tecla "Delete"
 const handleKeyPress = (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject); // Elimina el objeto seleccionado
        canvas.requestRenderAll(); // Renderiza el canvas nuevamente para reflejar los cambios
      }
    }
  };

  // Escuchar el evento de teclado
  document.addEventListener('keydown', handleKeyPress);

  // Limpieza del evento al desmontar el componente
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };

}

 
}
*/

}