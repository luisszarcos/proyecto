/*
ERROR list:
0   Todo bien.
1   Usuario/contraseña incorrectos.
2   Fallo al conectar a la base de datos local.
3   Fallo al conectar a la base de datos remota.
4   Error en la base de datos.
5   Consulta regreso conjunto vacío.
6   Fallo al ejecutar consulta.
7   Sesión expiro.
8   Cantidad incorrecta de datos en formulario.
9   Datos inválidos en formulario.
10  Operación denegada.
11  Formulario invalido.
12  Archivo en formulario es demasiado grande.
13  Fallo al ejecutar transaccion.
14  Fallo al procesar archivo subido.
15  Operacion solicitada no valida.
16  Recivido un numero incorrecto de archivos.
17  Invalid file type on form.
18  Unregistered handle function.
19  Fallo al enviar Email de recuperación.
20  Lista(s) pasada es(son) incorrecta(s).
21  Timeout on local connection.
22  Timeout on remote connection.
23  Error al cerrar coneccion.
24  Fallo al bloquear tablas.
25  Operacion distribuida cancelada.
26  Correo de recuperacion no pudo enviarce.
27  No se pudo bloquear tablas. Operacion pendiente.
28  Registro repetido

255 Error generico.
*/

module.exports = {

    SUCCESS: "0",

    ERR_001: "1",
    ERR_002: "2",
    ERR_003: "3",
    ERR_004: "4",
    ERR_005: "5",
    ERR_006: "6",
    ERR_007: "7",
    ERR_008: "8",
    ERR_009: "9",
    ERR_010: "10",
    ERR_011: "11",
    ERR_012: "12",
    ERR_013: "13",
    ERR_014: "14",
    ERR_015: "15",
    ERR_016: "16",
    ERR_017: "17",
    ERR_018: "18",
    ERR_019: "19",
    ERR_020: "20",
    ERR_021: "21",
    ERR_022: "22",
    ERR_023: "23",
    ERR_024: "24",
    ERR_025: "25",
    ERR_026: "26",
    ERR_027: "27",
    ERR_028: "28",
    ERR_029: "29",
    ERR_030: "30",

    ERR_255: "255",

    ERR_LIST: [
        "1","2","3","4","5","6","7","8","9","10","11","11",
        "255"
    ]

};
