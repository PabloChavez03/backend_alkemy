# CHALLENGE BACKEND - NodeJS 🚀

Datos a tener en cuenta para el funcionamiento de la API. 

## 1. Variables de entorno

Deberá crear un archivo `.env` y escribir dentro los siguientes datos:

    `DB_USER` = *un usuario o dueño de la base de datos (en mi caso use PostgreSQL)*

    `DB_PASSWORD` = *la contraseña de respectiva base de datos junto a su usuario.*
    `DB_NAME` = *nombre de la base de datos que haya creado a utilizar (la misma con las credenciales anteriormente creadas)*

    `DB_HOST` = *por defecto deberia de poner localhost*

    `PORT` = *elija un puerto, yo suelo usar el 3333*

    `SECRET_WORD` = *esta es definida para el cifrado con JWT, para la autenticación de usuarios.*

    `DB_NAME_TEST` = *por defecto le puede poner test. Es para los tests.*

    `SENDGRID_API_KEY` = *adicionalmente deberá registrarse y proporcionar una api key para sengrid para los emails.*

    `TEMPLATE_ID` = *es para proporcionar un template a los emails, SendGrid le ofrece esta posibilidad, me parece muy buena.*
    


### 1.2 Adicional

Adicionalmente deberá registrarse en Sengrid para conseguir su SENGRID_API_KEY. 

_Yo actualmente quise cederles mi apikey y me suspendieron momentaneamente la cuenta por exponer la apikey, pero ya estará desbloqueada._

## 2. Testing

Los test corren con el script `npm test` . Con los test sendgrid puede llegar a darle un error pero es porque necesitaria otra apikey para el test, no lo vi necesario. 

## Documentación de la API

Link de Postman: [https://go.postman.co/workspace/My-Workspace~2e0339d2-096b-4e70-8f12-2d034bdfd663/collection/23163166-8d5a4ed7-9502-4299-9270-00aaa409d750?action=share&creator=23163166](https://go.postman.co/workspace/My-Workspace~2e0339d2-096b-4e70-8f12-2d034bdfd663/collection/23163166-8d5a4ed7-9502-4299-9270-00aaa409d750?action=share&creator=23163166)