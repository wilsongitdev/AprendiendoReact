Proyecto RedSocial para mascotas


Para ejecutar el proyecto se debe hacer lo siguiente:
 1) Descargar todos los archivos.
 2) Colocar todos los archivos dentro de una carpeta(ubicarlo en C:\Users\user\).
 3) Abrir el entorno de desarrollo Visual Studio Code.
 4) Hacer clic File -> Open Folder.
 5) Seleccionar la carpeta.
 6) Abrir la terminal de comandos de Visual Studio Code.
 7) Ubicarse en la carpeta creada en el paso dos(a través de los comandos de Windows).
 8) Escribir "npm install bootstrap" y "npm i font-awesome" para instalar el framework bootstrap y el font-awesome.
 9) Escribir "npm start" para ejecutar el proyecto y automáticamente se visualizará la página en un navegador.
 10) Otra manera de visualiza es hacer utilizar el link "https://laughing-curran-ce0e60.netlify.app/", el cual está la página en el hosting netlify. 

-----------------------------------------------------------------------------------------------------------------------------------------------------------
Las características de mi trabajo son las siguientes:

-Programas utilizados(instalados a través de npm)
   Se utilizó bootstrap para el maquetado de la página.
   Se utilizó axios para extraer los datos del servicioweb, el cual es almacenada en una variable de estado para mostrarse en el codigo html.
   Se utilizó fontawesome para añadir tipos de letra.

-En los directorios:
    Se creo los directorios "assets","Common","Components" para tener un mayor orden al utilizar los componentes ubicados dentro de esos directorios.
- En los Archivos y Componentes:     
    Se han generado componentes("MainBar" y "MainFooter") para generar barra de menu y pie de página.
    Se han generado los archivos "Post.css","MainHeader.css" y "MainFooter.css" para el maquetado de la página.
    El componente "Post" (que es llamado por el componente "App") muestra todo el código html y react .
    



-En el archivo principal desarollado Post.js:
    1) se utilizan las variables de estado "listaPost" y "cargando" utilizadas para almacenar el arreglo obtenido del servicio web y como indicador para la muestra de la imagen de cargando.
    1) Se utilizó el método componentdidmount para extraer los datos del servicio web.
    2) Se utilizó el método dibujarCuadrícula para mostrar toda la información con los datos extraidos del servicio web. En ella se utilzo las clases de bootstrap.


