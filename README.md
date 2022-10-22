# RETO GOJOM
## _Mostrar inmuebles en Google Maps con Vanilla JavaScript_


## Características

- Agrupamiento de marcadores por cercania.
- Selección de marcador y muestra de información basica del inmueble.
- La función (btn) de más caracteristicas solo se aprecia cuando estas superan el rango de 6 y muestra todas las caracteristicas.
- Filtro de busqueda por Habitaciones, estacionamiento y baños, al no seleccionar una cantidad estos tomas todos por defecto de esa categoria.
- Diseño responsive.

## Tecnologías

- [VanillaJS] - Desarrollo del dom y funcionalidades de la pagina
- [SCSS] - Uso de variables y desarrollo en cascada integrada
- [@googlemaps] - Vista y uso del mapa con los metodos de la documentación.


## Instalación
> -NOTA IMPORTANTE:
Se puede obviar la instalación si cuenta con live server como plugin de visual studio code.

Se requiere de tener instalado los paquetes de `local-web-server@5.2.1` y si se requiere utilizar `sass` tambien se necesitaria instalar.
```sh
cd reto_gojom
npm i
```
Se cuenta con un comando de npm para poder realizar una preinstallacion de los componentes principales
```sh
cd reto_gojom
npm run preinstall
```

## Despliegue del proyecto
Si no se requiere instalar `local-web-server@5.2.1` o `sass`, el proyecto ya cuenta con el css correspondiente asi que solo habra necesidad de usar `visual studio code con el plugin de live Server para su despliege`.
```sh
Abrir con live serve index.html
```

Si Realizo la instalación correspondiente solo debe realizar el siguiente comando.

```sh
cd reto_gojom
npm run start
```
## Vistas del proyecto
- Pagina principal.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2Fpagina%20principal.png?alt=media&token=983244a5-e398-4e3e-9554-cbe9083eaa81)

- Implementación de filtro.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2Fimplementacion%20de%20filtros.png?alt=media&token=b4043ccd-5b2c-41ce-b922-6fa1f33474c7)

- Selección de marcador.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FBoton%20de%20caracteristicas%20cuando%20supera%20el%20limite%20de%206%20que%20se%20muestras.png?alt=media&token=1e076e1f-9583-406b-9023-c9dfe224ed90)



- Selección de boton de más caracteristicas.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FVista%20de%20todas%20las%20categorias.png?alt=media&token=27792595-d0bc-4c8f-aacd-c9ec5a8050a4)

- Selección de marcador con menos de 6 caracteristicas, no se muestras el boton de ver más caracteristicas.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FVista%20de%20caracteristicas%20menores%20o%20iguales%20que%206.png?alt=media&token=01ef371d-6974-418a-8eb4-e6978c4f7c22)

- Selección de cambio de moneda.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FIntegracion%20de%20cambio%20de%20moneda.png?alt=media&token=eac9b369-627a-4f23-846c-c2b1b59b40f3)

- Vistas responsive 1.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FResponsive%201.png?alt=media&token=74f0b01f-5662-46ec-b8c9-16647b5bc9d2)

- Vistas responsive 2.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FResponsive%202.png?alt=media&token=65fabfac-b6e8-404f-8ef1-4956a7a1ca17)

- Vistas responsive 3.
![alt text](https://firebasestorage.googleapis.com/v0/b/felix-lm.appspot.com/o/extras%2FResponsive%203.png?alt=media&token=f0895174-e1b5-46c7-8333-cd271de17161)
