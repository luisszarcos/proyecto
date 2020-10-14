var app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        //Index
        .when("/", {
            templateUrl: "login.html",
            controller: "loginController"
        })
        .when("/login", {
            templateUrl: "login.html",
            controller: "loginController"
        })
        .when("/recovery", {
            templateUrl: "recovery.html",
            controller: "recoveryC"
        }) //falta
        // End Index

        //Admin
        .when("/index_admin", {
            templateUrl: "admin/admin_home.html",
            controller: "adminControllerI"
        })
        //Admin_Posgrado
        .when("/posgrado", {
            templateUrl: "admin/admin_posgrados_list.html",
            controller: "posgradoController"
        })
        .when("/nuevo_posgrado", {
            templateUrl: "admin/admin_posgrado_new.html",
            controller: "NuevoPosgrado"
        })
        .when("/DetallesPosgrado", {
            templateUrl: "admin/admin_posgrado_view.html",
            controller: "DetallesPosgradoC"
        })
        .when("/AgregarLineaInvestigacion", {
            templateUrl: "admin/admin_line_new.html",
            controller: "AgregarLineaI"
        })
        .when("/VerConvocatoria", {
            templateUrl: "admin/admin_conv_view.html",
            controller: "VerConvocatoriaC"
        })
        .when("/EditarPosgrado", {
            templateUrl: "admin/admin_posgrado_edit.html",
            controller: "EditarPosgradoC"
        })
        .when("/Ver_Linea_Investigacion", {
            templateUrl: "admin/admin_line_view.html",
            controller: "VerLineaC"
        })
        .when("/EditarProfesoresLinea", {
            templateUrl: "admin/admin_profesor_list.html",
            controller: "EditarProfesoresLineaC"
        })
        .when("/AgregarTema", {
            templateUrl: "admin/admin_theme_new.html",
            controller: "AgregarTemaC"
        })
        .when("/PerfilProfesor", {
            templateUrl: "admin/admin_profesor_profile.html",
            controller: "PerfilProfesorC"
        })
        .when("/VerTema", {
            templateUrl: "admin/admin_theme_m.html",
            controller: "VerTemaC"
        })
        .when("/Grupo", {
            templateUrl: "admin/admin_group.html",
            controller: "VerGrupoC"
        })
        .when("/EditarGrupo", {
            templateUrl: "admin/admin_group_edit.html",
            controller: "EditarGrupoC"
        })
        .when("/NuevoGrupo", {
            templateUrl: "admin/admin_group_new.html",
            controller: "NuevoGrupoC"
        })
        //Admin_Registrador
        .when("/index_registrador", {
            templateUrl: "admin/admin_registrador.html",
            controller: "RegistradorC"
        })
        .when("/NuevoRegistrador", {
            templateUrl: "admin/admin_registrador_new.html",
            controller: "NuevoRegistradorC"
        })
        .when("/ListadoRegistradores", {
            templateUrl: "admin/admin_registrador_list.html",
            controller: "ListadoRegistradoresC"
        })
        .when("/VerRegistrador", {
            templateUrl: "admin/admin_registrador_profile_m.html",
            controller: "VerRegistradorC"
        })
        //Admin_Area
        .when("/index_Area", {
            templateUrl: "admin/admin_area.html",
            controller: "AreaC"
        })
        .when("/NuevaArea", {
            templateUrl: "admin/admin_area_new.html",
            controller: "NuevaAreaC"
        })
        .when("/ListadoAreas", {
            templateUrl: "admin/admin_area_list.html",
            controller: "ListadoAreasC"
        })
        .when("/EditarArea", {
            templateUrl: "admin/admin_area_edit.html",
            controller: "EditarAreaC"
        })
        //End Admin

        //Alumno
        .when("/index_Alumno", {
            templateUrl: "alumno/alumno_home.html",
            controller: "IndexAlumnoC"
        })
        .when("/VerPerfilAlumno", {
            templateUrl: "alumno/alumno_profile.html",
            controller: "VerPerfilAlumnoC"
        })
        .when("/VerRecursoA", {
            templateUrl: "alumno/alumno_recurso_view.html",
            controller: "VerRecursoAC"
        })
        .when("/VerActividadA", {
            templateUrl: "alumno/alumno_activity.html",
            controller: "VerActividadAC"
        })
        .when("/ForoA", {
            templateUrl: "alumno/alumno_foro.html",
            controller: "ForoAC"
        })
        .when("/VerConvocatoriaAlumno", {
            templateUrl: "alumno/alumno_conv_view.html",
            controller: "VerConvocatoriaAlumnoC"
        })
        .when("/VerPublicacionA", {
            templateUrl: "alumno/alumno_post.html",
            controller: "VerPublicacionAC"
        })
        .when("/SolicitudIngreso1", {
            templateUrl: "alumno/alumno_solicitud_new.html",
            controller: "SolicitudIngreso1C"
        }) //Ambiguo
        .when("/SolicitudIngreso2", {
            templateUrl: "alumno/alumno_solicitud_preview.html",
            controller: "SolicitudIngreso2C"
        }) //Ambiguo
        .when("/VerSolicitudA", {
            templateUrl: "alumno/alumno_solicitud.html",
            controller: "VerSolicitudAC"
        }) //Ambiguo
        //Falta EditarPerfil
        //Falta Vista Previa Solicitud
        //End Alumno

        //Registrador
        .when("/index_Registrador", {
            templateUrl: "registrador/reg_home.html",
            controller: "IndexRegistradorC"
        })
        .when("/MenuAlumno", {
            templateUrl: "registrador/reg_alumnos.html",
            controller: "MenuAlumnoC"
        })
        .when("/AltaAlumno", {
            templateUrl: "registrador/reg_alumno_new.html",
            controller: "AltaAlumnoC"
        })
        .when("/ListarAlumnos", {
            templateUrl: "registrador/reg_alumnos_list.html",
            controller: "ListarAlumnosC"
        })
        .when("/VerAlumno", {
            templateUrl: "registrador/reg_alumno_profile.html",
            controller: "VerAlumnoC"
        })
        .when("/VerSolicitudes", {
            templateUrl: "registrador/reg_solicitudes_list.html",
            controller: "VerSolicitudesC"
        })
        .when("/DetallesSolicitud", {
            templateUrl: "registrador/reg_solicitud_view.html",
            controller: "DetallesSolicitudC"
        })
        .when("/SolicitudesAceptadas", {
            templateUrl: "registrador/reg_solicitud_aceptada_list.html",
            controller: "SolicitudesAceptadasC"
        })
        .when("/AsignacionPosgrado", {
            templateUrl: "registrador/reg_solicitud_aceptada_view.html",
            controller: "AsignacionPosgrado"
        })
        .when("/MenuProfesor", {
            templateUrl: "registrador/reg_profesores.html"
        })
        .when("/AltaProfesor", {
            templateUrl: "registrador/reg_profesor_new.html",
            controller: "AltaProfesorC"
        })
        .when("/ListarProfesores", {
            templateUrl: "registrador/reg_profesores_list.html",
            controller: "ListarProfesoresC"
        })
        .when("/VerProfesor", {
            templateUrl: "registrador/reg_profesor_profile.html",
            controller: "VerProfesorC"
        })
        .when("/EditarProfesor", {
            templateUrl: "registrador/reg_profesor_edit.html",
            controller: "EditarProfesorC"
        })
        //End Registrador

        //Profesor
        .when("/index_Profesor", {
            templateUrl: "profesor/profesor_home.html",
            controller: "IndexProfesorC"
        })
        .when("/VerPerfilProfesor", {
            templateUrl: "profesor/profesor_profile.html",
            controller: "VerPerfilProfesorC"
        })
        .when("/EditarPerfilP", {
            templateUrl: "profesor/profesor_profile_edit.html",
            controller: "EditarPerfilPC"
        })
        .when("/VerCurso", {
            templateUrl: "profesor/profesor_curso.html",
            controller: "VerCursoC"
        })
        .when("/VerRecursoP", {
            templateUrl: "profesor/profesor_recurso_view.html",
            controller: "VerRecursoPC"
        })
        .when("/VerActividadP", {
            templateUrl: "profesor/profesor_activity.html",
            controller: "VerActividadPC"
        })
        .when("/Calificar", {
            templateUrl: "profesor/profesor_activity_calif.html",
            controller: "CalificarC"
        })
        .when("/AgregarActividad", {
            templateUrl: "profesor/profesor_activity_new.html",
            controller: "AgregarActividadC"
        })
        .when("/AgregarRecurso", {
            templateUrl: "profesor/profesor_recurso_new.html",
            controller: "AgregarRecursoC"
        })
        .when("/FinCurso", {
            templateUrl: "profesor/profesor_curso_end.html",
            controller: "FinCursoC"
        })
        .when("/ForoP", {
            templateUrl: "profesor/profesor_foro.html",
            controller: "ForoPC"
        })
        .when("/VerPublicacionP", {
            templateUrl: "profesor/profesor_post.html",
            controller: "VerPublicacionPC"
        })
    /*.when("/VerPerfilAlumnoP", {
        templateUrl: "",
        controller: "VerPerfilAlumnoPC"
    })*/
    ;
    //End Profesor

    /*
            .otherwise({
                templateUrl: "login.html",
                controller: "loginController"
            })

      */
});

//Loging Controllers
app.controller("loginController", function ($scope, $location, $rootScope) {
    $scope.$on("$routeChangeSuccess", function () {

        if ($location.path() == '/' || $location.path() == "/login") {




            if ($location.path() == "/login") {
                localStorage.removeItem("IdUsuario");
                localStorage.removeItem("NombreUsuario");
                localStorage.removeItem("IdCurso");

                ajaxCierre();
                window.location.href = "#!"
                $location.path("/")

            } else {
                EstablecerListeners();
            }

        }
    });

    EstablecerListeners = function () {

        var divUser = document.getElementById("nav_bar_id");
        divUser.classList.add("d-none");
        var btnEnviar = document.getElementById("btn_login");

        btnEnviar.addEventListener("click", function () {
            //alert("Inicio de sesión");
            var respueta = ajax(divUser);
        })
    }

    $scope.cambiar = function (datos) {

    }

    ajax = function (divUser) {
        //alert("Hola");
        var userName = document.getElementById("user_name");

        $("form#data").submit(function (event) {
            //alert("Hola");
            waitingForData = true;
            // //event.preventDefault();
            var formData = new FormData($(this)[0]);
            //console.log($(this)[0]);
            formData.append("Operation", "1");
            $.ajax({
                url: 'login',
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {

                    //console.log(data);
                    if (data == 5) {
                        alert("Usuario/contraseña incorrectos.");

                        return false;
                    } else {

                        data = JSON.parse(data);
                        console.log(data);
                        console.log(data[0][0].IdUniversidadSitio);
                        //alert(data[0][0].IdUsuario);
                        localStorage.setItem("NombreUsuario", data[0][0].NombreUsuario);
                        localStorage.setItem("IdentificadorSitio", data[0][0].IdentificadorSitio);
                        localStorage.setItem("IdUniversidadSitio", data[0][0].IdUniversidadSitio);
                        localStorage.setItem("IdUsuario", data[0][0].IdUsuario);
                        $rootScope.IdUsuario = data[0][0].IdUsuario;
                        divUser.classList.remove("d-none");


                        console.log(document.getElementById("RadioProfe").checked);

                        if (document.getElementById("RadioAdmin").checked == true) {
                            divUser.classList.remove("d-none");
                            window.location.href = "#!index_admin";
                        }
                        if (document.getElementById("RadioAlumno").checked == true) {
                            divUser.classList.remove("d-none");
                            window.location.href = "#!index_Alumno";
                        }
                        if (document.getElementById("RadioRegistrador").checked == true) {
                            divUser.classList.remove("d-none");
                            window.location.href = "#!index_Registrador";
                        }
                        if (document.getElementById("RadioProfe").checked == true) {
                            divUser.classList.remove("d-none");
                            window.location.href = "#!index_Profesor";
                        }
                        return true;
                    }
                    // console.log(data);

                    //console.log(data);
                    formDataSubmissionHasFinished = false;
                }
            });
            return false;
        });
    }



    ajaxCierre = function () {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($("Adios")[0]);
        $.ajax({
            url: 'unlogin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                respuesta1 = Errores(respuesta);


            }
        });

        return respuesta1;
    }



    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("recoveryC", function ($scope, $location, $rootScope) {
    $scope.$on("$routeChangeSuccess", function () {

        if ($location.path() == '/recovery') {

            EstablecerListeners();
        }
    });

    EstablecerListeners = function () {



        document.getElementById("").addEventListener("click", function () {

            ajax();
        })
    }



    ajax = function () {
        //alert("Hola");


        $("form#Principal").submit(function (event) {
            //alert("Hola");
            waitingForData = true;
            // //event.preventDefault();
            var formData = new FormData($(this)[0]);
            //console.log($(this)[0]);
            formData.append("Operation", "1");
            $.ajax({
                url: 'login',
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {

                    //console.log(data);
                    if (data == 5) {
                        alert("Usuario/contraseña incorrectos.");

                        return false;
                    } else {



                        if (document.getElementById("RadioAdmin").checked == true) {
                            window.location.href = "#!index_admin";
                        }
                        if (document.getElementById("RadioAlumno").checked == true) {
                            divUser.classList.remove("d-none");
                            window.location.href = "#!index_Alumno";
                        }
                        if (document.getElementById("RadioRegistrador").checked == true) {
                            window.location.href = "#!index_Registrador";
                        }
                        if (document.getElementById("RadioProfe").checked == true) {
                            divUser.classList.remove("d-none");
                            window.location.href = "#!index_Profesor";
                        }
                        return true;
                    }
                    // console.log(data);

                    //console.log(data);
                    formDataSubmissionHasFinished = false;
                }
            });
            return false;
        });
    }


    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});
//End Loging Controllers


//Admin Controllers
app.controller("adminControllerI", function ($scope, $location, $rootScope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/index_admin') {
            console.log($rootScope.IdUsuario);
            setListeners();
        }
    });

    //actualizar ID's y agregar Listeners
    setListeners = function () {
        document.getElementById("nav_bar_id").classList.remove("d-none");
        document.getElementById("BtnVerPerfil").classList.add("d-none");
        document.getElementById("NombreU").setAttribute("value", localStorage.getItem("NombreUsuario"));
        document.getElementById("BtnVerPerfil").disabled = true;
        var btnPosgrado = document.getElementById("Posgradobtn");
        var btnRegistrador = document.getElementById("Registrador");
        var btnArea = document.getElementById("AreaConocimiento");

        btnPosgrado.addEventListener("click", function () {

            $rootScope.Id_Admin = $rootScope.IdUsuario;
            window.location.href = "#!posgrado";
            // $location.path("/posgrado");
        });
        btnArea.addEventListener("click", function () {
            window.location.href = "#!index_Area";
        });
        btnRegistrador.addEventListener("click", function () {
            window.location.href = "#!index_registrador";
        });
    }
});

app.controller("posgradoController", function ($rootScope, $location, $scope) {

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/posgrado') {
            actualizar();
        }
    });

    actualizar = function () {

        var id = document.getElementById("IdAdmin");
        var operation = document.getElementById("Operation");
        id.setAttribute("value", localStorage.getItem("IdUsuario"));
        operation.setAttribute("value", "1");

        var obj = JSON.parse(AJAX("form#Oculto"));



        id.setAttribute("value", localStorage.getItem("IdUsuario"));
        operation.setAttribute("value", "39");

        var obj1 = JSON.parse(AJAX("form#Oculto"));






        var areaConocimiento = document.getElementById("areaConocimiento"); //areaConocimiento Select



        var txtAreas;
        var option;

        for (cont = 0; cont < obj1[0].length; cont++) {
            option = document.createElement("option");
            option.value = obj1[0][cont].IdAreaConocimiento;
            txtAreas = document.createTextNode(obj1[0][cont].NombreAreaConomiento)
            option.appendChild(txtAreas);
            areaConocimiento.appendChild(option);
        }

        setListeners(obj);



    }
    //Hay Modificaciones
    setListeners = function (obj) {

        var btnBuscar = document.getElementById("buscar"); //btn Buscar 
        var btnNuevoPosgrado = document.getElementById("NuevoP");
        var btnHome = document.getElementById("btnHome");
        var btnReturn = document.getElementById("btnRet");
        var btnTodosP = document.getElementById("ListarTodos");

        var divColInf;
        var divColBtn;
        var divPosgrados = document.getElementById("resultados"); //div para los posgrados
        var divTemp;

        var stringObject = JSON.stringify(obj);
        btnTodosP.setAttribute("value", stringObject);

        btnTodosP.addEventListener("click", function (ev) {
            //alert("hola");
            var obj = JSON.parse(ev.target.value);

            var posgradoInf;
            var nombrePosgrado;
            var txtPosgrado;
            var btnEntrar;

            var divTodos = document.createElement("div");
            divTodos.setAttribute("id", "Todos");






            console.log(obj[0]);
            console.log(obj[0].length);


            for (cont = 0; cont < obj[0].length; cont++) {

                posgradoInf = document.createElement("div");
                posgradoInf.className = "row form-group";




                divColInf = document.createElement("div");
                divColInf.className = "col-md-10";

                nombrePosgrado = document.createElement("span");
                nombrePosgrado.className = "form-control";
                txtPosgrado = document.createTextNode(obj[0][cont].NombrePosgrado);
                nombrePosgrado.appendChild(txtPosgrado);
                divColInf.appendChild(nombrePosgrado);

                posgradoInf.appendChild(divColInf);

                divColBtn = document.createElement("div");
                divColBtn.className = "col-md-2";

                btnEntrar = document.createElement("button");
                btnEntrar.appendChild(document.createTextNode("Detalles"));
                btnEntrar.className = "btn btn-success btn-block"; //clase para estilos

                var ObjectString = JSON.stringify(obj[0][cont]);
                btnEntrar.setAttribute("value", ObjectString);

                btnEntrar.addEventListener("click", function (ev) {

                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Posgrado = datos.IdPosgrado;
                    window.location.href = "#!DetallesPosgrado";
                    //$location.path("/DetallesPosgrado");

                });
                divColBtn.appendChild(btnEntrar);
                posgradoInf.appendChild(divColBtn);
                //console.log(posgradoInf);
                divTodos.appendChild(posgradoInf);
            }



            if (divPosgrados.hasChildNodes()) {
                if (document.body.contains(document.getElementById("Busqueda"))) {
                    document.getElementById("Busqueda").remove();
                }

                if (document.body.contains(document.getElementById("Todos"))) {
                    document.getElementById("Todos").remove();
                }
                //console.log("Pintará posgrados");
                divPosgrados.appendChild(divTodos);

            } else {
                //console.log("Pintará posgrados");
                divPosgrados.appendChild(divTodos);
            }









            /*btnHome.addEventListener("click", function () {
                window.location.href = "#!index_admin";
                // $location.path("/index_admin");
            });
            btnReturn.addEventListener("click", function () {
                window.location.href = "#!index_admin";
                //$location.path("/index_admin");
            })
            btnNuevoPosgrado.addEventListener("click", function () {
                window.location.href = "#!nuevo_posgrado";
                //$location.path("/nuevo_posgrado");
            });*/




        });
        btnBuscar.addEventListener("click", function (ev) {


            //Se modificó esta parte


            document.getElementById("IdAdmin1").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("Operation1").setAttribute("value", "2");
            var datos = JSON.parse(AJAX("form#Principal"));



            var divPosgrados = document.getElementById("resultados");

            var divPosgradosBusqueda;
            var posgradoInf;
            var nombrePosgrado;
            var txtPosgrado;
            var btnEntrar;

            divPosgradosBusqueda = document.createElement("div");
            divPosgradosBusqueda.setAttribute("id", "Busqueda");

            console.log(datos[0]);

            for (cont = 0; cont < datos[0].length; cont++) {
                //parte modificada




                posgradoInf = document.createElement("div");
                posgradoInf.className = "row form-group";

                divColInf = document.createElement("div");
                divColInf.className = "col-md-10";

                nombrePosgrado = document.createElement("span");
                nombrePosgrado.className = "form-control";
                txtPosgrado = document.createTextNode(datos[0][cont].NombrePosgradoFiltrado);
                nombrePosgrado.appendChild(txtPosgrado);
                divColInf.appendChild(nombrePosgrado);

                posgradoInf.appendChild(divColInf);

                divColBtn = document.createElement("div");
                divColBtn.className = "col-md-2";

                btnEntrar = document.createElement("button");

                btnEntrar.className = "btn btn-success btn-block"; //clase para estilos

                var ObjectString = JSON.stringify(datos[0][cont]);
                btnEntrar.setAttribute("value", ObjectString);
                btnEntrar.appendChild(document.createTextNode("Detalles"));
                btnEntrar.addEventListener("click", function (ev) {

                    var datos = JSON.parse(ev.target.value);
                    $rootScope.Id_Posgrado = datos.IdPosgradoFiltrado;
                    window.location.href = "#!DetallesPosgrado";
                    //$location.path("/DetallesPosgrado");

                });
                divColBtn.appendChild(btnEntrar);
                posgradoInf.appendChild(divColBtn);
                divPosgradosBusqueda.appendChild(posgradoInf);
            }
            if (divPosgrados.hasChildNodes()) {
                if (document.body.contains(document.getElementById("Busqueda"))) {
                    document.getElementById("Busqueda").remove();
                }

                if (document.body.contains(document.getElementById("Todos"))) {
                    document.getElementById("Todos").remove();
                }
                divPosgrados.appendChild(divPosgradosBusqueda);

            } else {
                divPosgrados.appendChild(divPosgradosBusqueda);
            }



        });
    }

    AJAX = function (form) {

        var respuesta1;
        waitingForData = true;
        //event.preventDefault();
        var formData = new FormData($(form)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                respuesta1 = respuesta;
                formDataSubmissionHasFinished = false;
            }
        });

        console.log(JSON.parse(respuesta1));
        return respuesta1;


    }



});

app.controller("NuevoPosgrado", function ($scope, $location, $rootScope) {


    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/nuevo_posgrado') {
            actualizar();
        }
    });

    actualizar = function () {

        var id = document.getElementById("IdAdmin");
        var operation = document.getElementById("Operation");
        //var idForm = document.getElementById("idForm");
        //var operatioForm = document.getElementById("operationForm");
        id.setAttribute("value", localStorage.getItem("IdUsuario"));
        operation.setAttribute("value", "4");
        //idForm.setAttribute("value", $rootScope.Id_Admin);
        //operatioForm.setAttribute("value", "4");

        var ListaAreas = JSON.parse(ajax("form#Oculto"));

        console.log(ListaAreas[0]);

        var SelectArea = document.getElementById("SelectArea");
        var txtArea;
        var option;
        for (cont = 0; cont < ListaAreas[0].length; cont++) {
            option = document.createElement("option");
            option.className = "";
            option.value = ListaAreas[0][cont].IdAreaConocimiento;
            txtArea = document.createTextNode(ListaAreas[0][cont].NombreAreaConocimiento);
            option.appendChild(txtArea);
            SelectArea.appendChild(option);
        }

        setListeners();


    }
    //Se modifico esta funcion
    setListeners = function () {
        $scope.contador = 1;
        //Editar IDS
        var btnFinalizarRegistro = document.getElementById("Guardar");

        //Se modifico esta parte
        btnFinalizarRegistro.addEventListener("click", function () {

            document.getElementById("IdAdminPrincipal").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("Estado").setAttribute("value", "A");
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("Fecha").setAttribute("value", date);
            document.getElementById("OperationPrincipal").setAttribute("value", "5");


            ajax("form#NuevoP");
            window.location.href = "#!posgrado";


        })


    }



    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }




});

app.controller("AgregarLineaI", function ($rootScope, $location, $scope) {


    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AgregarLineaInvestigacion') {
            setListeners();
        }
    });

    setListeners = function () {

        //detallesProfesor

        $scope.ListaTemasP = new Array();
        $scope.ListaP = new Array();
        var NombreP = document.getElementById("NombreProfesor");
        var PosgradoP = document.getElementById("PosgradoProfesor");
        var imagenP = document.getElementById("FotoProfesor");


        //lista Profes

        //Form Oculto 
        var id = document.getElementById("IdAreaO");
        var OperationO = document.getElementById("OperationO");
        id.setAttribute("value", $rootScope.Id_Area);
        OperationO.setAttribute("value", "11");

        var data = JSON.parse(ajax("form#Oculto"));



        var ListaP = document.getElementById("ListaProfesores"); //div
        var txtNompreP;
        var btnDetallesP;
        var txtBtnDetalles;
        var spanP;
        var CheckboxP;
        var divP;
        var divCol;

        console.log(data);
        //        for (c = 0; c < data.length; c++) {
        for (i = 0; i < data[0].length; i++) {
            divP = document.createElement("div");
            divP.className = "row form-group"; //completar

            //Columna Checkbox
            divCol = document.createElement("div");
            divCol.className = "col-md-1 d-flex justify-content-end align-items-center"; //Completar

            CheckboxP = document.createElement("input");
            CheckboxP.type = "checkbox";
            CheckboxP.className = "form-check-input";
            var ObjectString = JSON.stringify(data[0][i]);
            CheckboxP.setAttribute("value", ObjectString);


            CheckboxP.addEventListener("change", function (e) {
                var data = JSON.parse(e.target.value);
                var caller = e.target || e.srcElement;
                if (caller.checked) {
                    addElement(data.IdProfesor, 1);
                } else {
                    addElement(data.IdProfesor, 2);
                }
            });
            divCol.appendChild(CheckboxP);
            divP.appendChild(divCol);
            //Columna Span
            divCol = document.createElement("div");
            divCol.className = "col-md-9"; //Completar

            spanP = document.createElement("span");
            spanP.className = "form-control";
            txtNompreP = document.createTextNode(data[0][i].NombreProfesor);
            spanP.appendChild(txtNompreP);
            divCol.appendChild(spanP);
            divP.appendChild(divCol);

            //Columna Botón
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //Completar

            btnDetallesP = document.createElement("button");
            btnDetallesP.className = "btn btn-primary btn-block";
            txtBtnDetalles = document.createTextNode("Detalles");
            btnDetallesP.appendChild(txtBtnDetalles);
            var ObjectString = JSON.stringify(data[0][i]);
            btnDetallesP.setAttribute("value", ObjectString);
            btnDetallesP.addEventListener("click", function (ev) {
                var data = JSON.parse(ev.target.value);
                var idProfesor = document.getElementById("IdProfesorOculto");
                var Operation = document.getElementById("Operation");

                idProfesor.setAttribute("value", data.IdProfesor);
                Operation.setAttribute("value", "12");

                var DetalleP = JSON.parse(ajax("form#Oculto2"));

                //
                NombreP.value = DetalleP[0][0].NombreProfesor;
                PosgradoP.value = DetalleP[0][0].PosgradoProfesor;
                //imagenP.getAttributeNode("src").value = DetalleP.FotoProfesor;

            });

            divCol.appendChild(btnDetallesP);
            divP.appendChild(divCol);
            ListaP.appendChild(divP);

        }
        // }


        //CrearTema

        var NombreT = document.getElementById("NombreTema");
        var ClaveT = document.getElementById("ClaveT")
        var btnTema = document.getElementById("btnAddTema");
        //lista Temas
        var ListaTema = document.getElementById("ListaTema"); //div
        var divTema;
        var spanTema;
        var txtTema;
        var btnEliminarTema;
        var txtBtnEliminarTema;
        var inputHidden;
        var divCol;


        btnTema.addEventListener("click", function () {
            divTema = document.createElement("div");
            divTema.className = "row form-group"; //completar

            //Span
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //Completar


            spanTema = document.createElement("span");
            spanTema.className = "form-control";
            txtTema = document.createTextNode("ID: " + ClaveT.value + " Nombre: " + NombreT.value);
            spanTema.appendChild(txtTema);

            divCol.appendChild(spanTema);
            divTema.appendChild(divCol);

            //Boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //Completar

            btnEliminarTema = document.createElement("button");
            btnEliminarTema.className = "btn btn-success btn-block";
            txtBtnEliminarTema = document.createTextNode("Eliminar");
            btnEliminarTema.appendChild(txtBtnEliminarTema);
            var obj = {
                Id: ClaveT.value,
                Nombre: NombreT.value
            };
            var objString = JSON.stringify(obj);
            btnEliminarTema.setAttribute("value", objString);
            btnEliminarTema.addEventListener("click", function (e) {
                var caller = e.target || e.srcElement;
                var divPadre = caller.parentElement;
                var divRowE = divPadre.parentElement;
                var obj = JSON.parse(e.target.value);

                ListaTemas(obj.Id, obj.Nombre, 2);
                divRowE.remove();
            });
            divCol.appendChild(btnEliminarTema);
            divTema.appendChild(divCol);
            ListaTema.appendChild(divTema);
            ListaTemas(ClaveT.value, NombreT.value, 1);




        });

        // Guardar

        var btnGuardar = document.getElementById("Guardar");

        btnGuardar.addEventListener("click", function () {

            //Form Principal
            var id = document.getElementById("IdPosgrado");
            id.setAttribute("value", $rootScope.Id_Posgrado);
            var idAdmin = document.getElementById("IdAdmin");
            idAdmin.setAttribute("value", localStorage.getItem("IdUsuario"));
            var Operation = document.getElementById("OperationP");

            document.getElementById("Estado1").setAttribute("value", "A");
            Operation.setAttribute("value", "13_1");
            ajaxG("form#Principal");
            window.location.href = "#!DetallesPosgrado";
        });

    }

    createElementL = function (id) {
        if (DivID.indexOf(id) == -1) {
            DivID.push(id);
            return id;
        } else {
            return -1;
        }



    }
    ListaTemas = function (id, nombre, op) {
        var obj = {
            Clave: id,
            Nombre: nombre,
            Estado: "A"
        };
        if (op == 1) {

            $scope.ListaTemasP.push(obj);
        } else {

            for (i = 0; i < $scope.ListaTemasP.length; i++) {
                if (obj.Clave == $scope.ListaTemasP[i].Clave) {
                    console.log($scope.ListaTemasP[i].Clave);
                    $scope.ListaTemasP.splice(i, 1);
                }
            }


        }
        console.log($scope.ListaTemasP);
    }
    addElement = function (id, op) {
        var obj = {
            IdProfesor: id
        };
        if (op == 1) {
            $scope.ListaP.push(obj);
        } else {
            var i = $scope.ListaP.indexOf(obj);
            $scope.ListaP.splice(i, 1);


        }

        console.log($scope.ListaP);

    }
    ajax = function (formulario) {


        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                respuesta1 = Errores(respuesta);



            }


        });
        return respuesta1;




    }
    ajaxG = function (formulario) {

        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                if (Errores(respuesta) != "Error") {
                    var idLineaInvestigacion = document.getElementById("IdLineaO");
                    var Operation = document.getElementById("OperationO1");
                    var resp = JSON.parse(respuesta);
                    var resp1 = resp[0][0];

                    $scope.IdLineaInvestigacion = resp1.IdLineaInvestigacion;

                    idLineaInvestigacion.setAttribute("value", resp1.IdLineaInvestigacion);
                    Operation.setAttribute("value", "13_2");

                    var JSONp = JSON.stringify($scope.ListaP);
                    ajaxG1(JSONp, "form#Oculto3", 1);
                }
                // respuesta1 = respuesta;




            }
        });
        //return respuesta1;

    }
    ajaxG1 = function (JSONp, formulario, op) {
        var respuesta1;
        waitingForData = true;
        // ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        if (op == 1) {
            formData.append("ListadeProfesores", JSONp);
        } else {
            formData.append("ListadeTemas", JSONp);
        }

        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                if (Errores(respuesta) != "Error") {
                    var idLineaInvestigacion = document.getElementById("IdLineaO");
                    var Operation = document.getElementById("OperationO1");
                    idLineaInvestigacion.setAttribute("value", $scope.IdLineaInvestigacion);
                    Operation.setAttribute("value", "13_3");

                    var JSONp = JSON.stringify($scope.ListaTemasP);
                    ajaxG2(JSONp, "form#Oculto3", 2);
                }

                // respuesta1 = respeusta;




            }
        });
        // return respuesta1;

    }


    ajaxG2 = function (JSONp, formulario, op) {
        var respuesta1;
        waitingForData = true;
        // ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        if (op == 1) {
            formData.append("ListadeProfesores", JSONp);
        } else {
            formData.append("ListadeTemas", JSONp);
        }

        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                if (Errores(respuesta) != "Error") {

                }






            }
        });


    }

    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                return "Error";
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                return "Error";
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                return "Error";
                break;
            case "4":
                alert("Error en la BD");
                return "Error";
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                return "Error";
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                return "Error";
                break;
            case "7":
                alert("Sesión Expiro");
                return "Error";
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                return "Error";
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                return "Error";
                break;
            case "10":
                alert("Operación denegada");
                return "Error";
                break;
            case "11":
                alert("Formulario Invalido");
                return "Error";
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                return "Error";
                break;
            case "255":
                alert("¡Error!");
                return "Error";
                break;

            default:
                return error;
                break;
        }
        return "Bien";



    }





});

app.controller("DetallesPosgradoC", function ($scope, $location, $rootScope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/DetallesPosgrado') {
            setListeners();
        }
    });

    setListeners = function () {
        var idP = document.getElementById("IdPosgradoOculto");
        var Op = document.getElementById("Operation");
        var idA = document.getElementById("IdAdminOculto")
        idP.setAttribute("value", $rootScope.Id_Posgrado);
        Op.setAttribute("value", "6");
        idA.setAttribute("value", localStorage.getItem("IdUsuario"));

        var datos = JSON.parse(ajax("form#Oculto"));

        var Nombre = document.getElementById("NombreP");
        var Clave = document.getElementById("ClaveP");
        var Area = document.getElementById("AreaC");
        var Nivel = document.getElementById("Nivel");
        var divLineasInvestigacion = document.getElementById("divLienas");
        var btnVerConvocatoria = document.getElementById("btnVerC");
        //var NombreConvocatoria = document.getElementById("NombreConvocatoria");


        //FormOculto2
        var idP = document.getElementById("IdPosgradoOculto1");
        var Op1 = document.getElementById("Operation2");
        idP.setAttribute("value", $rootScope.Id_Posgrado);
        Op1.setAttribute("value", "7");
        var archivo1 = JSON.parse(ajax("form#Oculto1"));
        //NombreConvocatoria.setAttribute("value", archivo.NombreArchivo);
        var archivo = archivo1[0][0];
        console.log(archivo);
        Nombre.setAttribute("value", datos[0][0].NombrePosgrado);
        Clave.setAttribute("value", datos[0][0].ClavePosgrado);
        Area.setAttribute("value", datos[0][0].NombreAreaConocimientoPg);
        if (datos[0][0].NivelPosgrado == 'D') {
            Nivel.setAttribute("value", 'Doctorado');
        } else {
            Nivel.setAttribute("value", 'Maestría');
        }



        //Llenar lineas te investigación
        var divRow
        var spanLinea;
        var txtLinea;
        var divLineas;
        var btnVerLinea;
        var txtBtnVer;
        var divCol;

        if (!datos[0][0].IdLineaInvestigacionPg == "") {
            for (c = 0; c < datos.length; c++) {
                for (i = 0; i < datos[c].length; i++) {
                    divRow = document.createElement("div");
                    divRow.className = "row"

                    divCol = document.createElement("div");
                    divCol.className = "col-md-10"; //completar

                    spanLinea = document.createElement("span");
                    spanLinea.className = "form-control";
                    txtLinea = document.createTextNode(datos[c][i].NombreLineaInvestigacionPg);
                    spanLinea.appendChild(txtLinea);

                    divCol.appendChild(spanLinea);
                    divRow.appendChild(divCol);

                    divCol = document.createElement("div");
                    divCol.className = "col-md-2"; //completar

                    btnVerLinea = document.createElement("button");
                    txtBtnVer = document.createTextNode("Ver");
                    btnVerLinea.className = "btn btn-success btn-block";

                    var ObjectString = JSON.stringify(datos[c][i]);
                    btnVerLinea.setAttribute("value", ObjectString);
                    btnVerLinea.addEventListener("click", function (ev) {
                        var datos = JSON.parse(ev.target.value);
                        $rootScope.Id_LineaInvestigacion = datos.IdLineaInvestigacionPg;
                        window.location.href = "#!Ver_Linea_Investigacion"
                    });
                    btnVerLinea.appendChild(txtBtnVer);
                    divCol.appendChild(btnVerLinea);
                    divRow.appendChild(divCol);
                    divLineasInvestigacion.appendChild(divRow);

                }
            }
        }

        var btnAgregarLineaInvestigacion = document.getElementById("AgregarLinea");
        var ObjectString = JSON.stringify(datos[0][0]);

        console.log(btnAgregarLineaInvestigacion);

        btnAgregarLineaInvestigacion.setAttribute("value", ObjectString);
        btnAgregarLineaInvestigacion.addEventListener("click", function (ev) {
            // alert("Hola");
            var datos = JSON.parse(ev.target.value);
            $rootScope.Id_Area = datos.IdAreaConocimientoPg;
            window.location.href = "#!AgregarLineaInvestigacion";
            // $location.path("/AgregarLineaInvestigacion");
        });

        var btnEditarPosgrado = document.getElementById("btnEditarP");
        btnEditarPosgrado.addEventListener("click", function () {

            window.location.href = "#!EditarPosgrado";

        });
        var btnHabilitarDes = document.getElementById("btnHabilitar");
        btnHabilitarDes.addEventListener("click", function () {
            document.getElementById("IdPosgradoOculto2").setAttribute("value", $rootScope.Id_Posgrado);
            document.getElementById("Operation3").setAttribute("value", "8");
            ajax("form#Oculto2");
        });


        if (archivo.TipoArchivoPosgrado != "pdf") {
            btnVerConvocatoria.setAttribute("download", archivo.NombreArchivo);
            btnVerConvocatoria.setAttribute("href", archivo.ConvocatoriaPosgrado);
        } else {
            btnVerConvocatoria.addEventListener("click", function () {
                $rootScope.Archivo = archivo.ConvocatoriaPosgrado;
                $rootScope.NombreArchivo = archivo.NombreArchivoPosgrado;
                window.location.href = "#!VerConvocatoria";
            });
        }






    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        console.log(respuesta1);
        return respuesta1;
    }

    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("VerConvocatoriaC", function ($scope, $location, $rootScope) {

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerConvocatoria') {
            setListeners();
        }
    });

    setListeners = function () {
        //var NombreArchiv = document.getElementById("NombreArchivo");
        var Iframe = document.getElementById("convocatoria");


        //NombreArchiv.setAttribute("value", $rootScope.NombreArchivo);
        Iframe.setAttribute("data", $rootScope.Archivo);





    }









});

app.controller("EditarPosgradoC", function ($scope, $location, $rootScope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/EditarPosgrado') {
            setListeners();
        }
    });

    setListeners = function () {

        var IdPosgradoOculto = document.getElementById("IdPosgradoO");
        var Operation = document.getElementById("OptionO1");
        IdPosgradoOculto.setAttribute("value", $rootScope.Id_Posgrado);
        Operation.setAttribute("value", "9");

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        console.log(datos);

        var areaConicimiento = document.getElementById("AreaConocimiento");
        var Nivel = document.getElementById("NivelP");
        var Clave = document.getElementById("ClaveP");

        areaConicimiento.setAttribute("value", datos.AreaConocimientoPosgrado);
        Clave.setAttribute("value", datos.ClavePosgrado);
        if (datos.NivelPosgrado == 'D') {
            Nivel.setAttribute("value", 'Doctorado');
        } else {
            Nivel.setAttribute("value", 'Maestría');
        }

        var btnGuardar = document.getElementById("BtnGuardar");
        var IdPosgrado = document.getElementById("IdPosgradoV");

        btnGuardar.addEventListener("click", function () {
            Operation = document.getElementById("Operation");
            IdPosgrado.setAttribute("value", $rootScope.Id_Posgrado);
            Operation.setAttribute("value", "10");

            if (ajax("form#Principal") != "Error") {
                window.location.href = "#!DetallesPosgrado";
            }



        });



    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                respuesta1 = Errores(respuesta);


            }
        });

        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                return "Error";
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                return "Error";
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                return "Error";
                break;
            case "4":
                alert("Error en la BD");
                return "Error";
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                return "Error";
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                return "Error";
                break;
            case "7":
                alert("Sesión Expiro");
                return "Error";
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                return "Error";
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                return "Error";
                break;
            case "10":
                alert("Operación denegada");
                return "Error";
                break;
            case "11":
                alert("Formulario Invalido");
                return "Error";
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                return "Error";
                break;
            case "255":
                alert("¡Error!");
                return "Error";
                break;

            default:
                return error;
                break;
        }




    }

});

app.controller("VerLineaC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/Ver_Linea_Investigacion') {
            setListeners();
        }
    });

    setListeners = function () {
        var ArrayProgesores = new Array();
        var IdLineaOculto = document.getElementById("IdLienaOculto");
        var Operation = document.getElementById("OperationOculto");

        IdLineaOculto.setAttribute("value", $rootScope.Id_LineaInvestigacion);
        Operation.setAttribute("value", "14_1");

        var ListaProfesores = JSON.parse(ajax("form#Oculto"));

        //console.log(ListaProfesores);

        Operation.setAttribute("value", "14_2");
        var ListaTemas = JSON.parse(ajax("form#Oculto"));


        //Datos Generales

        var Nombre = document.getElementById("NombreLinea");
        var Clave = document.getElementById("ClaveLinea");
        var Estado = document.getElementById("Estado");
        var Area = document.getElementById("Area");

        Nombre.setAttribute("value", ListaProfesores[0][0].NombreLineaInvestigacion);
        Clave.setAttribute("value", ListaProfesores[0][0].ClaveLineaInvestigacion);
        if (ListaProfesores[0][0].EstadoLineaInvestigacion == 'A') {
            Estado.setAttribute("value", "Activo");
        } else {
            Estado.setAttribute("value", "Inactivo");
        }
        Area.setAttribute("value", ListaProfesores[0][0].NombreAreaConocimientoLineaInv);




        //Lista de Profesores

        var divPrincipalP = document.getElementById("Profesores"); //Profesores 
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        if (ListaProfesores[0][0].IdLineaInvestigacion != "") {
            for (r = 0; r < ListaProfesores.length; r++) {
                for (c = 0; c < ListaProfesores[r].length; c++) {
                    divRow = document.createElement("div");
                    divRow.className = "row form-group";

                    //Texto
                    divCol = document.createElement("div");
                    divCol.className = "col-md-9"; //completar

                    span = document.createElement("span");
                    span.className = "form-control";

                    console.log(ListaProfesores[r][c]);
                    txtSpan = document.createTextNode(ListaProfesores[r][c].NombreProfesorLineaInv);
                    span.appendChild(txtSpan);
                    divCol.appendChild(span);
                    divRow.appendChild(divCol);

                    //boton
                    divCol = document.createElement("div");
                    divCol.className = "col-md-3"; //completar

                    BtnVerD = document.createElement("button");
                    BtnVerD.className = "btn btn-success btn-block"; //Cambiar

                    txtBtn = document.createTextNode("Ver Detalles");

                    BtnVerD.appendChild(txtBtn);
                    // console.log(BtnVerD);

                    var ObjectString = JSON.stringify(ListaProfesores[r][c]);
                    BtnVerD.setAttribute("value", ObjectString);
                    BtnVerD.addEventListener("click", function (ev) {
                        var ListaProfesores = JSON.parse(ev.target.value);
                        $rootScope.Id_Profesor = ListaProfesores.IdProfesorLineaInvestigacion;
                        window.location.href = "#!PerfilProfesor"; //completar

                    });
                    divCol.appendChild(BtnVerD);
                    divRow.appendChild(divCol);
                    divPrincipalP.appendChild(divRow);



                }
            }




        }

        //Lista de Temas
        var divPrincipalT = document.getElementById("DivTemas");

        console.log(ListaTemas);
        if (ListaTemas[0][0].IdTemaLineaInvestigacion != "") {
            for (r = 0; r < ListaTemas.length; r++) {
                for (c = 0; c < ListaTemas[r].length; c++) {
                    divRow = document.createElement("div");
                    divRow.className = "row form-group";

                    //Texto
                    divCol = document.createElement("div");
                    divCol.className = "col-md-10"; //completar

                    span = document.createElement("span");
                    span.className = "form-control";

                    txtSpan = document.createTextNode(ListaTemas[r][c].NombreTemaLineaInvestigacion);
                    span.appendChild(txtSpan);
                    divCol.appendChild(span);
                    divRow.appendChild(divCol);

                    //boton
                    divCol = document.createElement("div");
                    divCol.className = "col-md-2"; //completar

                    BtnVerD = document.createElement("button");
                    BtnVerD.className = "btn btn-success btn-block" //Cambiar

                    txtBtn = document.createTextNode("Ver");
                    BtnVerD.appendChild(txtBtn);

                    var ObjectString = JSON.stringify(ListaTemas[r][c]);
                    BtnVerD.setAttribute("value", ObjectString);
                    BtnVerD.addEventListener("click", function (ev) {
                        var ListaTemas = JSON.parse(ev.target.value);
                        $rootScope.Identificador_Sitio = ListaTemas.IdentificadorSitio;
                        $rootScope.Id_Universidad = ListaTemas.IdUniverisdadSitio;
                        $rootScope.Id_Tema = ListaTemas.IdTemaLineaInvestigacion;
                        window.location.href = "#!VerTema"; //completar

                    });
                    divCol.appendChild(BtnVerD);
                    divRow.appendChild(divCol);
                    divPrincipalT.appendChild(divRow);



                }
            }




        }



        //Listeners Botones

        var btnHabilitar_Desabilitar = document.getElementById("BtnHabDes");
        btnHabilitar_Desabilitar.addEventListener("click", function () {
            Operation.setAttribute("value", "15");

            ajax("form#Oculto");
        });

        var btnEditarLinea = document.getElementById("EditarLinea");


        var ObjectString = JSON.stringify(ListaProfesores[0][0]);
        console.clear();
        console.log(ObjectString);
        btnEditarLinea.setAttribute("value", ObjectString);
        btnEditarLinea.addEventListener("click", function (ev) {
            var ListaProfesores = JSON.parse(ev.target.value);
            $rootScope.Id_Area = ListaProfesores.IdAreaConocimientoLineaInv;
            window.location.href = "#!EditarProfesoresLinea"; //Completar
        });

        var btnAgregarTema = document.getElementById("AgregarTema");
        btnAgregarTema.addEventListener("click", function () {
            window.location.href = "#!AgregarTema";
        });





    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        //console.log(respuesta1);
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("EditarProfesoresLineaC", function ($rootScope, $location, $scope) {
    $scope.ListaProfesores = new Array();
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/EditarProfesoresLinea') {
            setListeners();
        }
    });

    setListeners = function () {
        var IdLinea = document.getElementById("IdLineaOculto");
        var IdArea = document.getElementById("AreaC");
        var Operation = document.getElementById("Operation");

        IdLinea.setAttribute("value", $rootScope.Id_LineaInvestigacion);
        IdArea.setAttribute("value", $rootScope.Id_Area);
        Operation.setAttribute("value", "17");
        //ajax("form#Oculto")

        var data = JSON.parse(ajax("form#Oculto"));
        var datos = data[0][0];



        document.getElementById("NombreLinea").setAttribute("value", datos.NombreLineaInvestigacion);
        document.getElementById("ClaveLinea").setAttribute("value", datos.ClaveLineaInvestigacion);


        var ListaP = document.getElementById("resultados2"); //div
        var txtNompreP;
        var btnDetallesP;
        var txtBtnDetalles;
        var spanP;
        var CheckboxP;
        var divP;


        var divRow;
        var divCol;






        for (c = 0; c < data.length; c++) {
            for (i = 0; i < data[c].length; i++) {

                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Checkbox
                divCol = document.createElement("div");
                divCol.className = "col-md-1 d-flex justify-content-end align-items-center"; //completar

                CheckboxP = document.createElement("input");
                CheckboxP.type = "checkbox";
                if (data[c][i].IdLineaInvestigacionPr != null && data[c][i].IdLineaInvestigacionPr != "") {
                    ModificarLista(data[c][i].IdProfesor, true, 1);
                    CheckboxP.checked = true;
                } else {
                    ModificarLista(data[c][i].IdProfesor, false, 1);
                    CheckboxP.checked = false;
                }


                var ObjectString = JSON.stringify(data[c][i]);
                CheckboxP.setAttribute("value", ObjectString);
                CheckboxP.addEventListener("change", function (ev) {
                    var data = JSON.parse(ev.target.value);
                    var box = ev.target || ev.srcElement;
                    if (box.checked) {
                        ModificarLista(data.IdProfesor, "true", 2);
                    } else {
                        ModificarLista(data.IdProfesor, "false", 2);
                    }
                });

                divCol.appendChild(CheckboxP);
                divRow.appendChild(divCol);

                //Span
                divCol = document.createElement("div");
                divCol.className = "col-md-9"; //completar

                spanP = document.createElement("span");
                spanP.className = "form-control"; //completar
                txtNompreP = document.createTextNode(data[c][i].NombreProfesor);
                spanP.appendChild(txtNompreP);
                divCol.appendChild(spanP);
                divRow.appendChild(divCol);

                //boton Detalles
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                btnDetallesP = document.createElement("button");
                btnDetallesP.className = "btn btn-success btn-block"; //completar
                txtBtnDetalles = document.createTextNode("Detalles");
                btnDetallesP.appendChild(txtBtnDetalles);

                var ObjectString = JSON.stringify(data[c][i]);
                btnDetallesP.setAttribute("value", ObjectString);
                btnDetallesP.addEventListener("click", function (ev) {
                    var data = JSON.parse(ev.target.value);

                    var idProfesor = document.getElementById("IdProfesorOculto");
                    var Operation = document.getElementById("Operation1");

                    idProfesor.setAttribute("value", data.IdProfesor);
                    Operation.setAttribute("value", "12");

                    var DetalleP1 = JSON.parse(ajax("form#Oculto2"));
                    var DetalleP = DetalleP1[0][0];
                    //
                    document.getElementById("NomPr").value = DetalleP.NombreProfesor;
                    document.getElementById("PosgradoPr").value = DetalleP.PosgradoProfesor;
                    //imagenP.getAttributeNode("src").value = DetalleP.FotoProfesor;

                })

                divCol.appendChild(btnDetallesP);
                divRow.appendChild(divCol);


                ListaP.appendChild(divRow);

            }
        }


        var btnGuardar = document.getElementById("btn_save");

        btnGuardar.addEventListener("click", function () {
            var IdLineaOculto1 = document.getElementById("IdLineaInvOculto1");
            var Operation = document.getElementById("Operation2");
            IdLineaOculto1.setAttribute("value", $rootScope.Id_LineaInvestigacion);
            Operation.setAttribute("value", "19");
            var ParametroL = JSON.stringify($scope.ListaProfesores);
            ajaxL("form#Oculto1", ParametroL);
            window.location.href = "#!Ver_Linea_Investigacion"

        });


    }


    ModificarLista = function (id, SeAgrega, Op) {
        var Obj = {
            IdProfesor: id,
            SeAgrega: SeAgrega
        };
        if (Op == 1) {
            $scope.ListaProfesores.push(Obj);
        } else {

            for (i = 0; i < $scope.ListaProfesores.length; i++) {
                if ($scope.ListaProfesores[i].IdProfesor == Obj.IdProfesor) {
                    $scope.ListaProfesores[i].SeAgrega = Obj.SeAgrega;
                }
            }

        }

        console.log($scope.ListaProfesores);

    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

    ajaxL = function (formulario, Lista) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        formData.append("ListadeProfesores", Lista);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }

    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("AgregarTemaC", function ($rootScope, $location, $scope) {

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AgregarTema') {
            setListeners();
        }
    });

    setListeners = function () {
        var IdLinea = document.getElementById("IdLinea");
        var Operation = document.getElementById("Operation");
        IdLinea.setAttribute("value", $rootScope.Id_LineaInvestigacion);
        document.getElementById("Estado").setAttribute("value", "A");
        Operation.setAttribute("value", "21");
        var GuardarBtn = document.getElementById("btn_save");
        GuardarBtn.addEventListener("click", function () {
            ajax("form#Principal");
            window.location.href = "#!Ver_Linea_Investigacion"
        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("PerfilProfesorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/PerfilProfesor') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        var IdProfesor = document.getElementById("IdProfesorOcutlo");
        var Operation = document.getElementById("OperationO");
        IdProfesor.setAttribute("value", $rootScope.Id_Profesor);
        Operation.setAttribute("value", "16");

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        console.log(datos);

        var NombreP = document.getElementById("NombreProfesor");
        //var PosgradoP = document.getElementById("PosgradoProfesor");
        //var imagenP = document.getElementById("FotoProfesor");

        NombreP.setAttribute("value", datos.NombreProfesor);
        document.getElementById("Universidad").setAttribute("value", datos.UniversidadProfesor);
        document.getElementById("Cedula").setAttribute("value", datos.CedulaProfesor);
        document.getElementById("Direccion").setAttribute("value", datos.DireccionProfesor);
        document.getElementById("Telefono").setAttribute("value", datos.TelefonoProfesor);
        document.getElementById("Correo").setAttribute("value", datos.CorreoProfesor);


        //PosgradoP.setAttribute("value", datos.PosgradoProfesor);
        //imagenP.setAttribute("src", datos.FotoProfesor);



    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerTemaC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerTema') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form oculto 1
        var IdTema = document.getElementById("IdTemaOculto");
        var Operation = document.getElementById("OperationO");

        IdTema.setAttribute("value", $rootScope.Id_Tema);

        Operation.setAttribute("value", "22");
        var datos = JSON.parse(ajax("form#Oculto"));




        /*
        var IdTema = document.getElementById("IdTema");
        var Operation = document.getElementById("Operation");
        

        IdTema.setAttribute("value", $rootScope.Id_Tema);
        
        Operation.setAttribute("value", "22");*/

        document.getElementById("NombreTema").setAttribute("value", datos[0][0].NombreTema);
        document.getElementById("ClaveTema").setAttribute("value", datos[0][0].ClaveTema);
        if(datos[0][0].EstadoTema == 'A'){
            document.getElementById("EstadoT").setAttribute("value", 'Activo');
            document.getElementById("EstadoT1").setAttribute("value", 'Activo');
        }else{
            document.getElementById("EstadoT").setAttribute("value", 'Inactivo');
            document.getElementById("EstadoT1").setAttribute("value", 'Inactivo');
        }
        
        document.getElementById("NombreTema1").setAttribute("value", datos[0][0].NombreTema);
        document.getElementById("ClaveTema1").setAttribute("value", datos[0][0].ClaveTema);
        


        //ListarGrupos

        var divPrincipalT = document.getElementById("DivTemas");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        if (datos[0][0].Grupo != null) {
            for (r = 0; r < datos.length; r++) {
                for (c = 0; c < datos[r].length; c++) {
                    divRow = document.createElement("div");
                    divRow.className = "row form-group";

                    //Texto
                    divCol = document.createElement("div");
                    divCol.className = "col-md-10"; //completar

                    span = document.createElement("span");
                    span.className = "form-control";

                    txtSpan = document.createTextNode(datos[r][c].Grupo);
                    span.appendChild(txtSpan);
                    divCol.appendChild(span);
                    divRow.appendChild(divCol);

                    //boton
                    divCol = document.createElement("div");
                    divCol.className = "col-md-2"; //completar

                    BtnVerD = document.createElement("button");
                    BtnVerD.className = "btn btn-success btn-block" //Cambiar

                    txtBtn = document.createTextNode("Ver Detalles");
                    BtnVerD.appendChild(txtBtn);
                    ObjectString = JSON.stringify(datos[r][c]);
                    BtnVerD.setAttribute("value", ObjectString);
                    BtnVerD.addEventListener("click", function (ev) {
                        var datos = JSON.parse(ev.target.value);

                        $rootScope.Id_Tema_Impartido = datos.IdTemaImpartido;
                        window.location.href = "#!Grupo"; //completar

                    });
                    divCol.appendChild(BtnVerD);
                    divRow.appendChild(divCol);
                    divPrincipalT.appendChild(divRow);
                }
            }
        }


        document.getElementById("BtnHabilDes").addEventListener("click", function () {
            Operation.setAttribute("value", "23");
            var datos = ajax("form#Oculto");
        });





        document.getElementById("BtnGuardar").addEventListener("click", function () {
            document.getElementById("IdTemaG").setAttribute("value", $rootScope.Id_Tema);

            document.getElementById("OperationG").setAttribute("value", "25");

            ajax("form#Principal");
            window.location.href = "#!VerTema";

        });


        document.getElementById("BtnCancelar").addEventListener("click", function () {
            document.getElementById("admin_theme").classList.remove("d-none");
            document.getElementById("admin_theme_edit").classList.add("d-none");
        });

        document.getElementById("BtnEditar").addEventListener("click", function (e) {

            document.getElementById("admin_theme").classList.add("d-none");
            document.getElementById("admin_theme_edit").classList.remove("d-none");





        });
        console.log(document.getElementById("BtnEditar"));
        document.getElementById("BtnNuevoGrupo").addEventListener("click", function () {



            $rootScope.Id_Tema = IdTema.value;
            window.location.href = "#!NuevoGrupo";
        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("NuevoGrupoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/NuevoGrupo') {
            setListeners();
        }
    });
    setListeners = function () {
        console.clear();
        var IdTema = document.getElementById("IdTemaOculto");
        var Operation = document.getElementById("OperationO");





        IdTema.setAttribute("value", $rootScope.Id_Tema);

        Operation.setAttribute("value", "26");
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];

        console.log(datos1);
        document.getElementById("NombreP").setAttribute("value", datos[0].NombrePosgradoTema);

        document.getElementById("NombreTema").setAttribute("value", datos[0].NombreTema);

        document.getElementById("NombreLineaInvestigacion").setAttribute("value", datos[0].NombreLineaInvestigacionTema);

        var divPrincipalP = document.getElementById("resultados2");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-9"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos[r].NombreProfesorTm);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-3"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Seleccionar");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);
                var idProfesor = document.getElementById("IdProfesorOculto");
                var Operation = document.getElementById("Operation1");

                idProfesor.setAttribute("value", datos.IdProfesorTm);
                Operation.setAttribute("value", "12");



                var DetalleP1 = JSON.parse(ajax("form#Oculto1"));
                var DetalleP = DetalleP1[0][0];
                //
                var NombreP = document.getElementById("NombreProfesor");
                var PosgradoP = document.getElementById("PosgradoProfesor");
                // var imagenP = document.getElementById("FotoProfesor");

                NombreP.value = DetalleP.NombreProfesor;
                PosgradoP.value = DetalleP.PosgradoProfesor;
                //imagenP.setAttribute("src", value = DetalleP.FotoProfesor);


                //Establecer parametros para Momento de Guardar

                var idProfesorPrincipal = document.getElementById("IdProfesorPrincipal");
                idProfesorPrincipal.setAttribute("value", datos.IdProfesorTm);
                console.log(document.getElementById("IdProfesorPrincipal"));



            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalP.appendChild(divRow);

        }

        document.getElementById("CrearGrupo").addEventListener("click", function () {
            document.getElementById("IdTemaPrincipal").setAttribute("value", $rootScope.Id_Tema);

            document.getElementById("Operation").setAttribute("value", "28");
            ajax("form#Principal");
            window.location.href = "#!VerTema";


        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("VerGrupoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/Grupo') {
            setListeners();
        }
    });

    setListeners = function () {


        //Form Oculto
        document.getElementById("IdAdminO").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdTemaImpartidoO").setAttribute("value", $rootScope.Id_Tema_Impartido);

        document.getElementById("IdTemaImpartidoO1").setAttribute("value", $rootScope.Id_Tema_Impartido);


        document.getElementById("Operation").setAttribute("value", "29");

        var datos1 = JSON.parse(ajax("form#Oculto"));

        var datos = datos1[0][0];
        //LLenar Campos
        console.log(datos);
        document.getElementById("Grupo").setAttribute("value", datos.Grupo);
        document.getElementById("Cupo").setAttribute("value", datos.Cupo);
        document.getElementById("FechaInicio").setAttribute("value", datos.FechaInicio);
        document.getElementById("FechaFin").setAttribute("value", datos.FechaFin);
        if(datos.Estado == 'A'){
            document.getElementById("Estado").setAttribute("value", "Activo");
        }else{
            document.getElementById("Estado").setAttribute("value", "Inactivo");
        }
        
        document.getElementById("NumeroAlumnosInscritos").setAttribute("value", datos.NumeroAlumnosInscritos);
        document.getElementById("NombreProfesor").setAttribute("value", datos.NombreProfesor);


        document.getElementById("btnHabilitarDes").addEventListener("click", function () {
            document.getElementById("Operation1").setAttribute("value", "30");

            var datos = ajax("form#Oculto1");
        });

        ObjectString = JSON.stringify(datos);
        document.getElementById("BtnEditarGrupo").setAttribute("value", ObjectString);
        document.getElementById("BtnEditarGrupo").addEventListener("click", function (ev) {
            var datos = JSON.parse(ev.target.value);
            $rootScope.Id_Tema_Impartido = datos.IdTemaImpartido;
            window.location.href = "#!EditarGrupo"; //completar

        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("EditarGrupoC", function ($rootScope, $location, $scope) {

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/EditarGrupo') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        var IdTemaImpartido = document.getElementById("IdTemaOculto");
        var Operation = document.getElementById("OperationO");



        IdTemaImpartido.setAttribute("value", $rootScope.Id_Tema_Impartido);

        Operation.setAttribute("value", "31");
        var datos = JSON.parse(ajax("form#Oculto"));


        document.getElementById("IdTemaPrincipal").setAttribute("value", $rootScope.Id_Tema_Impartido);
        document.getElementById("NombreP").setAttribute("value", datos[0][0].NombrePosgradoTema);
        //document.getElementById("IdPosgradoT").setAttribute("value", datos[0][0].IdPosgradoTema);
        document.getElementById("NombreTema").setAttribute("value", datos[0][0].NombreTema);
        //document.getElementById("IdTema").setAttribute("value", datos[0][0].IdTema);
        document.getElementById("NombreLineaInvestigacion").setAttribute("value", datos[0][0].NombreLineaInvestigacionTema);

        //document.getElementById("FechaInicio").setAttribute("value",d);

        var divPrincipalP = document.getElementById("DivProfesores");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        console.log(datos[0][0]);
        for (r = 0; r < datos.length; r++) {
            for (c = 0; c < datos[r].length; c++) {
                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-9"; //completar

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r][c].NombreProfesorTm);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-3"; //completar

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block" //Cambiar

                txtBtn = document.createTextNode("Seleccionar");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(datos[r][c]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);
                    var idProfesor = document.getElementById("IdProfesorOculto");
                    var Operation = document.getElementById("Operation");

                    idProfesor.setAttribute("value", datos.IdProfesorTm);




                    Operation.setAttribute("value", "27");

                    var DetalleP = JSON.parse(ajax("form#Oculto1"));

                    //


                    document.getElementById("NombreProfesor").value = DetalleP[0][0].NombreProfesor;
                    document.getElementById("PosgradoProfesor").value = DetalleP[0][0].PosgradoProfesor;
                    //document.getElementById("FotoProfesor").setAttribute("src", DetalleP.FotoProfesor);


                    //Establecer parametros para Momento de Guardar

                    var idProfesorPrincipal = document.getElementById("IdProfesorPrincipal");
                    idProfesorPrincipal.setAttribute("value", DetalleP[0][0].IdProfesor);
                    /*
                    var IndentificadorSitioPrincipal = document.getElementById("IdSitioPrincipañ");
                    var IdUniverisdadSitioPrincipal = document.getElementById("UniversidadSitioPrincipal");

                    IndentificadorSitioPrincipal.setAttribute("value", datos[r][c].IdentificadorSitio);
                    IdUniverisdadSitioPrincipal.setAttribute("value", datos[r][c].IdUniverisdadSitio);

*/

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divPrincipalP.appendChild(divRow);
            }
        }

        document.getElementById("Guardar").addEventListener("click", function () {
            console.clear();
            console.log("Iniciando Guardado");
            //document.getElementById("IdTemaPrincipal").setAttribute("value", $rootScope.Id_Tema);
            document.getElementById("Estado").setAttribute("value", "A");
            document.getElementById("OperationPrincipal").setAttribute("value", "32");
            ajax("form#Principal");
            // window.location.href = "#!VerTema";


        });
    }



    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                console.log(respuesta);
                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("RegistradorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/index_Registrador') {
            setListeners();
        }
    });

    setListeners = function () {
        /* document.getElementById("Nuevo").addEventListener("click", function () {
             window.location.href = "#!NuevoRegistrador";
         });
         document.getElementById("Listado").addEventListener("click", function () {
             window.location.href = "#!ListadoRegistradores";
         });
         */

    }


});

app.controller("NuevoRegistradorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/NuevoRegistrador') {
            setListeners();
        }
    });
    setListeners = function () {
        document.getElementById("Estado").setAttribute("value", "A");
        document.getElementById("IdAdmin").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "33");
        document.getElementById("BtnRegistrar").addEventListener("click", function () {

            if (ajax("form#Principal") != "Error") {
                window.location.href = "#!index_registrador";
            }
        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                respuesta1 = Errores(respuesta);


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                return "Error";
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                return "Error";
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                return "Error";
                break;
            case "4":
                alert("Error en la BD");
                return "Error";
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                return "Error";
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                return "Error";
                break;
            case "7":
                alert("Sesión Expiro");
                return "Error";
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                return "Error";
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                return "Error";
                break;
            case "10":
                alert("Operación denegada");
                return "Error";
                break;
            case "11":
                alert("Formulario Invalido");
                return "Error";
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                return "Error";
                break;
            case "255":
                alert("¡Error!");
                return "Error";
                break;

            default:
                return error;
                break;
        }




    }
});

app.controller("ListadoRegistradoresC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/ListadoRegistradores') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto

        document.getElementById("IdAdmin").setAttribute("value", localStorage.getItem("IdUsuario"));

        document.getElementById("Operation").setAttribute("value", "34");

        //Ajax

        var datos = JSON.parse(ajax("form#Oculto"));
        console.log(datos);

        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datos.length; r++) {
            for (c = 0; datos[r].length; c++) {
                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-10"; //completar

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r][c].NombreRegistrador);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block" //Cambiar

                txtBtn = document.createTextNode("Ver Detalles");
                BtnVerD.appendChild(txtBtn);
                var ObjectString = JSON.stringify(datos[r][c]);
                BtnVerD.setAttribute("value", ObjectString);

                BtnVerD.addEventListener("click", function (ev) {

                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Registrador = datos.IdRegistrador;
                    window.location.href = "#!VerRegistrador"; //completar

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divPrincipalR.appendChild(divRow);
            }
        }








    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("VerRegistradorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerRegistrador') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto
        document.getElementById("IdAmin").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdRegistrador").setAttribute("value", $rootScope.Id_Registrador);




        document.getElementById("Operation").setAttribute("value", "35");


        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        console.log(datos1[0][0]);
        var datos = datos1[0][0];

        // var IdRegistrador = document.getElementById("IdRegistradorPrincipal");
        var Nombre = document.getElementById("NombreRegistrador");
        var Apellidos = document.getElementById("ApellidosRegistrador");
        var Telefono = document.getElementById("TelefonoRegistrador");
        var Correo = document.getElementById("Correo");
        var Contraseña = document.getElementById("Contraseña");

        // IdRegistrador.setAttribute("value", datos.IdRegistrador);
        Nombre.setAttribute("value", datos.NombresRegistrador);
        Apellidos.setAttribute("value", datos.ApellidosRegistrador);
        Telefono.setAttribute("value", datos.TelefonoRegistrador);
        Correo.setAttribute("value", datos.CorreoRegistrador);
        Contraseña.setAttribute("value", datos.ContrasenaRegistrador);


        var Nombre1 = document.getElementById("NombreRegistrador1");
        var Apellidos1 = document.getElementById("ApellidosRegistrador1");
        var Telefono1 = document.getElementById("TelefonoRegistrador1");
        var Contraseña1 = document.getElementById("Contraseña1");

        // IdRegistrador.setAttribute("value", datos.IdRegistrador);
        Nombre1.setAttribute("value", datos.NombresRegistrador);
        Apellidos1.setAttribute("value", datos.ApellidosRegistrador);
        Telefono1.setAttribute("value", datos.TelefonoRegistrador);
        Contraseña1.setAttribute("value", datos.ContrasenaRegistrador);




        document.getElementById("btn_edit").addEventListener("click", function () {
            document.getElementById("admin_registrador_profile").classList.add("d-none");
            document.getElementById("admin_registrador_edit").classList.remove("d-none");


        });



        document.getElementById("BtnCancelar").addEventListener("click", function () {
            document.getElementById("admin_registrador_edit").classList.add("d-none");
            document.getElementById("admin_registrador_profile").classList.remove("d-none");
        });


        document.getElementById("BtnGuardar").addEventListener("click", function (e) {

            document.getElementById("IdRegistradorPrincipal").setAttribute("value", $rootScope.Id_Registrador);

            document.getElementById("OperationP").setAttribute("value", "36");
            ajax("form#Principal");

            window.location.href = "#!ListadoRegistradores";





            //Cambio de pantallas
            document.getElementById("admin_registrador_edit").classList.add("d-none");
            document.getElementById("admin_registrador_profile").classList.remove("d-none");




        });

        document.getElementById("BtnDarBaja").addEventListener("click", function () {

            document.getElementById("IdRegistrador1").setAttribute("value", $rootScope.Id_Registrador);







            document.getElementById("Operation1").setAttribute("value", "37");


            //Ajax

            var datos = ajax("form#Oculto1");
            window.location.href = "#!ListadoRegistradores";
        });
    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        console.log(JSON.parse(respuesta1));
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("AreaC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/index_Area') {
            setListeners();
        }
    });

    setListeners = function () {
        /*  document.getElementById("NuevoA").addEventListener("click", function () {
              window.location.href = "#!NuevaArea";
          });

          document.getElementById("Listado").addEventListener("click", function () {
              window.location.href("#!ListadoAreas");
          });*/

    }

});

app.controller("NuevaAreaC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/NuevaArea') {
            setListeners();
        }
    });

    setListeners = function () {
        //document.getElementById("IdAmin").setAttribute("value", localStorage.getItem("IdUsuario"));





        document.getElementById("Operation").setAttribute("value", "38");
        //Ajax




        //console.log(document.getElementById("BtnRegistrar"));
        document.getElementById("BtnRegistrar").addEventListener("click", function () {
            //alert("Hola");
            console.log("iniciando Transacciòn");
            var datos = ajax("form#Principal");
            window.location.href = "#!index_Area";
        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("ListadoAreasC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/ListadoAreas') {
            setListeners();
        }
    });

    setListeners = function () {
        document.getElementById("IdAmin").setAttribute("value", localStorage.getItem("IdUsuario"));




        document.getElementById("Operation").setAttribute("value", "39");

        //Ajax

        var datos1 = ajax("form#Oculto");
        // console.log(datos1);
        datos = JSON.parse(datos1);


        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datos.length; r++) {
            for (c = 0; datos[r].length; c++) {
                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-10"; //completar

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r][c].NombreAreaConomiento);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block" //Cambiar

                txtBtn = document.createTextNode("Editar");
                BtnVerD.appendChild(txtBtn);

                var ObjectString = JSON.stringify(datos[r][c]);
                BtnVerD.setAttribute("value", ObjectString);

                BtnVerD.addEventListener("click", function (ev) {

                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Area_Conocimiento = datos.IdAreaConocimiento;
                    window.location.href = "#!EditarArea"; //completar

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divPrincipalR.appendChild(divRow);
            }
        }


    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("EditarAreaC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/EditarArea') {
            setListeners();
        }
    });




    setListeners = function () {
        console.clear();
        document.getElementById("IdAdmin").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdArea").setAttribute("value", $rootScope.Id_Area_Conocimiento);



        document.getElementById("Operation").setAttribute("value", "40");

        //Ajax
        document.getElementById("BtnGuardar").addEventListener("click", function () {
            ajax("form#Principal");
            window.location.href = "#!ListadoAreas";
        });

    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'admin',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});
//End Admin Controllers



//Alumno controllers
app.controller("IndexAlumnoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/index_Alumno') {
            setListeners();
        }
    });

    setListeners = function () {
        //document.getElementById("BtnVerPerfil").classList.remove("d-none");

        //Form Oculto = Oculto
        //Input 1 = IdAlumnoO
        document.getElementById("IdAlumnoO").setAttribute("value", localStorage.getItem("IdUsuario"));

        //input 2 = Operation
        document.getElementById("Operacion").setAttribute("value", "1_1");

        //console.log(document.getElementById("Operacion"));
        //Ajax
        var datosP = JSON.parse(ajax("form#Oculto"));
        console.log(localStorage.getItem("NombreUsuario"));
        document.getElementById("NombreU").setAttribute("value", localStorage.getItem("NombreUsuario"));
        //Respuesta


        console.log(datosP);
        if (datosP != 5) {
            posgrado(datosP[0][0]);
            // posgrado();
            if (localStorage.getItem("IdCurso") === null) {
                localStorage.setItem("IdCurso", datosP[0][0].IdCurso);
            }




        } else {
            document.getElementById("page_buttons").classList.add("d-none");
        }





        document.getElementById("BtnVerPerfil").addEventListener("click", function () {
            window.location.href = "#!VerPerfilAlumno";
        });

        //eliminar listeners y cargar todo al entrar

        ObjectString = JSON.stringify(datosP[0]);
        document.getElementById("PosgradoTab").setAttribute("value", ObjectString);
        document.getElementById("PosgradoTab").addEventListener("click", function (ev) {
            var datosP = JSON.parse(ev.target.value);
            posgrado(datosP);
        });

        document.getElementById("BusquedaTab").addEventListener("click", function () {
            Busqueda();
        });
        document.getElementById("SolicitudesTab").addEventListener("click", function () {
            solicitudes();
        });
        /*document.getElementById("TutoriaTab").addEventListener("click", function () {
            tutoria();
        });*/
    }

    posgrado = function (datos) {
        //console.log(datos);
        console.clear();


        document.getElementById("PosgradoNombre").setAttribute("value", datos.NombrePosgrado);
        document.getElementById("NombreLinea").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("NombreTema").setAttribute("value", datos.Tema);
        document.getElementById("Grupo").setAttribute("value", datos.Grupo);
        document.getElementById("NombreProfesor").setAttribute("value", datos.NombreProfesor);
        // document.getElementById("FotoProfesor").setAttribute("src",datos[0][0].Foto);
        /*if (datos.Online) {
            document.getElementById("onlineView").classList.add("online");
        }*/

        document.getElementById("Operacion").setAttribute("value", "1_2");
        var ListaRecursos = JSON.parse(ajax("form#Oculto"));

        document.getElementById("Operacion").setAttribute("value", "1_3");
        var ListaActividades = JSON.parse(ajax("form#Oculto"));

        document.getElementById("Operacion").setAttribute("value", "1_4");
        var ListaAlumnos = JSON.parse(ajax("form#Oculto"));


        //Preparar Lista de Recursos y  Actividades
        var ListadoResultados = new Array();
        var obj;
        var bandera;

        //console.log(ListaActividades[0]);
        if (ListaActividades != 5) {
            for (i = 0; i < ListaActividades[0].length; i++) {
                obj = {
                    Datos: ListaActividades[0][i],
                    Fecha: ListaActividades[0][i].FechaAsignacion,
                    Tipo: "Actividad"
                };
                bandera = false;

                if (ListadoResultados.length != 0) {

                    // console.log(ListadoResultados.length);
                    for (c = 0; c < ListadoResultados.length; c++) {
                        if (ListadoResultados[c].Fecha < obj.Fecha && bandera == false) {

                            ListadoResultados.splice(c, 0, obj);

                            bandera = true;
                        }


                    }
                    if (!bandera) {
                        ListadoResultados.push(obj);
                    }
                } else {
                    ListadoResultados.push(obj);
                }
            }
        }


        if (ListaRecursos != 5) {
            for (i = 0; i < ListaRecursos[0].length; i++) {
                obj = {
                    Datos: ListaRecursos[0][i],
                    Fecha: ListaRecursos[0][i].Fecha,
                    Tipo: "Recurso"
                };
                bandera = false;
                if (ListadoResultados.length != 0) {


                    for (c = 0; c < ListadoResultados.length; c++) {
                        if (ListadoResultados[c].Fecha < obj.Fecha && !bandera) {
                            ListadoResultados.splice(c, 0, obj);
                            bandera = true;
                        }


                    }
                    if (!bandera) {
                        ListadoResultados.push(obj);
                    }
                } else {
                    ListadoResultados.push(obj);
                }
            }
        }


        //Colocar Resultados

        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < ListadoResultados.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(ListadoResultados[r].Datos.Nombre);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Vizualizar");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(ListadoResultados[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var ListadoResultados = JSON.parse(ev.target.value);

                console.log(ListadoResultados.Tipo);

                if (ListadoResultados.Tipo == "Recurso") {

                    $rootScope.Id_Curso = datos.IdCurso;
                    $rootScope.Nombre_Curso = datos.NombrePosgrado;
                    $rootScope.Id_Recurso = ListadoResultados.Datos.IdRecurso;
                    window.location.href = "#!VerRecursoA";
                } else {
                    $rootScope.Id_Curso = datos.IdCurso;
                    $rootScope.Id_Actividad = ListadoResultados.Datos.IdActividad;
                    window.location.href = "#!VerActividadA";
                }

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }
        //colocar Alumnos

        var divPrincipalR = document.getElementById("resultados3");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var spanOnline;
        var txtSpanOnline;

        if (ListaAlumnos != 5) {
            for (r = 0; r < ListaAlumnos.length; r++) {
                for (c = 0; c < ListaAlumnos[r].length; c++) {
                    divRow = document.createElement("div");
                    divRow.className = "row form-group";

                    //Span Online
                    divCol = document.createElement("div");
                    divCol.className = "col-md-2"; //completar

                    spanOnline = document.createElement("span");
                    if (ListaAlumnos[r][c].Online) {
                        spanOnline.className = "badge-pill badge-success";
                        txtSpanOnline = document.createTextNode("Online");
                    } else {
                        spanOnline.className = "badge-pill badge-danger";
                        txtSpanOnline = document.createTextNode("Offline");
                    }
                    spanOnline.appendChild(txtSpanOnline);
                    divCol.appendChild(spanOnline);


                    divRow.appendChild(divCol);

                    //Texto
                    divCol = document.createElement("div");
                    divCol.className = "col-md-10"; //completar

                    span = document.createElement("span");
                    //span.className="form-control";

                    txtSpan = document.createTextNode(ListaAlumnos[r][c].Nombre);
                    span.appendChild(txtSpan);
                    divCol.appendChild(span);
                    divRow.appendChild(divCol);

                    //boton

                    divPrincipalR.appendChild(divRow);
                }
            }
        }


    }

    /*tutoria = function () {


        document.getElementById("Operation").setAttribute("value", "13");

        //Ajax

        var datos = JSON.parse(ajax("form#Oculto"));

        document.getElementById("AreaConocimiento").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("Nombre").setAttribute("value", datos.Nombre);
        document.getElementById("Telefono").setAttribute("value", datos.Telefono);
        document.getElementById("Cedula").setAttribute("value", datos.Cedula);
        document.getElementById("Correo").setAttribute("value", datos.Correo);
        document.getElementById("Foto").setAttribute("src", datos.Foto);


    }*/

    //Inicia tab de busqueda
    Busqueda = function () {
        console.clear();
        //Form Oculto2
        document.getElementById("Operation1").setAttribute("value", "14");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto1"));
        var datos = datos1[0];
        console.log(datos);
        var Select = document.getElementById("SelectUniversidad");

        var Option;
        var optionTxt;

        if (Select.hasChildNodes()) {
            for (i = 0; i < Select.childNodes.length; i++) {
                Select.childNodes[i].remove();
            }


        }









        for (i = 0; i < datos.length; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[i].IdUniversidad);
            optionTxt = document.createTextNode(datos[i].Universidad);
            Option.appendChild(optionTxt);
            Select.appendChild(Option);
        }

        document.getElementById("BtnBuscar").addEventListener("click", function () {
            document.getElementById("IdAlumnoP").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("OperationP").setAttribute("value", "15");
            var datos5 = JSON.parse(ajax("form#Principal"));
            console.log(datos5[0]);
            actualizarPosgrados(datos5[0], Select.value);


        })



    }
    actualizarPosgrados = function (datos, IdUniversidad) {
        var divPrincipalR = document.getElementById("DivResultados1");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        //console.log(datos);
        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10";

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos[r].Posgrado);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2";

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block"

            txtBtn = document.createTextNode("Consultar");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);

                $rootScope.Id_Posgrado = datos.IdPosgrado;
                $rootScope.Nombre_Posgrado = datos.Posgrado;
                $rootScope.Id_Universidad = IdUniversidad;
                window.location.href = "#!VerConvocatoriaAlumno";

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }
    }
    //Finaliza Tab busquedad

    solicitudes = function () {
        document.getElementById("Operacion").setAttribute("value", "21");
        //Ajax
        var datosP = JSON.parse(ajax("form#Oculto"));

        var divPrincipalR1 = document.getElementById("DivResultadosS1"); //Pendientes
        var divPrincipalR2 = document.getElementById("DivResultadosS2"); //new Respondidas
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        var divPendientes = document.createElement("div");
        divPendientes.setAttribute("id", "SolicitudesP");

        var divRespondidas = document.createElement("div");
        divRespondidas.setAttribute("id", "SolicitudesR");



        console.log(datosP);
        for (r = 0; r < datosP.length; r++) {
            for (c = 0; c < datosP[r].length; c++) {
                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-10"; //completar

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datosP[r][c].Posgrado);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block" //Cambiar

                txtBtn = document.createTextNode("Ver Detalles");
                BtnVerD.appendChild(txtBtn);
                //console.log(datosP[r][c]);
                ObjectString = JSON.stringify(datosP[r][c]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Solicitud = datos.IdSolicitud;
                    window.location.href = "#!VerSolicitudA";

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);

                //divPrincipalR.appendChild(divRow); 
                //console.log(divPrincipalR1);


                if (datosP[r][c].EstadoAlumno == 'P') {
                    divPendientes.appendChild(divRow);
                } else {
                    divRespondidas.appendChild(divRow);
                }
                // console.log(divPrincipalR1);



            }
        }



        if (divPrincipalR1.hasChildNodes()) {
            if (document.body.contains(document.getElementById("SolicitudesP"))) {
                document.getElementById("SolicitudesP").remove();
            }


            divPrincipalR1.appendChild(divPendientes);

        } else {
            divPrincipalR1.appendChild(divPendientes);
        }

        if (divPrincipalR2.hasChildNodes()) {
            if (document.body.contains(document.getElementById("SolicitudesR"))) {
                document.getElementById("SolicitudesR").remove();
            }


            divPrincipalR2.appendChild(divRespondidas);

        } else {
            divPrincipalR2.appendChild(divRespondidas);
        }


    }


    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                ////alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerPerfilAlumnoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerPerfilAlumno') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("IdAlumno").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "2");

        //Ajax

        var datos = JSON.parse(ajax("form#Oculto"));
        var datos = datos[0][0];

        /*  document.getElementById("IdAlumno1").setAttribute("value", localStorage.getItem("IdUsuario"));
         */


        document.getElementById("NombreArea").setAttribute("value", datos.NombreAreaConocimiento);
        document.getElementById("NombreUniversidad").setAttribute("value", datos.NombreUniversidad);
        document.getElementById("NombreAlumno").setAttribute("value", datos.Nombres);
        document.getElementById("ApellidosAlumno").setAttribute("value", datos.Apellidos);
        document.getElementById("FechaNacimiento").setAttribute("value", datos.FechaNacimiento);
        if(datos.Genero == 'H'){
            document.getElementById("Genero").setAttribute("value", "Hombre");
        }else{
            document.getElementById("Genero").setAttribute("value", "Mujer");
        }
        
        document.getElementById("Direccion").setAttribute("value", datos.Direccion);



        var Entidad;
        switch (datos.EntidadFederativa) {

            case "AS":
                Entidad = "Aguascalientes";
                break;
            case "BC":
                Entidad: "Baja California";
                break;
            case "BS":
                Entidad = "BAJA CALIFORNIA SUR";
                break;

            case "CC":
                Entidad = "CAMPECHE";
                break;
            case "CL":
                Entidad = "COAHUILA";
                break;

            case "CM":
                Entidad = "COLIMA";
                break;

            case "CS":
                Entidad = "CHIAPAS";
                break;

            case "CH":
                Entidad = "CHIHUAHUA";
                break;
            case "DF":
                Entidad = "DISTRITO FEDERAL";
                break;
            case "DG":
                Entidad = "DURANGO";
                break;
            case "GT":
                Entidad = "GUANAJUATO";
                break;
            case "GR":
                Entidad = "GUERRERO";
                break;
            case "HG":
                Entidad = "HIDALGO";
                break;

            case "JC":
                Entidad = "JALISCO";
                break;
            case "MC":
                Entidad = "MEXICO";
                break;
            case "MN":
                Entidad = "MICHOACAN";
                break;
            case "MS":
                Entidad = "MORELOS";
                break;
            case "NT":
                Entidad = "NAYARIT";
                break;
            case "NL":
                Entidad = "NUEVO LEON";
                break;
            case "OC":
                Entidad = "OAXACA";
                break;
            case "PL":
                Entidad = "PUEBLA";
                break;
            case "QT":
                Entidad = "QUERETARO";
                break;
            case "QR":
                Entidad = "QUINTANA ROO";
                break;
            case "SP":
                Entidad = "SAN LUIS POTOSI";
                break;
            case "SL":
                Entidad = "SINALOA";
                break;
            case "SR":
                Entidad = "SONORA";
                break;
            case "TC":
                Entidad = "TABASCO";
                break;
            case "TS":
                Entidad = "TAMAULIPAS";
                break;
            case "TL":
                Entidad = "TLAXCALA";
                break;
            case "VZ":
                Entidad = "VERACRUZ";
                break;
            case "YN":
                Entidad = "YUCATAN";
                break;
            case "ZS":
                Entidad = "ZACATECAS";
                break;




        }

        document.getElementById("EntidadFederativa").setAttribute("value", Entidad);
        document.getElementById("Ciudad").setAttribute("value", datos.Ciudad);
        var Telefono = document.getElementById("Telefono")
        Telefono.setAttribute("value", datos.Telefono);
        document.getElementById("Correo").setAttribute("value", datos.Correo);
        document.getElementById("FechaRegistro").setAttribute("value", datos.FechaRegistro);
        //document.getElementById("Foto").setAttribute("src", datos.Foto);


        document.getElementById("NombreArea").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("NombreUniversidad").setAttribute("value", datos.Universidad);



        document.getElementById("BtnEditar").addEventListener("click", function (e) {
            var caller = e.target || e.srcElement;
            if (caller.childNodes[0].nodeValue == "Guardar") {
                document.getElementById("IdAlumno1").setAttribute("value", localStorage.getItem("IdUsuario"));
                document.getElementById("OperationP").setAttribute("value", "4");
                ajax("form#Principal");

                caller.childNodes[0].nodeValue = "Editar Tema";

                Telefono.readOnly = true;
                document.getElementById("DivPassword").classList.add("d-none");
                setListeners();
                window.localtion.href = "#!VerPerfilAlumno";
                //document.getElementById("FotoFile").classList.add("Oculto");
            } else {
                //Telefono.readOnly = false;
                document.getElementById("DivPassword").classList.remove("d-none");
                // document.getElementById("FotoFile").classList.remove("Oculto");
                console.log(caller.childNodes[0].nodeValue);
                caller.childNodes[0].nodeValue = "Guardar";
            }
        });




    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerRecursoAC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerRecursoA') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        //Form Oculto
        // document.getElementById("IdCurso").setAttribute("value", $rootScope.Id_Curso);
        document.getElementById("IRecurso").setAttribute("value", $rootScope.Id_Recurso);




        document.getElementById("Operation").setAttribute("value", "5");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];

        console.log(datos);
        //document.getElementById("NombreCurso").setAttribute("value", $rootScope.Nombre_Curso);
        document.getElementById("Descripcion").setAttribute("value", datos.Descripcion);
        // document.getElementById("NombreRecurso").setAttribute("value", datos.NombreArchivo);


        if (datos.TipoArchivo == "pdf") {
            document.getElementById("IframeRecurso").setAttribute("data", datos.Contenido);
        } else {
            document.getElementById("doc_link").setAttribute("download", datos.NombreArchivo);
            document.getElementById("doc_link").setAttribute("href", datos.Contenido);
        }

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerActividadAC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerActividadA') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("IdCursoO").setAttribute("value", $rootScope.Id_Curso);
        document.getElementById("IdActividadO").setAttribute("value", $rootScope.Id_Actividad);


        document.getElementById("IdAlumnoO").setAttribute("value", localStorage.getItem("IdUsuario"));

        document.getElementById("Operation").setAttribute("value", "6");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        console.log(datos);

        document.getElementById("NombreActividad").setAttribute("value", datos.NombreActividad);
        document.getElementById("DescripcionActividad").setAttribute("value", datos.DescripcionActividad);

        if (datos.TipoActividad == 'E') {
            document.getElementById("TipoActividad").setAttribute("value", "Examen");
        } else {
            document.getElementById("TipoActividad").setAttribute("value", "Tarea");
        }

        //document.getElementById("FehcaAsignacionActividad").setAttribute("value", datos.FechaAsignacion);
        document.getElementById("FechaInicio").setAttribute("value", datos.FechaInicio);
        document.getElementById("FechaFinActividad").setAttribute("value", datos.FechaFin);

        if (datos.FechaSubida != null) {
            document.getElementById("FechaSubidaActividad").setAttribute("value", datos.FechaSubida);
            if (datos.Calificacion != null) {
                document.getElementById("CalificacionActividad").setAttribute("value", datos.Calificacion);
            }
            //document.getElementById("FechaCalificadaActividad").setAttribute("value", datos.FechaCalificada);
            if (datos.Comentarios != null) {
                document.getElementById("ComentariosActividad").setAttribute("value", datos.Comentarios);
            }
            document.getElementById("BtnSubir").setAttribute("disabled", true);
            document.getElementById("File").classList.add("d-none");
        } else {
            document.getElementById("BtnSubir").addEventListener("click", function () {
                document.getElementById("IdCurso").setAttribute("value", $rootScope.Id_Curso);
                document.getElementById("IdActividad").setAttribute("value", $rootScope.Id_Actividad);
                document.getElementById("IdAlumno").setAttribute("value", localStorage.getItem("IdUsuario"));

                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
                document.getElementById("FechaSubida").setAttribute("value", date);
                document.getElementById("Operation1").setAttribute("value", "7");

                //Ajax

                ajax("form#Principal");
                window.location.href="#!index_Alumno";
            });
        }






    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("ForoAC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/ForoA') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto
        document.getElementById("IdCursoO").setAttribute("value", localStorage.getItem("IdCurso"));
        /* document.getElementById("IdSitioO").setAttribute("value", $rootScope.Identificador_Sitio);
         document.getElementById("IdUniversidadO").setAttribute("value", $rootScope.Id_Universidad);*/
        Inicio();
        document.getElementById("InicioTab").addEventListener("click", function () {
            Inicio();
        });
        document.getElementById("MisPublicacionesTab").addEventListener("click", function () {
            MisPublicaciones();
        });




        //Form Oculto1
        document.getElementById("IdAlumnoO1").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdCursoO1").setAttribute("value", localStorage.getItem("IdCurso"));
        document.getElementById("IdSitioO1").setAttribute("value", $rootScope.Identificador_Sitio);
        document.getElementById("IdUniversidadO1").setAttribute("value", $rootScope.Id_Universidad);

        //Form Principal
        document.getElementById("IdAlumnoP").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdCursoP").setAttribute("value", localStorage.getItem("IdCurso"));
        document.getElementById("IdSitioP").setAttribute("value", $rootScope.Identificador_Sitio);
        document.getElementById("IdUniversidadP").setAttribute("value", $rootScope.Id_Universidad);

        document.getElementById("PublicarBtn").addEventListener("click", function () {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("FechaPubli").setAttribute("value", date);
            document.getElementById("Operation").setAttribute("value", "10");

            //Ajax

            ajax("form#Principal");
            MisPublicaciones();
        })
    }

    Inicio = function () {

        document.getElementById("OperationO").setAttribute("value", "8");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));

        var datos = datos1[0];


        if (datos != 5 && datos1 != 5) {
            var divPrincipalR = document.getElementById("resultados1");
            var divRow;
            var divCol;
            var span;
            var txtSpan;
            var BtnVerD;
            var txtBtn;
            var smallAutor;
            var txtSmallAutor;
            var divTemporal = document.createElement("div");
            divTemporal.setAttribute("id", "Temp1");

            for (r = 0; r < datos.length; r++) {

                divRow = document.createElement("div");
                divRow.className = "row";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-9";

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r].Publicacion);
                span.appendChild(txtSpan);
                divCol.appendChild(span);

                smallAutor = document.createElement("small");
                smallAutor.className = "form-text text-muted";
                txtSmallAutor = document.createTextNode("Autor: " + datos[r].Autor + "\t\tFecha: " + datos[r].Fecha);
                smallAutor.appendChild(txtSmallAutor);
                divCol.appendChild(smallAutor);

                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-3";

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block"

                txtBtn = document.createTextNode("Ver Detalles");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(datos[r]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Publicacion = datos.IdPublicacionForo;
                    window.location.href = "#!VerPublicacionA";

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divTemporal.appendChild(divRow);

            }

            if (divPrincipalR.hasChildNodes()) {
                if (document.body.contains(document.getElementById("Temp1"))) {
                    document.getElementById("Temp1").remove();
                }


                divPrincipalR.appendChild(divTemporal);

            } else {
                divPrincipalR.appendChild(divTemporal);
            }
        }













    }

    MisPublicaciones = function () {
        document.getElementById("OperationO1").setAttribute("value", "9");
        console.clear();
        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto1"));
        var datos = datos1[0];
        console.log(datos);

        var divPrincipalR = document.getElementById("resultados2");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var smallAutor;
        var txtSmallAutor;
        var divTemporal = document.createElement("div");
        divTemporal.setAttribute("id", "Temp");

        if(datos1!=5){
            for (r = 0; r < datos.length; r++) {

                divRow = document.createElement("div");
                divRow.className = "row";
    
                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-9";
    
                span = document.createElement("span");
                span.className = "form-control";
    
                txtSpan = document.createTextNode(datos[r].Publicacion);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
    
                smallAutor = document.createElement("small");
                smallAutor.className = "form-text text-muted";
                txtSmallAutor = document.createTextNode("Fecha: " + datos[r].Fecha);
                smallAutor.appendChild(txtSmallAutor);
                divCol.appendChild(smallAutor);
    
                divRow.appendChild(divCol);
    
                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-3";
    
                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block"
    
                txtBtn = document.createTextNode("Ver Detalles");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(datos[r]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);
    
                    $rootScope.Id_Publicacion = datos.IdPublicacionForo;
                    window.location.href = "#!VerPublicacionA";
    
                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divTemporal.appendChild(divRow);
    
            }
    
    
            if (divPrincipalR.hasChildNodes()) {
                if (document.body.contains(document.getElementById("Temp"))) {
                    document.getElementById("Temp").remove();
                }
    
    
                divPrincipalR.appendChild(divTemporal);
    
            } else {
                divPrincipalR.appendChild(divTemporal);
            }
        }

      









    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerPublicacionAC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerPublicacionA') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        actualizar();

        document.getElementById("btnPublicar").addEventListener("click", function () {
            document.getElementById("IdAlumno").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("IdPublicacion").setAttribute("value", $rootScope.Id_Publicacion);







            // });



            /* var fecha=new Date();
             document.getElementById("Fecha",fecha);*/

            document.getElementById("Operation").setAttribute("value", "12");

            //Ajax

            ajax("form#Principal");
            document.getElementById("Respuesta").setAttribute("value", "");

            window.location.href = "#!VerPublicacionA";

        });






    }

    actualizar = function () {

        document.getElementById("IdAlumnoO").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdPublicacionO").setAttribute("value", $rootScope.Id_Publicacion);




        document.getElementById("OperationO").setAttribute("value", "11");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];
        console.log(datos);
        console.log(datos[0]);
        document.getElementById("Publicacion").setAttribute("value", datos[0].Publicacion);
        document.getElementById("AutorFecha").childNodes[0].nodeValue = "Autor: " + datos[0].AutorPublicacion + "\t\tFecha: " + datos[0].FechaPublicacion;
        console.log(datos[0]);


        if(datos[0].Respuesta!=null){
            var divPrincipalR = document.getElementById("resultados");
            var divTemporal
            var divRow;
            var divCol;
            var span;
            var txtSpan;
            var smallAutor;
            var txtSmallAutor;
            var divTemporal = document.createElement("div");
            divTemporal.setAttribute("id", "Temp");
    
            divTemporal = document.createElement("div");
            divTemporal.setAttribute("id", "DivTemporal");
            for (r = 0; r < datos.length; r++) {
    
                divRow = document.createElement("div");
                divRow.className = "row";
    
                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-1 d-flex justify-content-end"; //completar
    
                span = document.createElement("span");
                span.className = "text-success";
    
                // txtSpan=document.createTextNode(datos[r][c].Grupo);
                //span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);
    
    
                divCol = document.createElement("div");
                divCol.className = "col-md-8"; //completar
    
                span = document.createElement("span");
                span.className = "form-control";
    
                txtSpan = document.createTextNode(datos[r].Respuesta);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
    
                smallAutor = document.createElement("small");
                smallAutor.className = "form-text text-muted";
                txtSmallAutor = document.createTextNode("Autor: " + datos[r].AutorRespuesta + "\t\tFecha: " + datos[r].FechaRespuesta);
                smallAutor.appendChild(txtSmallAutor);
                divCol.appendChild(smallAutor);
    
                divRow.appendChild(divCol);
    
    
                divTemporal.appendChild(divRow);
    
    
            }
    
    
            if (document.body.contains(document.getElementById("Temp"))) {
                document.getElementById("Temp").remove();
    
            }
            divPrincipalR.appendChild(divTemporal);
    
    
    
    
        }


       





    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerConvocatoriaAlumnoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerConvocatoriaAlumno') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto
        document.getElementById("IdPosgrado").setAttribute("value", $rootScope.Id_Posgrado);

        document.getElementById("Operation").setAttribute("value", "16");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];

        //document.getElementById("NombrePosgrado").setAttribute("value", $rootScope.Nombre_Posgrado);
        //document.getElementById("NombreRecurso").setAttribute("value", datos.NombreArchivo);


        if (datos.TipoArchivo == "pdf") {
            document.getElementById("IframeRecurso").setAttribute("data", datos.Convocatoria);
        }

        document.getElementById("LinkDescarga").setAttribute("download", datos.NombreArchivo);
        document.getElementById("LinkDescarga").setAttribute("href", datos.Convocatoria);

        sessionStorage.setItem("IdPosgrado", $rootScope.Id_Posgrado);

        document.getElementById("btn_solicitar").addEventListener("click", function () {
            window.location.href = "#!SolicitudIngreso1";
        });



    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("SolicitudIngreso1C", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/SolicitudIngreso1') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        document.getElementById("IdPosgradoO").setAttribute("value", $rootScope.Id_Posgrado);


        document.getElementById("IdSitioO").setAttribute("value", $rootScope.Identificador_Sitio);
        document.getElementById("IdUniversidadO").setAttribute("value", $rootScope.Id_UniversidadS);


        document.getElementById("OperationO").setAttribute("value", "17");

        var datos = JSON.parse(ajax("form#Oculto"));


        document.getElementById("Univerdidad").setAttribute("value", datos[0][0].Universidad);
        document.getElementById("Posgrado").setAttribute("value", datos[0][0].Posgrado);


        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datos.length; r++) {
            for (c = 0; c < datos[r].length; c++) {
                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-10"; //completar

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r][c].LineaInvestigacion);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block" //Cambiar

                txtBtn = document.createTextNode("Consultar");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(datos[r][c]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);

                    document.getElementById("IdPosgradoO1").setAttribute("value", $rootScope.Id_Posgrado);
                    document.getElementById("IdLineaInvestogacionO").setAttribute("value", datos.IdLineaInvestigacion);



                    document.getElementById("OperationO1").setAttribute("value", "18");

                    var datos1 = JSON.parse(ajax("form#Oculto1"));

                    actualizarTemas(datos1);


                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divPrincipalR.appendChild(divRow);
            }
        }


    }
    actualizarTemas = function (datos) {
        console.log(datos[0]);
        var divPrincipalR = document.getElementById("DivResultados1");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        var divTemporal=document.createElement("div");
        divTemporal.setAttribute("id","Temporal");

        for (c = 0; c < datos[0].length; c++) {
            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos[0][c].Tema);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Seleccionar");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[0][c]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);
                console.log(datos);
                console.log(localStorage.getItem("IdUsuario"));
                $rootScope.Identificador_Sitio = datos.IdentificadorSitio;
                console.log(datos.IdentificadorSitio);
                $rootScope.Id_Universidad = datos.IdUniversidadSitio;

                $rootScope.Id_LineaInvestigacion = datos.IdLineaInvestigacion;
                $rootScope.Id_Tema = datos.IdTema;
                window.location.href = "#!SolicitudIngreso2"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divTemporal.appendChild(divRow);
        }

        if(divPrincipalR.hasChildNodes()){
            if (document.body.contains(document.getElementById("Temporal"))) {
                document.getElementById("Temporal").remove();
            }
            divPrincipalR.appendChild(divTemporal);
        }else{
            divPrincipalR.appendChild(divTemporal);
        }




        console.log(divPrincipalR);

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("SolicitudIngreso2C", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/SolicitudIngreso2') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto1
        document.getElementById("IdAlumno").setAttribute("value", localStorage.getItem("IdUsuario"));

        document.getElementById("Operation").setAttribute("value", "19_1");
        //Form Oculto2

        document.getElementById("IdLinea").setAttribute("value", $rootScope.Id_LineaInvestigacion);
        document.getElementById("IdTema").setAttribute("value", $rootScope.Id_Tema);
        document.getElementById("IdPosgrado").setAttribute("value", $rootScope.Id_Posgrado);
        document.getElementById("IdUniversidad").setAttribute("value", $rootScope.Id_Universidad);


        document.getElementById("Operation1").setAttribute("value", "19_2");

        //Ajax

        console.log(document.getElementById("IdUniversidad"));

        var datosA1 = JSON.parse(ajax("form#Oculto"));
        var datosA = datosA1[0][0];
        var datosP1 = JSON.parse(ajax("form#Oculto1"));
        var datosP = datosP1[0][0];


        console.log(datosA);

        console.log("DatosP:");
        console.log(datosP1);


        document.getElementById("UnviversidadAlumno").setAttribute("value", datosA.UniversidadAlumno);
        document.getElementById("AreaConocimientoAlumno").setAttribute("value", datosA.AreaConocimientoAlumno);
        //  document.getElementById("UnviversidadAlumno").setAttribute("value",datosA.UniversidadAlumno);
        document.getElementById("NombresAlumno").setAttribute("value", datosA.Nombres);
        document.getElementById("ApellidosAlumno").setAttribute("value", datosA.Apellidos);
        //document.getElementById("FechaNacimientoAlumno").setAttribute("value", datosA.FechaNacimiento);
        //document.getElementById("GeneroAlumno").setAttribute("value", datosA.Genero);
        //document.getElementById("DireccionAlumno").setAttribute("value", datosA.Direccion);
        //document.getElementById("EntidadFederativaAlumno").setAttribute("value", datosA.EntidadFerderativa);
        //document.getElementById("CiudadAlumno").setAttribute("value", datosA.Ciudad);
        //document.getElementById("TelefonoAlumno").setAttribute("value", datosA.Telefono);
        //document.getElementById("CorreoAlumno").setAttribute("value", datosA.Correo);
        //document.getElementById("FechaRegistroAlumno").setAttribute("value", datosA.FechaRegistro);
        //document.getElementById("FotoAlumno").setAttribute("src", datosA.Foto);


        document.getElementById("UnviversidadSeleccionada").setAttribute("value", datosP.UniversidadSeleccionada);
        document.getElementById("PosgradoSeleccionado").setAttribute("value", datosP.PosgradoSeleccionado);
        document.getElementById("LineaInvestigacionSeleccionada").setAttribute("value", datosP.LineaInvestigacionSeleccionada);
        //Este debe tener Name y se enviara lo siguiente
        document.getElementById("TemaSeleccionado").setAttribute("value", datosP.TemaSeleccionado);


        console.log(datosP.IdentificadorSitio);
        console.log(localStorage.getItem("IdUsuario"));
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        document.getElementById("FechaSolicitud").setAttribute("value", date);
        document.getElementById("IdTemaSeleccionado").setAttribute("value", datosP.IdTema);
        document.getElementById("IdSitio2").setAttribute("value", datosP.IdentificadorSitio);
        document.getElementById("IdAlumno1").setAttribute("value", localStorage.getItem("IdUsuario"));
        //document.getElementById("IdUniversidad2").setAttribute("value", datosP.IdUniverisdadSitio);
        document.getElementById("Operation2").setAttribute("value", "20");



        document.getElementById("BtnEnviarSolicitud").addEventListener("click", function () {
            ajax("form#Oculto2");
            window.location.href = "#!index_Alumno"
        })


    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("VerSolicitudAC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerSolicitudA') {
            setListeners();
        }
    });
    setListeners = function () {

        console.clear();
        //Form Oculto
        document.getElementById("IdSolicitud").setAttribute("value", $rootScope.Id_Solicitud);

        document.getElementById("Operation").setAttribute("value", "22_1");
        //Ajax
        var datosA1 = JSON.parse(ajax("form#Oculto"));
        var datosA = datosA1[0][0];

        document.getElementById("Operation").setAttribute("value", "22_2"); //misma operacion
        //Ajax
        var datosP1 = JSON.parse(ajax("form#Oculto"));
        console.log(datosP1);

        var datosP = datosP1[0][0];

        console.log(datosP);

        document.getElementById("UnviversidadAlumno").setAttribute("value", datosA.Universidad);
        document.getElementById("AreaConocimientoAlumno").setAttribute("value", datosA.AreaConocimiento);
        //document.getElementById("UnviversidadAlumno").setAttribute("value",datosA.UniversidadAlumno);
        document.getElementById("NombresAlumno").setAttribute("value", datosA.Nombres);
        document.getElementById("ApellidosAlumno").setAttribute("value", datosA.Apellidos);
        //document.getElementById("FechaNacimientoAlumno").setAttribute("value", datosA.FechaNacimiento);
        //document.getElementById("GeneroAlumno").setAttribute("value", datosA.Genero);
        //document.getElementById("DireccionAlumno").setAttribute("value", datosA.Direccion);
        //document.getElementById("EntidadFederativaAlumno").setAttribute("value", datosA.EntidadFerderativa);
        //document.getElementById("CiudadAlumno").setAttribute("value", datosA.Ciudad);
        //document.getElementById("TelefonoAlumno").setAttribute("value", datosA.Telefono);
        //document.getElementById("CorreoAlumno").setAttribute("value", datosA.Correo);
        //document.getElementById("FechaRegistroAlumno").setAttribute("value", datosA.FechaRegistro);
        //document.getElementById("FotoAlumno").setAttribute("src", datosA.Foto);


        document.getElementById("UnviversidadSeleccionada").setAttribute("value", datosP.UniversidadSeleccionada);
        document.getElementById("PosgradoSeleccionado").setAttribute("value", datosP.PosgradoSeleccionado);
        document.getElementById("LineaInvestigacionSeleccionada").setAttribute("value", datosP.LineaInvestigacionSeleccionada);
        document.getElementById("TemaSeleccionado").setAttribute("value", datosP.TemaSeleccionado);

        switch (datosP.EstadoUniversidad) {
            case "A":
                document.getElementById("EstadoSolicitud").setAttribute("value", "Aceptado");
                break;
            case "R":
                document.getElementById("EstadoSolicitud").setAttribute("value", "Rechazado");
                break;
            case "P":
                document.getElementById("EstadoSolicitud").setAttribute("value", "Pendiente");
                break;
            default:
                document.getElementById("EstadoSolicitud").setAttribute("value", datosP.EstadoUniversidad);
                break;
        }


        document.getElementById("FechaS").setAttribute("value", datosP.FechaSolicitud);

        console.log(datosP.EstadoUniversidad)
        if (datosP.EstadoUniversidad == 'P') {
            document.getElementById("Btns").classList.add("d-none");

        }




        if (datosP.EstadoAlumno == "A") {
            document.getElementById("Respuesta").setAttribute("value", "Aceptado");
        } else if (datosP.EstadoAlumno == "P") {
            document.getElementById("Respuesta").setAttribute("value", "Pendiente");
        } else {
            document.getElementById("Respuesta").setAttribute("value", "Rechzado");
        }








        if (datosP.EstadoAlumno == "P" && datosP.EstadoUniversidad == "A") {
            document.getElementById("BtnAceptar").disabled = false;
            document.getElementById("BtnCancelar").disabled = false;
            //Form Oculto
            document.getElementById("IdSolicitud1").setAttribute("value", $rootScope.Id_Solicitud);
            document.getElementById("BtnAceptar").addEventListener("click", function () {
                document.getElementById("EstadoAlumno").setAttribute("value", "A");
                document.getElementById("idDestino").setAttribute("value", datosP.IdentificadorSitio);
                document.getElementById("Operation1").setAttribute("value", "23");
                //Ajax
                ajax("form#Oculto1");
                window.location.href = "#!index_Alumno";  
            });
            document.getElementById("BtnCancelar").addEventListener("click", function () {
                document.getElementById("EstadoAlumno").setAttribute("value", "R");
                document.getElementById("Operation1").setAttribute("value", "23");
                //Ajax
                ajax("form#Oculto1");
                window.location.href = "#!index_Alumno";  
            });

        } else {
            document.getElementById("Btns").classList.add("d-none");

        }

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'alumno',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});
//End Alumno Controllers



//Register Controllers
app.controller("IndexRegistradorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/index_Registrador') {
            setListeners();
        }
    });

    setListeners = function () {
        document.getElementById("nav_bar_id").classList.remove("d-none");
        document.getElementById("BtnVerPerfil").classList.add("d-none");


        BtnVerPerfil
        document.getElementById("NombreU").setAttribute("value", localStorage.getItem("NombreUsuario"));
        document.getElementById("BtnVerPerfil").disabled = true;
        document.getElementById("BtnAlumno").addEventListener("click", function () {
            winndow.location.href = "#!MenuAlumno";
        });
        document.getElementById("BtnProfesor").addEventListener("click", function () {
            window.location.href = "#!MenuProfesor";
        });
    }


});

app.controller("MenuAlumnoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/MenuAlumno') {
            setListeners();
        }
    });

    setListeners = function () {



    }

});

app.controller("AltaAlumnoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AltaAlumno') {
            setListeners();
        }
    });
    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("Operation").setAttribute("value", "1");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];

        var Select = document.getElementById("SelectArea");

        var Option;
        var optionTxt;
        for (i = 0; i < datos.length; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[i].IdAreaConocimiento);
            optionTxt = document.createTextNode(datos[i].NombreAreaConocimiento);
            Option.appendChild(optionTxt);
            Select.appendChild(Option);
        }

        document.getElementById("BtnGuardar").addEventListener("click", function () {
            document.getElementById("IdReg").setAttribute("value", localStorage.getItem("IdUsuario"));
            //falta id registrador
            document.getElementById("Estado").setAttribute("value", "A");
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("Fecha").setAttribute("value", date);
            document.getElementById("OperationP").setAttribute("value", "2");
            //Ajax
            var datos = ajax("form#Principal");
            if(datos.respuesta1 != 'error'){
                window.location.href = "#!MenuAlumno";    
            }
        });

    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("ListarAlumnosC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/ListarAlumnos') {
            setListeners();
        }
    });

    setListeners = function () {

        console.clear();
        //Form Oculto

        document.getElementById("Operation").setAttribute("value", "3");
        //Ajax

        console.log(document.getElementById("Operation"));

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];



        console.log(datos);




        var Select = document.getElementById("SelectArea");

        var Option;
        var optionTxt;
        for (i = 0; i < datos.length; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[i].IdAreaConocimiento);
            optionTxt = document.createTextNode(datos[i].NombreAreaConocimiento);
            Option.appendChild(optionTxt);
            Select.appendChild(Option);
        }

        document.getElementById("Operation").setAttribute("value", "3");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];
        console.log(datos);

        document.getElementById("BtnBuscar").addEventListener("click", function () {
            //Form Oculto
            document.getElementById("OperationP").setAttribute("value", "4");
            //Ajax
            var datos = JSON.parse(ajax("form#Principal"));

            ListarBusqueda(datos[0]);



        });

        ObjectString = JSON.stringify(datos);
        document.getElementById("BtnListarTodos").setAttribute("value", ObjectString);

        document.getElementById("BtnListarTodos").addEventListener("click", function (ev) {
            var datos = JSON.parse(ev.target.value);
            ListarTodos(datos);
        });





    }

    ListarBusqueda = function (datos) {
        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var divTodos = document.createElement("div");
        divBusqueda.setAttribute("id", "Busqueda");
        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos[r].NombreAlumnoFiltrado);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Detalles");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);

                $rootScope.Id_Alumno = datos.IdAlumnoFiltrado;
                window.location.href = "#!VerAlumno"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divBusqueda.appendChild(divRow);


        }

        if (divPrincipalR.hasChildNodes()) {
            if (document.body.contains(document.getElementById("Busqueda"))) {
                document.getElementById("divBusqueda").remove();
            }

            if (document.body.contains(document.getElementById("Todos"))) {
                document.getElementById("Todos").remove();
            }
            divPrincipalR.appendChild(divTodos);

        } else {
            divPrincipalR.appendChild(divTodos);
        }

    }

    ListarTodos = function (datos) {


        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var divTodos = document.createElement("div");
        divTodos.setAttribute("id", "Todos");
        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos[r].NombreAlumno);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Detalles");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);

                $rootScope.Id_Alumno = datos.IdAlumno;
                window.location.href = "#!VerAlumno"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divTodos.appendChild(divRow);


        }

        if (divPrincipalR.hasChildNodes()) {
            if (document.body.contains(document.getElementById("Busqueda"))) {
                document.getElementById("divBusqueda").remove();
            }

            if (document.body.contains(document.getElementById("Todos"))) {
                document.getElementById("Todos").remove();
            }
            divPrincipalR.appendChild(divTodos);

        } else {
            divPrincipalR.appendChild(divTodos);
        }





    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("VerAlumnoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerAlumno') {
            setListeners();
        }
    });
    setListeners = function () {
        LlenarCampos();

        document.getElementById("BtnEditarAlumno").addEventListener("click", function () {
            document.getElementById("page1").classList.add("d-none"); //completar
            document.getElementById("page2").classList.remove("d-none"); //Completar
        });



        document.getElementById("BtnCancelar").addEventListener("click", function () {
            document.getElementById("page2").classList.add("d-none"); //completar
            document.getElementById("page1").classList.remove("d-none"); //Completar
        });



        document.getElementById("BtnGuardar").addEventListener("click", function () {
            document.getElementById("IdAlumnoP").setAttribute("value", $rootScope.Id_Alumno);
            document.getElementById("idAreaP").setAttribute("value", "666");
            document.getElementById("OperationP").setAttribute("value", "9");
            //Ajax
            if (ajax("form#Principal") != "Error") {
                document.getElementById("page2").classList.add("d-none"); //completar
                document.getElementById("page1").classList.remove("d-none"); //Completar
                LlenarCampos();
            }

        });

        document.getElementById("BtnInterrumpir").addEventListener("click", function () {
            document.getElementById("IdAlumno1").setAttribute("value", $rootScope.Id_Alumno);
            document.getElementById("Operation1").setAttribute("value", "5");

            if (document.getElementById("Posgrado").value != "" && document.getElementById("Posgrado").value !== " ") {
                document.getElementById("Estado").setAttribute("value", "I");
                //Ajax
                var datos1 = JSON.parse(ajax("form#Oculto"));
            }

        });


    }
    
    LlenarCampos = function () {
        //Form Oculto
        document.getElementById("IdAlumno").setAttribute("value", $rootScope.Id_Alumno);
        document.getElementById("Operation").setAttribute("value", "5");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        document.getElementById("Operation").setAttribute("value", "7");
        var datos2 = JSON.parse(ajax("form#Oculto"));
        var datos3 = datos2[0][0];

        document.getElementById("NombreAlumno").setAttribute("value", datos.Nombre);
        document.getElementById("FechaNacimiento").setAttribute("value", datos.FechaNacimiento);
        if(datos.Genero == 'H'){
            document.getElementById("Genero").setAttribute("value", "Hombre");
        }else{
            document.getElementById("Genero").setAttribute("value", "Mujer");
        }
        document.getElementById("Direccion").setAttribute("value", datos.Direccion);
        
        var Entidad;
        switch (datos.EntidadFederativa) {

            case "AS":
                Entidad = "Aguascalientes";
                break;
            case "BC":
                Entidad: "Baja California";
                break;
            case "BS":
                Entidad = "BAJA CALIFORNIA SUR";
                break;

            case "CC":
                Entidad = "CAMPECHE";
                break;
            case "CL":
                Entidad = "COAHUILA";
                break;

            case "CM":
                Entidad = "COLIMA";
                break;

            case "CS":
                Entidad = "CHIAPAS";
                break;

            case "CH":
                Entidad = "CHIHUAHUA";
                break;
            case "DF":
                Entidad = "DISTRITO FEDERAL";
                break;
            case "DG":
                Entidad = "DURANGO";
                break;
            case "GT":
                Entidad = "GUANAJUATO";
                break;
            case "GR":
                Entidad = "GUERRERO";
                break;
            case "HG":
                Entidad = "HIDALGO";
                break;

            case "JC":
                Entidad = "JALISCO";
                break;
            case "MC":
                Entidad = "MEXICO";
                break;
            case "MN":
                Entidad = "MICHOACAN";
                break;
            case "MS":
                Entidad = "MORELOS";
                break;
            case "NT":
                Entidad = "NAYARIT";
                break;
            case "NL":
                Entidad = "NUEVO LEON";
                break;
            case "OC":
                Entidad = "OAXACA";
                break;
            case "PL":
                Entidad = "PUEBLA";
                break;
            case "QT":
                Entidad = "QUERETARO";
                break;
            case "QR":
                Entidad = "QUINTANA ROO";
                break;
            case "SP":
                Entidad = "SAN LUIS POTOSI";
                break;
            case "SL":
                Entidad = "SINALOA";
                break;
            case "SR":
                Entidad = "SONORA";
                break;
            case "TC":
                Entidad = "TABASCO";
                break;
            case "TS":
                Entidad = "TAMAULIPAS";
                break;
            case "TL":
                Entidad = "TLAXCALA";
                break;
            case "VZ":
                Entidad = "VERACRUZ";
                break;
            case "YN":
                Entidad = "YUCATAN";
                break;
            case "ZS":
                Entidad = "ZACATECAS";
                break;
        }

        document.getElementById("EntidadFederativa").setAttribute("value", Entidad);
        document.getElementById("Ciudad").setAttribute("value", datos.Ciudad);
        document.getElementById("Telefono").setAttribute("value", datos.Telefono);
        document.getElementById("Correo").setAttribute("value", datos.Correo);
        document.getElementById("Contraseña").setAttribute("value", datos.Contrasena);
        document.getElementById("FechaRegistro").setAttribute("value", datos.FechaRegistro);
        if (datos.Estado == "A") {
            document.getElementById("Estado").setAttribute("value", "Activo");
        } else {
            document.getElementById("Estado").setAttribute("value", "Inactivo");
        }
        document.getElementById("Areaconocimiento").setAttribute("value", datos.AreaConocimiento);
        if (datos.Posgrado != null) {
            document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
            switch (datos.Estado) {
                case "P":
                    document.getElementById("EstadoPosgrado").setAttribute("value", "Pendiente");
                    break;
                case "A":
                    document.getElementById("EstadoPosgrado").setAttribute("value", "Aceptado");
                    break;
                case "R":
                    document.getElementById("EstadoPosgrado").setAttribute("value", "Rechazado");
                    break;

                default:
                    document.getElementById("EstadoPosgrado").setAttribute("value", "Indeterminado");
                    break;
            }


            document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
            document.getElementById("Tema").setAttribute("value", datos.Tema);
            document.getElementById("ProfesorTutor").setAttribute("value", datos.NombreProfesorTutor);




            // document.getElementById("IdArea").setAttribute("value", datos.IdAreaConocimiento);

        }
        document.getElementById("NombreAlumno1").setAttribute("value", datos3.Nombres);
        document.getElementById("ApellidosAlumno1").setAttribute("value", datos3.Apellidos);
        document.getElementById("FechaNacimiento1").setAttribute("value", datos.FechaNacimiento);

        document.getElementById("Direccion1").setAttribute("value", datos.Direccion);

        document.getElementById("Ciudad1").setAttribute("value", datos.Ciudad);
        document.getElementById("Telefono1").setAttribute("value", datos.Telefono);
        document.getElementById("Correo1").setAttribute("value", datos.Correo);
        document.getElementById("EstadoP").setAttribute("value", datos.Estado);

        document.getElementById("BtnHabilitarDesHabilitar").addEventListener("click", function () {
            document.getElementById("Operation").setAttribute("value", "6");
            ajax("form#Oculto");
            LlenarCampos();
        });


    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                respuesta1 = Errores(respuesta);


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                return "Error";
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                return "Error";
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                return "Error";
                break;
            case "4":
                alert("Error en la BD");
                return "Error";
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                return "Error";
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                return "Error";
                break;
            case "7":
                alert("Sesión Expiro");
                return "Error";
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                return "Error";
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                return "Error";
                break;
            case "10":
                alert("Operación denegada");
                return "Error";
                break;
            case "11":
                alert("Formulario Invalido");
                return "Error";
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                return "Error";
                break;
            case "255":
                alert("¡Error!");
                return "Error";
                break;

            default:
                return error;
                break;
        }




    }
});

app.controller("VerSolicitudesC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerSolicitudes') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto
        document.getElementById("IdRegistrador").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "10");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];

        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode("Nombre Alumno: " + datos[r].NombreAlumno + " Posgrado: " + datos[r].Posgrado);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Ver Detalles");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);
                $rootScope.Id_Solicitud = datos.IdSolicitud;
                window.location.href = "#!DetallesSolicitud"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }






    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //  ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("DetallesSolicitudC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/DetallesSolicitud') {

            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("IdSolicitudO").setAttribute("value", $rootScope.Id_Solicitud);
        document.getElementById("Operation").setAttribute("value", "11");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        console.log(datos);
        console.log(datos.Nombres);

        document.getElementById("NombreAlumno").setAttribute("value", datos.Nombres);
        console.log(document.getElementById("NombreAlumno"));
        document.getElementById("ApellidosAlumno").setAttribute("value", datos.Apellidos);
        document.getElementById("FechaNacimientoAlumno").setAttribute("value", datos.FechaNacimiento);
        if(datos.Genero == 'H'){
            document.getElementById("GeneroAlumno").setAttribute("value", "Hombre");
        }else{
            document.getElementById("GeneroAlumno").setAttribute("value", "Mujer");    
        }
        document.getElementById("DireccionAlumno").setAttribute("value", datos.Direccion);


        var Entidad;
        switch (datos.EntidadFederativa) {

            case "AS":
                Entidad = "Aguascalientes";
                break;
            case "BC":
                Entidad: "Baja California";
                break;
            case "BS":
                Entidad = "BAJA CALIFORNIA SUR";
                break;

            case "CC":
                Entidad = "CAMPECHE";
                break;
            case "CL":
                Entidad = "COAHUILA";
                break;

            case "CM":
                Entidad = "COLIMA";
                break;

            case "CS":
                Entidad = "CHIAPAS";
                break;

            case "CH":
                Entidad = "CHIHUAHUA";
                break;
            case "DF":
                Entidad = "DISTRITO FEDERAL";
                break;
            case "DG":
                Entidad = "DURANGO";
                break;
            case "GT":
                Entidad = "GUANAJUATO";
                break;
            case "GR":
                Entidad = "GUERRERO";
                break;
            case "HG":
                Entidad = "HIDALGO";
                break;

            case "JC":
                Entidad = "JALISCO";
                break;
            case "MC":
                Entidad = "MEXICO";
                break;
            case "MN":
                Entidad = "MICHOACAN";
                break;
            case "MS":
                Entidad = "MORELOS";
                break;
            case "NT":
                Entidad = "NAYARIT";
                break;
            case "NL":
                Entidad = "NUEVO LEON";
                break;
            case "OC":
                Entidad = "OAXACA";
                break;
            case "PL":
                Entidad = "PUEBLA";
                break;
            case "QT":
                Entidad = "QUERETARO";
                break;
            case "QR":
                Entidad = "QUINTANA ROO";
                break;
            case "SP":
                Entidad = "SAN LUIS POTOSI";
                break;
            case "SL":
                Entidad = "SINALOA";
                break;
            case "SR":
                Entidad = "SONORA";
                break;
            case "TC":
                Entidad = "TABASCO";
                break;
            case "TS":
                Entidad = "TAMAULIPAS";
                break;
            case "TL":
                Entidad = "TLAXCALA";
                break;
            case "VZ":
                Entidad = "VERACRUZ";
                break;
            case "YN":
                Entidad = "YUCATAN";
                break;
            case "ZS":
                Entidad = "ZACATECAS";
                break;




        }



        document.getElementById("EntidadFerderativaAlumno").setAttribute("value", Entidad);
        document.getElementById("CiudadAlumno").setAttribute("value", datos.Ciudad);
        document.getElementById("TelefonoAlumno").setAttribute("value", datos.Telefono);
        document.getElementById("CorreoAlumno").setAttribute("value", datos.Correo);
        document.getElementById("AreaConocimientoAlumno").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("FechaSolicitudAlumno").setAttribute("value", datos.FechaSolicitud);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("Tema").setAttribute("value", datos.Tema);
        if (datos.TipoArchivo == "pdf") {
            document.getElementById("ObjectConvocatoria").setAttribute("data", datos.Convocatoria);
        }
        document.getElementById("LinkDescarga").setAttribute("download", datos.NombreArchivo);
        document.getElementById("LinkDescarga").setAttribute("href", datos.Convocatoria);




        document.getElementById("BtnAceptar").addEventListener("click", function () {
            //Form Oculto
            document.getElementById("IdSolicitudO1").setAttribute("value", $rootScope.Id_Solicitud);
            document.getElementById("Respuesta").setAttribute("value", "A");
            document.getElementById("Operation1").setAttribute("value", "12");
            //Ajax
            ajax("form#Oculto1");
            window.location.href = "#!VerSolicitudes";
        });

        document.getElementById("BtnRechazar").addEventListener("click", function () {
            //Form Oculto
            document.getElementById("IdSolicitudO1").setAttribute("value", $rootScope.Id_Solicitud);
            document.getElementById("Respuesta").setAttribute("value", "R");
            document.getElementById("Operation1").setAttribute("value", "12");
            //Ajax
            ajax("form#Oculto1");
            window.location.href = "#!VerSolicitudes";
        });




    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("SolicitudesAceptadasC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/SolicitudesAceptadas') {
            setListeners();
        }
    });
    setListeners = function () {
        console.clear();
        document.getElementById("IdRegistradorO").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "13");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];
        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode("Nombre Alumno: " + datos[r].NombreAlumno + " Posgrado: " + datos[r].Posgrado);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Ver Detalles");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);
                $rootScope.Id_Solicitud = datos.IdSolicitud;
                window.location.href = "#!AsignacionPosgrado"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }
    }


    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("AsignacionPosgrado", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AsignacionPosgrado') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        document.getElementById("IdSolicitudO").setAttribute("value", $rootScope.Id_Solicitud);
        document.getElementById("Operation").setAttribute("value", "14_1");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];

        document.getElementById("IdSolicitudO").setAttribute("value", $rootScope.Id_Solicitud);
        document.getElementById("Operation").setAttribute("value", "14_2");
        //Ajax
        var datosG = JSON.parse(ajax("form#Oculto"));
        var datosG = datosG[0];

        document.getElementById("IdSolicitudO").setAttribute("value", $rootScope.Id_Solicitud);
        document.getElementById("Operation").setAttribute("value", "14_3");
        //Ajax
        var datosP = JSON.parse(ajax("form#Oculto"));
        var datosP = datosP[0];
        document.getElementById("NombreAlumno").setAttribute("value", datos.Nombres);
        document.getElementById("ApellidosAlumno").setAttribute("value", datos.Apellidos);
        // document.getElementById("FechaNacimientoAlumno").setAttribute("value", datos.FechaNacimiento);
        //document.getElementById("GeneroAlumno").setAttribute("value", datos.Genero);
        //document.getElementById("DireccionAlumno").setAttribute("value", datos.Direccion);
        //document.getElementById("EntidadFerderativaAlumno").setAttribute("value", datos.EntidadFerderativa);
        //document.getElementById("CiudadAlumno").setAttribute("value", datos.Ciudad);
        document.getElementById("TelefonoAlumno").setAttribute("value", datos.Telefono);
        document.getElementById("CorreoAlumno").setAttribute("value", datos.Correo);
        document.getElementById("AreaConocimientoAlumno").setAttribute("value", datos.AreaConocimiento);
        //document.getElementById("FechaSolicitudAlumno").setAttribute("value", datos.FechaSolicitud);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("Tema").setAttribute("value", datos.Tema);




        var divPrincipalRG = document.getElementById("DivResultadosGrupo");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < datosG.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-7"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datosG[r].Grupo);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);



            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datosG[r].Cupo);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);






            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-3"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Asignar");
            BtnVerD.appendChild(txtBtn);

            var objetoString = JSON.stringify(datosG[r]);
            BtnVerD.setAttribute("value", objetoString);

            BtnVerD.addEventListener("click", function (ev) {
                var datosG = JSON.parse(ev.target.value);


                document.getElementById("FechaInicio").setAttribute("value", datosG.FechaInicio);
                document.getElementById("FechaFin").setAttribute("value", datosG.FechaFin);
                //document.getElementById("EstadoTemaImp").setAttribute("value", datosG.EstadoTemaImp);

                //Asignacion de tema Impartido a Form Principal


                document.getElementById("TemaImpartidoPrincipal").setAttribute("value", datosG.IdTemaImpartido);


            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalRG.appendChild(divRow);

        }




        var divPrincipalRP = document.getElementById("DivResultadosProfe");

        for (r = 0; r < datosP.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-9"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datosP[r].NombreProfesorTutor);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-3"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Asignar");
            BtnVerD.appendChild(txtBtn);
            BtnVerD.setAttribute("value", datosP[r].IdProfesorTutor);
            BtnVerD.addEventListener("click", function (ev) {



                console.log(document.getElementById("IdProfesorTutorPrincipal"));
                //Asignacion de Profe a Form Principal
                document.getElementById("IdProfesorTutorPrincipal").setAttribute("value", ev.target.value);


            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalRP.appendChild(divRow);

        }




        document.getElementById("BtnFinalizarRegistro").addEventListener("click", function () {
            document.getElementById("IdSolicitudPrincipal").setAttribute("value", $rootScope.Id_Solicitud);
            document.getElementById("OperationP").setAttribute("value", "15");
            ajax("form#Principal");
            window.location.href = "#!SolicitudesAceptadas";
        });


    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "28":
                alert("Registro Existente");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("AltaProfesorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AltaProfesor') {
            setListeners();
        }
    });
    setListeners = function () {
        console.clear();
        document.getElementById("IdRegistrdorO").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("OperationO").setAttribute("value", "16");
        //Ajax
        /*var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos=datos1[0];
        console.log(datos);
        
        
        //IdUniversidadSitio
        */



        document.getElementById("Operation1").setAttribute("value", "16_1");
        var ListaTemas1 = JSON.parse(ajax("form#Oculto1"));

        var ListaTemas = ListaTemas1[0];









        var SelectA = document.getElementById("SelectAreas");
        var Option;
        var txtOption;


        for (i = 0; i < ListaTemas.length; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", ListaTemas[i].IdAreaConocimiento);
            txtOption = document.createTextNode(ListaTemas[i].NombreAreaConocimiento);
            Option.appendChild(txtOption);
            console.log(Option);
            SelectA.appendChild(Option);
        }
        console.log(SelectA);



        SelectA.addEventListener("change", function () {

            console.log("Listener");
            document.getElementById("IdUni").setAttribute("value", localStorage.getItem("IdUniversidadSitio"));

            document.getElementById("Operation3").setAttribute("value", "16_2");
            var datos1 = JSON.parse(ajax("form#Oculto2"));
            var datos = datos1[0];

            console.log(datos);



            var SelectP = document.getElementById("SelectPosgrados");

            if (SelectP.hasChildNodes) {
                for (i = 0; i < SelectP.childElementCount; i++) {
                    SelectP.childNodes[i].remove();
                }
            }



            for (i = 0; i < datos.length; i++) {

                console.log(datos[i].IdAreaConocimientoPosgrado);
                console.log(SelectA.value);


                console.log(datos[i].IdAreaConocimientoPosgrado == SelectA.value);

                if (datos[i].IdAreaConocimientoPosgrado == SelectA.value) {

                    Option = document.createElement("option");
                    Option.setAttribute("value", datos[i].IdPosgrado);
                    txtOption = document.createTextNode(datos[i].NombrePosgrado);
                    Option.appendChild(txtOption);
                    SelectP.appendChild(Option);

                }



            }



        });









        document.getElementById("BtnRegistrar").addEventListener("click", function () {

            document.getElementById("Estado").setAttribute("value", "A");
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();

            document.getElementById("FechaRegistro").setAttribute("value", date);
            document.getElementById("IdReg").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("Operation").setAttribute("value", "17");
            //Ajax
            var datos = ajax("form#Principal");
            if (datos != "Error") {
                window.location.href = "#!MenuProfesor";
            }

        });




    }


    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                respuesta1 = Errores(respuesta);


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                return "Error";
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                return "Error";
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                return "Error";
                break;
            case "4":
                alert("Error en la BD");
                return "Error";
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                return "Error";
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                return "Error";
                break;
            case "7":
                alert("Sesión Expiro");
                return "Error";
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                return "Error";
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                return "Error";
                break;
            case "10":
                alert("Operación denegada");
                return "Error";
                break;
            case "11":
                alert("Formulario Invalido");
                return "Error";
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                return "Error";
                break;
            case "255":
                alert("¡Error!");
                return "Error";
                break;

            default:
                return error;
                break;
        }
        //return error;



    }
});

app.controller("ListarProfesoresC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/ListarProfesores') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        document.getElementById("IdRegistrador").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "18");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];
        var SelectA = document.getElementById("SelectAreas");
        var Option;
        var txtOption;

        for (i = 0; i < datos.lenght; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[i].IdAreaConocimiento);
            txtOption = document.createTextNode(datos[i].NombreAreaConocimiento);
            Option.appendChild(txtOption);
            SelectA.appendChild(Option);
        }

        var SelectP = document.getElementById("SelectPosgrados");
        for (i = 0; i < datos.lenght; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[i].IdPosgrado);
            txtOption = document.createTextNode(datos[i].NombrePosgrado);
            Option.appendChild(txtOption);
            SelectP.appendChild(Option);
        }




        var ObjectString = JSON.stringify(datos);
        document.getElementById("BtnTodos").setAttribute("value", ObjectString);


        document.getElementById("BtnTodos").addEventListener("click", function (ev) {
            var datos = JSON.parse(ev.target.value);

            actualizarLista(datos, 1);
        });

        document.getElementById("BtnBuscar").addEventListener("click", function () {
            document.getElementById("IdRegistrador1").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("Operation1").setAttribute("value", "19");
            //Ajax
            var datos = JSON.parse(ajax("form#Principal"));
            actualizarLista(datos[0], 2);
        });




    }

    actualizarLista = function (datos, op) {
        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var ObjectString;


        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            if (op == 1) {
                txtSpan = document.createTextNode(datos[r].NombreProfesor);
            } else {
                txtSpan = document.createTextNode(datos[r].NombreProfesorFiltrado);
            }


            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Detalles");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);

            if (op == 1) {
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);


                    $rootScope.Id_Profesor = datos.IdProfesor;
                    window.location.href = "#!VerProfesor"; //completar

                });
            } else {
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);


                    $rootScope.Id_Profesor = datos.IdProfesorFiltrado;
                    window.location.href = "#!VerProfesor";
                });
            }

            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }
    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("VerProfesorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerProfesor') {
            setListeners();
        }
    });

    setListeners = function () {

        console.clear();
        actualizar();

        document.getElementById("BtnHabilitarDes").addEventListener("click", function () {
            document.getElementById("IdProfesor1").setAttribute("value", $rootScope.Id_Profesor);
            document.getElementById("Operation1").setAttribute("value", "21");
            //Ajax
            ajax("form#Oculto1");
            actualizar();
        });


    }
    actualizar = function () {
        document.getElementById("IdRegistrador").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdProfesor").setAttribute("value", $rootScope.Id_Profesor);
        document.getElementById("Operation").setAttribute("value", "20");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        document.getElementById("Nombre").setAttribute("value", datos.Nombre);
        //document.getElementById("Apellidos").setAttribute("value", datos.Apellidos);
        document.getElementById("FechaNacimiento").setAttribute("value", datos.FechaNacimiento);
        if (datos.Genero == 'H') {
            document.getElementById("Genero").setAttribute("value", 'Hombre');
        } else {
            document.getElementById("Genero").setAttribute("value", 'Mujer');
        }
        document.getElementById("Direccion").setAttribute("value", datos.Direccion);

        var Entidad;
        switch (datos.EntidadFederativa) {

            case "AS":
                Entidad = "Aguascalientes";
                break;
            case "BC":
                Entidad: "Baja California";
                break;
            case "BS":
                Entidad = "BAJA CALIFORNIA SUR";
                break;

            case "CC":
                Entidad = "CAMPECHE";
                break;
            case "CL":
                Entidad = "COAHUILA";
                break;

            case "CM":
                Entidad = "COLIMA";
                break;

            case "CS":
                Entidad = "CHIAPAS";
                break;

            case "CH":
                Entidad = "CHIHUAHUA";
                break;
            case "DF":
                Entidad = "DISTRITO FEDERAL";
                break;
            case "DG":
                Entidad = "DURANGO";
                break;
            case "GT":
                Entidad = "GUANAJUATO";
                break;
            case "GR":
                Entidad = "GUERRERO";
                break;
            case "HG":
                Entidad = "HIDALGO";
                break;

            case "JC":
                Entidad = "JALISCO";
                break;
            case "MC":
                Entidad = "MEXICO";
                break;
            case "MN":
                Entidad = "MICHOACAN";
                break;
            case "MS":
                Entidad = "MORELOS";
                break;
            case "NT":
                Entidad = "NAYARIT";
                break;
            case "NL":
                Entidad = "NUEVO LEON";
                break;
            case "OC":
                Entidad = "OAXACA";
                break;
            case "PL":
                Entidad = "PUEBLA";
                break;
            case "QT":
                Entidad = "QUERETARO";
                break;
            case "QR":
                Entidad = "QUINTANA ROO";
                break;
            case "SP":
                Entidad = "SAN LUIS POTOSI";
                break;
            case "SL":
                Entidad = "SINALOA";
                break;
            case "SR":
                Entidad = "SONORA";
                break;
            case "TC":
                Entidad = "TABASCO";
                break;
            case "TS":
                Entidad = "TAMAULIPAS";
                break;
            case "TL":
                Entidad = "TLAXCALA";
                break;
            case "VZ":
                Entidad = "VERACRUZ";
                break;
            case "YN":
                Entidad = "YUCATAN";
                break;
            case "ZS":
                Entidad = "ZACATECAS";
                break;
        }


        document.getElementById("EntidadFerderativa").setAttribute("value", Entidad);
        document.getElementById("Ciudad").setAttribute("value", datos.Ciudad);
        document.getElementById("Telefono").setAttribute("value", datos.Telefono);
        document.getElementById("Cedula").setAttribute("value", datos.Cedula);
        document.getElementById("Correo").setAttribute("value", datos.Correo);
        document.getElementById("FechaRegistro").setAttribute("value", datos.FechaRegistro);
        if (datos.Estado == 'A') {
            document.getElementById("Estado").setAttribute("value", 'Activo');
        } else {
            document.getElementById("Estado").setAttribute("value", 'Inactivo');
        }
        document.getElementById("AreaC").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        if (datos.LineaInvestigacion == null) {
            document.getElementById("LineaInvestigacion").setAttribute("value", 'Sin Asignar');
        } else {
            document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        }

    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("EditarProfesorC", function (rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/EditarProfesor') {
            setListeners();
        }
    });
    setListeners = function () {
        document.getElementById("IdProfesorO").setAttribute("value", $rootScope.Id_Profesor);
        document.getElementById("OperationO").setAttribute("value", "22_1");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));



        document.getElementById("OperationO1").setAttribute("value", "22_2");
        //Ajax
        var datos = JSON.parse(ajax("form#Oculto1"));







        var SelectA = document.getElementById("SelectAreas");
        var Option;
        var txtOption;


        for (i = 0; i < datos[0].lenght; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[0][i].IdAreaConocimiento);
            txtOption = document.createTextNode(datos[0][i].AreaConocimiento);
            Option.appendChild(txtOption);
            SelectA.appendChild(Option);
        }

        var SelectP = document.getElementById("SelectPosgrados");
        for (i = 0; i < datos[1].lenght; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[1][i].IdPosgrado);
            txtOption = document.createTextNode(datos[1][i].Posgrado);
            Option.appendChild(txtOption);
            SelectP.appendChild(Option);
        }
        var SelectL = document.getElementById("SelectLineas");
        for (i = 0; i < datos[2].lenght; i++) {
            Option = document.createElement("option");
            Option.setAttribute("value", datos[2][i].IdLineaInvestigacion);
            txtOption = document.createTextNode(datos[2][i].LineaInvestigacion);
            Option.appendChild(txtOption);
            SelectL.appendChild(Option);
        }



        document.getElementById("Nombre").setAttribute("value", datos1.Nombre);
        document.getElementById("Apellidos").setAttribute("value", datos1.Apellidos);
        document.getElementById("FechaNacimiento").setAttribute("value", datos1.FechaNacimiento);
        document.getElementById("Genero").setAttribute("value", datos1.Genero);
        document.getElementById("Direccion").setAttribute("value", datos1.Direccion);
        document.getElementById("EntidadFerderativa").setAttribute("value", datos1.EntidadFerderativa);
        document.getElementById("Ciudad").setAttribute("value", datos1.Ciudad);
        document.getElementById("Telefono").setAttribute("value", datos1.Telefono);
        document.getElementById("Cedula").setAttribute("value", datos1.Cedula);
        document.getElementById("Correo").setAttribute("value", datos1.Correo);
        document.getElementById("FechaRegistro").setAttribute("value", datos1.FechaRegistro);
        document.getElementById("Estado").setAttribute("value", datos1.Estado);









        document.getElementById("BtnRegistrar").addEventListener("click", function () {
            document.getElementById("IdProfesor").setAttribute("value", $rootScope.Id_Profesor);
            document.getElementById("Estado").setAttribute("value", "A");
            document.getElementById("Operation").setAttribute("value", "17");
            //Ajax
            var datos = ajax("form#Principal");
            window.location.href = "#!MenuProfesor";
        });
    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'registrador',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});
//End register Controllers


//Profesor Controllers
app.controller("IndexProfesorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/index_Profesor') {
            setListeners();
        }
    });

    setListeners = function () {
        document.getElementById("nav_bar_id").classList.remove("d-none");
        document.getElementById("BtnVerPerfil").classList.remove("d-none");
        console.clear();
        //Form Oculto1
        document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "1_1");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        datos = datos1[0];
        console.log(localStorage.getItem("NombreUsuario"));
        //document.getElementById("FotoProfesor").setAttribute("src", datos.Foto);
        document.getElementById("NombreU").setAttribute("value", localStorage.getItem("NombreUsuario"));

        Cursos();


        document.getElementById("BtnVerPerfil").addEventListener("click", function () {
            window.location.href = "#!VerPerfilProfesor";
        });




    }

    Cursos = function () {
        //se Usa el Form Oculto1
        document.getElementById("Operation").setAttribute("value", "1_2");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];

        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var ObjectString;


        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-10"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode("Tema: " + datos[r].Tema + " Grupo: " + datos[r].Grupo);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Entrar");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);

                sessionStorage.setItem("IdCurso", datos.IdCurso);
                $rootScope.Id_Curso = datos.IdCurso;
                window.location.href = "#!VerCurso"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }
    }

    /*Tutorias = function () {
        //se Usa el Form Oculto1
        document.getElementById("Operation").setAttribute("value", "21");
        //Ajax
        var datos = JSON.parse(ajax("form#Oculto"));

        var divPrincipalR = document.getElementById("divTutorias");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var ObjectString;

        var divTemporal = document.createElement("div");
        divTemporal.setAttribute("id", "Temporal");
        for (r = 0; r < datos.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos[r][c].Grupo);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Ver Detalles");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(datos[r][c]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);


                $rootScope.Id_Alumno = datos.IdAlumno;
                window.location.href = "#!VerPerfilAlumnoP"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);

            divTemporal.appendChild(divRow);






        }

        if (divPrincipalR.hasChildNodes()) {
            if (document.body.contains(document.getElementById("Temporal"))) {
                document.getElementById("Temporal").remove();
            }

            divPrincipalR.appendChild(divTemporal);

        } else {
            divPrincipalR.appendChild(divTemporal);
        }



    }*/

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("VerPerfilProfesorC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerPerfilProfesor') {
            setListeners();
        }
    });
    setListeners = function () {
        //Form Oculto
        document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "2");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];

        document.getElementById("Nombre").setAttribute("value", datos.Nombres);
        document.getElementById("Apellidos").setAttribute("value", datos.Apellidos);
        document.getElementById("FechaNacimiento").setAttribute("value", datos.FechaNacimiento);
        document.getElementById("Genero").setAttribute("value", datos.Genero);
        document.getElementById("Direccion").setAttribute("value", datos.Direccion);



        var Entidad;
        switch (datos.EntidadFederativa) {

            case "AS":
                Entidad = "Aguascalientes";
                break;
            case "BC":
                Entidad: "Baja California";
                break;
            case "BS":
                Entidad = "BAJA CALIFORNIA SUR";
                break;

            case "CC":
                Entidad = "CAMPECHE";
                break;
            case "CL":
                Entidad = "COAHUILA";
                break;

            case "CM":
                Entidad = "COLIMA";
                break;

            case "CS":
                Entidad = "CHIAPAS";
                break;

            case "CH":
                Entidad = "CHIHUAHUA";
                break;
            case "DF":
                Entidad = "DISTRITO FEDERAL";
                break;
            case "DG":
                Entidad = "DURANGO";
                break;
            case "GT":
                Entidad = "GUANAJUATO";
                break;
            case "GR":
                Entidad = "GUERRERO";
                break;
            case "HG":
                Entidad = "HIDALGO";
                break;

            case "JC":
                Entidad = "JALISCO";
                break;
            case "MC":
                Entidad = "MEXICO";
                break;
            case "MN":
                Entidad = "MICHOACAN";
                break;
            case "MS":
                Entidad = "MORELOS";
                break;
            case "NT":
                Entidad = "NAYARIT";
                break;
            case "NL":
                Entidad = "NUEVO LEON";
                break;
            case "OC":
                Entidad = "OAXACA";
                break;
            case "PL":
                Entidad = "PUEBLA";
                break;
            case "QT":
                Entidad = "QUERETARO";
                break;
            case "QR":
                Entidad = "QUINTANA ROO";
                break;
            case "SP":
                Entidad = "SAN LUIS POTOSI";
                break;
            case "SL":
                Entidad = "SINALOA";
                break;
            case "SR":
                Entidad = "SONORA";
                break;
            case "TC":
                Entidad = "TABASCO";
                break;
            case "TS":
                Entidad = "TAMAULIPAS";
                break;
            case "TL":
                Entidad = "TLAXCALA";
                break;
            case "VZ":
                Entidad = "VERACRUZ";
                break;
            case "YN":
                Entidad = "YUCATAN";
                break;
            case "ZS":
                Entidad = "ZACATECAS";
                break;




        }









        document.getElementById("EntidadFerderativa").setAttribute("value", Entidad);
        document.getElementById("Ciudad").setAttribute("value", datos.Ciudad);
        document.getElementById("Telefono").setAttribute("value", datos.Telefono);
        document.getElementById("Cedula").setAttribute("value", datos.Cedula);
        document.getElementById("Correo").setAttribute("value", datos.Correo);
        document.getElementById("FechaRegistro").setAttribute("value", datos.FechaRegistro);
        document.getElementById("AreaConocimiento").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        //document.getElementById("Foto").setAttribute("src", datos.Foto);

        document.getElementById("BtnEditar").addEventListener("click", function (e) {



            var caller = e.target || e.srcElement;
            if (caller.childNodes[0].nodeValue == "Guardar") {
                document.getElementById("IdProfesorP").setAttribute("value", localStorage.getItem("IdUsuario"));
                document.getElementById("OperationP").setAttribute("value", "4");
                ajax("form#Principal");

                caller.childNodes[0].nodeValue = "Editar Tema";

                Telefono.readOnly = true;
                document.getElementById("DivPassword").classList.add("d-none");
                window.location.href = "#!VerPerfilProfesor"
                //document.getElementById("FotoFile").classList.add("Oculto");
            } else {


                //Telefono.readOnly = false;
                document.getElementById("DivPassword").classList.remove("d-none");
                // document.getElementById("FotoFile").classList.remove("Oculto");
                console.log(caller.childNodes[0].nodeValue);
                caller.childNodes[0].nodeValue = "Guardar";
            }







            //window.location.href = "#!EditarPerfilP";
        });
    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("EditarPerfilPC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/EditarPerfilP') {
            setListeners();
        }
    });
    setListeners = function () {
        //Form Oculto
        document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "3");
        //Ajax
        var datos = JSON.parse(ajax("form#Oculto"));

        document.getElementById("Nombre").setAttribute("value", datos.Nombre);
        document.getElementById("Apellidos").setAttribute("value", datos.Apellidos);
        document.getElementById("FechaNacimiento").setAttribute("value", datos.FechaNacimiento);
        document.getElementById("Genero").setAttribute("value", datos.Genero);
        document.getElementById("Direccion").setAttribute("value", datos.Direccion);
        document.getElementById("EntidadFerderativa").setAttribute("value", datos.EntidadFerderativa);
        document.getElementById("Ciudad").setAttribute("value", datos.Ciudad);
        document.getElementById("Telefono").setAttribute("value", datos.Telefono);
        document.getElementById("Cedula").setAttribute("value", datos.Cedula);
        document.getElementById("Correo").setAttribute("value", datos.Correo);
        document.getElementById("FechaRegistro").setAttribute("value", datos.FechaRegistro);
        document.getElementById("AreaConocimiento").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("Foto").setAttribute("src", datos.Foto);

        document.getElementById("BtnGuardar").addEventListener("click", function () {
            document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("Operation").setAttribute("value", "4");
            //Ajax
            var datos = JSON.parse(ajax("form#Oculto"));
            window.location.href = "#!VerPerfilP";
        });
    }


    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("VerCursoC", function ($rootScope, $location, $scope) {

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerCurso') {
            setListeners();
        }
    });


    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("IdCurso").setAttribute("value", sessionStorage.getItem("IdCurso"));
        document.getElementById("Operation").setAttribute("value", "5_1");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];


        document.getElementById("PosgradoName").setAttribute("value", datos.Posgrado);
        document.getElementById("NombreLinea").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("NombreTema").setAttribute("value", datos.Tema);
        document.getElementById("Grupo").setAttribute("value", datos.Grupo);
        document.getElementById("FechaInicio").setAttribute("value", datos.FechaInicio);
        document.getElementById("FechaFin").setAttribute("value", datos.FechaFin);
        document.getElementById("Cupo").setAttribute("value", datos.Cupo);
        document.getElementById("NuemeroAlumnosInscritos").setAttribute("value", datos.NumeroAlumnosIncritos);
        document.getElementById("EstadoGrupo").setAttribute("value", datos.EstadoGrupo);



        document.getElementById("Operation").setAttribute("value", "5_2");
        var ListaRecursos1 = JSON.parse(ajax("form#Oculto"));
        var ListaRecursos = ListaRecursos1[0];

        document.getElementById("Operation").setAttribute("value", "5_3");
        var ListaActividades1 = JSON.parse(ajax("form#Oculto"));
        var ListaActividades = ListaActividades1[0];

        document.getElementById("Operation").setAttribute("value", "5_4");
        var ListaAlumnos = JSON.parse(ajax("form#Oculto"));
        //var ListaAlumnos = ListaAlumnos1[0];

        //Preparar Lista de Recursos y  Actividades
        var ListadoResultados = new Array();
        var obj;
        var bandera;

        console.log(ListaActividades);
        console.log(ListaRecursos);

        if (ListaActividades != 5 && ListaActividades1 != 5) {
            for (i = 0; i < ListaActividades.length; i++) {
                obj = {
                    Datos: ListaActividades[i],
                    Fecha: ListaActividades[i].FechaActividad,
                    Tipo: "Actividad"
                };
                bandera = false;
                if (ListadoResultados.length != 0) {


                    for (c = 0; c < ListadoResultados.length; c++) {
                        if (ListadoResultados[c].Fecha < obj.Fecha && bandera == false) {
                            ListadoResultados.splice(c, 0, obj);
                            bandera = true;
                        }


                    }
                    if (!bandera) {
                        ListadoResultados.push(obj);
                    }
                } else {
                    ListadoResultados.push(obj);
                }
            }
        }

        if (ListaRecursos != 5 && ListaRecursos1 != 5) {
            for (i = 0; i < ListaRecursos.length; i++) {
                obj = {
                    Datos: ListaRecursos[i],
                    Fecha: ListaRecursos[i].FechaRecurso,
                    Tipo: "Recurso"
                };
                bandera = false;
                if (ListadoResultados.length != 0) {


                    for (c = 0; c < ListadoResultados.length; c++) {
                        if (ListadoResultados[c].Fecha < obj.Fecha && bandera == false) {
                            ListadoResultados.splice(c, 0, obj);
                            bandera = true;
                        }


                    }
                    if (!bandera) {
                        ListadoResultados.push(obj);
                    }
                } else {
                    ListadoResultados.push(obj);
                }
            }
        }


        //Colocar Resultados

        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;

        for (r = 0; r < ListadoResultados.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Texto
            divCol = document.createElement("div");

            if (ListadoResultados.Tipo = "Recurso") {
                divCol.className = "col-md-8"; //para recurso
            } else {
                divCol.className = "col-md-10"; //para actividad
            }




            span = document.createElement("span");
            span.className = "form-control";

            if (ListadoResultados[r].Tipo == "Recurso") {
                txtSpan = document.createTextNode(ListadoResultados[r].Datos.Recurso);
            } else {
                txtSpan = document.createTextNode(ListadoResultados[r].Datos.Actvidad);
            }


            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-2";

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block" //Cambiar

            txtBtn = document.createTextNode("Ver");
            BtnVerD.appendChild(txtBtn);
            ObjectString = JSON.stringify(ListadoResultados[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var ListadoResultados = JSON.parse(ev.target.value);



                if (ListadoResultados.Tipo == "Recurso") {


                    $rootScope.Id_Recurso = ListadoResultados.Datos.IdRecurso;
                    window.location.href = "#!VerRecursoP";
                } else {

                    $rootScope.Id_Actividad = ListadoResultados.Datos.IdActividad;
                    window.location.href = "#!VerActividadP";
                }



            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);

            if (ListadoResultados[r].Tipo == "Recurso") {
                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block" //Cambiar

                txtBtn = document.createTextNode("Remover");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(ListadoResultados[r]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var ListadoResultados = JSON.parse(ev.target.value);

                    //Form Oculto
                    document.getElementById("IdRecursoO").setAttribute("value", ListadoResultados.Datos.IdRecurso);
                    document.getElementById("Operation2").setAttribute("value", "7");
                    //Ajax
                    var datos = JSON.parse(ajax("form#Oculto1"));









                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
            }


            divPrincipalR.appendChild(divRow);

        }
        //colocar Alumnos

        var divPrincipalR = document.getElementById("resultados3");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var spanOnline;
        var txtSpanOnline;

        console.log(ListadoResultados);

        for (r = 0; r < ListaAlumnos.length; r++) {
            for (c = 0; c < ListaAlumnos[r].length; c++) {
                divRow = document.createElement("div");
                divRow.className = "row form-group";

                //Span Online
                divCol = document.createElement("div");
                divCol.className = "col-md-2"; //completar

                spanOnline = document.createElement("span");
                if (ListaAlumnos[r][c].OnlineAl) {
                    spanOnline.className = "badge-pill badge-success";
                    txtSpanOnline = document.createTextNode("Online");
                } else {
                    spanOnline.className = "badge-pill badge-danger";
                    txtSpanOnline = document.createTextNode("Offline");
                }
                spanOnline.appendChild(txtSpanOnline);
                divCol.appendChild(spanOnline);


                divRow.appendChild(divCol);

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-10"; //completar

                span = document.createElement("span");
                //span.className="form-control";

                txtSpan = document.createTextNode(ListaAlumnos[r][c].Nombre);
                span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);

                //boton

                divPrincipalR.appendChild(divRow);
            }
        }


    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("VerRecursoPC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerRecursoP') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto
        document.getElementById("IdARecurso").setAttribute("value", $rootScope.Id_Recurso);
        document.getElementById("Operation").setAttribute("value", "6");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];


        document.getElementById("Descripcion").setAttribute("value", datos.Descripcion);
        //document.getElementById("NombreRecurso").setAttribute("value", datos.NombreArchivo);
        //document.getElementById("Fecha").setAttribute("value", datos.Fecha);


        if (datos.TipoArchivo == "pdf") {
            document.getElementById("IframeRecurso").setAttribute("data", datos.Contenido);
        }
        document.getElementById("doc_link").setAttribute("download", datos.NombreArchivo);
        document.getElementById("doc_link").setAttribute("href", datos.Contenido);


    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("VerActividadPC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerActividadP') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("IdActividad").setAttribute("value", $rootScope.Id_Actividad);
        document.getElementById("Operation").setAttribute("value", "8_1");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0][0];
        console.log(datos);

        document.getElementById("NombreActividad").setAttribute("value", datos.NombreActivdad);
        document.getElementById("DescripcionActividad").setAttribute("value", datos.DescripcionActividad);
        //document.getElementById("FechaAsignacion").setAttribute("value", datos.FechaAsignacion);
        document.getElementById("FechaInicio").setAttribute("value", datos.FechaInicio);
        document.getElementById("FechaFin").setAttribute("value", datos.FechaFin);
        if(datos.Tipo == 'T'){
            document.getElementById("Tipo").setAttribute("value", "Tarea");
        }else{
            document.getElementById("Tipo").setAttribute("value", "Examen");
        }
        document.getElementById("NumeroActRealizadas").setAttribute("value", datos.NumeroActRealizadas);
        document.getElementById("NumeroActCalificadas").setAttribute("value", datos.NumeroActCalificadas);
        document.getElementById("NumeroActPendientes").setAttribute("value", datos.NumeroActPendientes);


        document.getElementById("Operation").setAttribute("value", "8_2");
        //Ajax
        var datos11 = JSON.parse(ajax("form#Oculto"));
        var datos2 = datos11[0];


        var divPrincipalR = document.getElementById("DivResultados");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var ObjectString;


        for (r = 0; r < datos2.length; r++) {

            divRow = document.createElement("div");
            divRow.className = "row form-group";

            //Matricula
            divCol = document.createElement("div");
            divCol.className = "col-md-1 d-flex justify-content-center"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos2[r].IdAlumno);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //Texto
            divCol = document.createElement("div");
            divCol.className = "col-md-4 d-flex justify-content-center"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            txtSpan = document.createTextNode(datos2[r].Nombre);
            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);


            //TCalificación
            divCol = document.createElement("div");
            divCol.className = "col-md-1 d-flex justify-content-center"; //completar

            span = document.createElement("span");
            span.className = "form-control";

            if (datos2[r].Calificacion != null) {
                txtSpan = document.createTextNode(datos2[r].Calificacion);
            } else {
                txtSpan = document.createTextNode("Sin calificar");
            }


            span.appendChild(txtSpan);
            divCol.appendChild(span);
            divRow.appendChild(divCol);


            //Comentarios
            divCol = document.createElement("div");
            divCol.className = "col-md-5 d-flex justify-content-center"; //completar

            span = document.createElement("input");
            span.setAttribute("type", "text");
            span.setAttribute("readonly", true);
            span.className = "form-control";

            if (datos2[r].Comentarios != null) {
                span.setAttribute("value", datos2[r].Comentarios);
            } else {
                span.setAttribute("value", "Sin Comentarios");
            }



            divCol.appendChild(span);
            divRow.appendChild(divCol);

            //boton
            divCol = document.createElement("div");
            divCol.className = "col-md-1 d-flex justify-content-center"; //completar

            BtnVerD = document.createElement("button");
            BtnVerD.className = "btn btn-success btn-block btn-sm" //Cambiar

            txtBtn = document.createTextNode("Calificar");
            BtnVerD.appendChild(txtBtn);
            console.log(datos2[r].Calificacion != null);
            if (datos2[r].Calificacion != null) {
                BtnVerD.setAttribute("disabled", true);
            } else {
                BtnVerD.disabled = false;
            }
            ObjectString = JSON.stringify(datos2[r]);
            BtnVerD.setAttribute("value", ObjectString);
            BtnVerD.addEventListener("click", function (ev) {
                var datos = JSON.parse(ev.target.value);


                $rootScope.Id_Alumno = datos.IdAlumno;
                window.location.href = "#!Calificar"; //completar

            });
            divCol.appendChild(BtnVerD);
            divRow.appendChild(divCol);
            divPrincipalR.appendChild(divRow);

        }



    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("CalificarC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/Calificar') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();
        //Form Oculto
        document.getElementById("IdActividad").setAttribute("value", $rootScope.Id_Actividad);
        document.getElementById("IdAlumno").setAttribute("value", $rootScope.Id_Alumno);
        document.getElementById("Operation").setAttribute("value", "9");
        //Ajax
        var datos2 = JSON.parse(ajax("form#Oculto"));
        var datos = datos2[0][0];

        //document.getElementById("NombreActividad").setAttribute("value", datos.NombreActividad);
        document.getElementById("NombreAlumno").setAttribute("value", datos.NombreAlumno);
        document.getElementById("FechaSubida").setAttribute("value", datos.FechaSubida);
        document.getElementById("NombreArchivo").setAttribute("value", datos.NombreArchivo);

        document.getElementById("Operation").setAttribute("value", "10");
        var datos3 = JSON.parse(ajax("form#Oculto")); //eliminar o modificar operacion
        var datos1 = datos3[0][0];

        document.getElementById("LinkDescarga").setAttribute("donwload", datos1.NomreArchivo);
        document.getElementById("LinkDescarga").setAttribute("href", datos1.Archivo);
        document.getElementById("LinkDescarga").setAttribute("target", "_blank");




        document.getElementById("btn_calif").addEventListener("click", function () {
            //meter dentro del listener del boton guardar calificacion btn_calif
            document.getElementById("IdActividad1").setAttribute("value", $rootScope.Id_Actividad);
            document.getElementById("IdAlumno1").setAttribute("value", $rootScope.Id_Alumno);
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("Fecha").setAttribute("value", date);
            document.getElementById("Operation1").setAttribute("value", "11");
            //Ajax
            var datos = JSON.parse(ajax("form#Principal"));
            window.location.href = "#!VerActividadP";
        });



    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }


});

app.controller("AgregarActividadC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AgregarActividad') {
            setListeners();
        }
    });

    setListeners = function () {



        document.getElementById("BtnAgregar").addEventListener("click", function () {
            //Form Principal
            document.getElementById("IdCurso").setAttribute("value", sessionStorage.getItem("IdCurso"));
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("FechaAsignacion").setAttribute("value", date);
            document.getElementById("Operation").setAttribute("value", "12");
            //Ajax
            var datos = JSON.parse(ajax("form#Principal"));
            window.location.href = "#!VerCurso";
        });


    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("AgregarRecursoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/AgregarRecurso') {
            setListeners();
        }
    });
    setListeners = function () {
        console.clear();
        document.getElementById("BtnSubir").addEventListener("click", function () {
            //Form Principal
            document.getElementById("IdCurso").setAttribute("value", sessionStorage.getItem("IdCurso"));
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("Fecha").setAttribute("value", date);
            document.getElementById("Operation").setAttribute("value", "13");
            //Ajax
            var datos = JSON.parse(ajax("form#Principal"));
            window.location.href = "#!VerCurso";
        });
    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }
});

app.controller("FinCursoC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/FinCurso') {
            setListeners();
        }
    });

    setListeners = function () {
        console.clear();

        console.log("Hola");
        //Form Oculto
        document.getElementById("IdCurso").setAttribute("value", sessionStorage.getItem("IdCurso"));
        document.getElementById("Operation").setAttribute("value", "14");
        //Ajax
        var datos1 = JSON.parse(ajax("form#Oculto"));
        // console.log(datos[0][0]);

        var datos = datos1[0];
        console.log(datos);


        var nameTemporal = "";
        var numActividades = 0;
        var numAlumnos = 0;
        var numAlumnosTemp = 0;

        
        
        
        for (i = 0; i < datos.length; i++) {
            //numAlumnos++;
            
            if (datos[i].NombreActividad != nameTemporal) {
                numActividades++;
                numAlumnosTemp = numAlumnos;
                console.log(numAlumnos);
                nameTemporal = datos[i].NombreActividad;
                numAlumnos = 0;
            }
            
            numAlumnos++;
            //console.log(numAlumnos);
            if(numActividades<=1){
                numAlumnosTemp=numAlumnos;
            }


        }

        console.log("Numero de Alumno: " + numAlumnosTemp + " Numero de Actividades: " + numActividades);

        var tr = document.getElementById("resultados1");
        var td;
        var txtTd;
        var IndexFinal = (numActividades * (numAlumnos - 1));
        /*
        for(i=0;i<=IndexFinal;i+numAlumnos){
            td=document.createElement("th");
            txtTd=document.createTextNode(datos[i].NombreActividad);
            td.appendChild(txtTd);
            tr.appendChild(td);
        }
        td=document.createElement("th");
        txtTd=document.createTextNode("Calificación");
        td.appendChild(txtTd);
        tr.appendChild(td);
        */

        var cont = 0;
        for (i = 1; i <= numActividades; i++) {
            td = document.createElement("th");
            console.log(datos[cont].NombreActividad);
            txtTd = document.createTextNode(datos[cont].NombreActividad);
            td.appendChild(txtTd);
            tr.appendChild(td);
            cont = cont + numAlumnosTemp;

        }

        td = document.createElement("th");
        txtTd = document.createTextNode("Calificación");
        td.appendChild(txtTd);
        tr.appendChild(td);

        var divR = document.getElementById("resultados2");

        var trA;
        var tdA;
        var txtTd;
        var inputC;


        var arrayAlumnos = new Array();

        var obj;
        var cont1 = 0;
        var cont2 = 0;

        for (i = 0; i < numAlumnosTemp; i++) {
            trA = document.createElement("tr");
            tdA = document.createElement("td");
            txtTd = document.createTextNode(datos[cont1].IdAlumno);
            tdA.appendChild(txtTd);
            trA.appendChild(tdA);

            tdA = document.createElement("td");
            txtTd = document.createTextNode(datos[cont1].Nombre);
            tdA.appendChild(txtTd);
            trA.appendChild(tdA);


            for (n = 0; n < numActividades; n++) {

                tdA = document.createElement("td");
                if (datos[cont2].Calificacion != null) {
                    txtTd = document.createTextNode(datos[cont2].Calificacion);
                } else {
                    txtTd = document.createTextNode("");
                }
                tdA.appendChild(txtTd);
                trA.appendChild(tdA);
                cont2 = cont2 + numAlumnosTemp;



            }

            tdA = document.createElement("td");
            inputC = document.createElement("input");
            inputC.setAttribute("type", "number");
            inputC.setAttribute("id", datos[cont1].IdAlumno);
            inputC.className = "border-0";
            tdA.appendChild(inputC);

            trA.appendChild(tdA);


            obj = {
                Id: datos[cont1].IdAlumno,
                Calificacion: 0,
                Estado: "F"
            };
            arrayAlumnos.push(obj);
            cont1++;
            cont2 = cont1;
            divR.appendChild(trA);
            console.log(divR);

        }




        document.getElementById("SaveEnd").addEventListener("click", function () {

            document.getElementById("IdCursoP").setAttribute("value", sessionStorage.getItem("IdCurso"));
            document.getElementById("OperationP").setAttribute("value", "15");


            for (i = 0; i < arrayAlumnos.length; i++) {

                arrayAlumnos[i].Calificacion = document.getElementById(arrayAlumnos[i].Id).value;

            }

            var ListaAlumnos = JSON.stringify(arrayAlumnos);
            console.log(JSON.parse(ListaAlumnos));



            ajaxGL("form#Principal", ListaAlumnos);


            window.location.href="#!index_Profesor";



        });









    }

    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    ajaxGL = function (formulario, arrayA) {
        var respuesta1;
        waitingForData = true;
        // //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        formData.append("ListadeAlumnosInscritosalcurso", arrayA);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("ForoPC", function ($rootScope, $location, $scope) {

    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/ForoP') {
            setListeners();
        }
    });



    setListeners = function () {

        //Form Oculto

        document.getElementById("IdCursoO").setAttribute("value", sessionStorage.getItem("IdCurso"));


        //Form Oculto1
        document.getElementById("IdProfesorO1").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdCursoO1").setAttribute("value", sessionStorage.getItem("IdCurso"));


        //Form Principal

        document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdCurso").setAttribute("value", sessionStorage.getItem("IdCurso"));
        //document.getElementById("DeAlumno").setAttribute("value", false);


        Inicio();

        document.getElementById("InicioTab").addEventListener("click", function () {
            Inicio();
        });
        document.getElementById("MisPublicacionesTab").addEventListener("click", function () {
            MisPublicaciones();
        });





        document.getElementById("PublicarBtn").addEventListener("click", function () {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
            document.getElementById("FechaPubli").setAttribute("value", date);
            document.getElementById("Operation").setAttribute("value", "18");

            //Ajax


            ajax("form#Principal");
            document.getElementById("InputP").setAttribute("value", "");
            MisPublicaciones();
        })
    }

    Inicio = function () {
        console.clear();
        //Form Oculto
        document.getElementById("OperationO").setAttribute("value", "16");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];

        console.log(datos);

        var divPrincipalR = document.getElementById("resultados1");

        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var smallAutor;
        var txtSmallAutor;

        var divTodos = document.createElement("div");
        divTodos.setAttribute("id", "Todos");

        if (datos != 5 && datos1 != 5) {
            for (r = 0; r < datos.length; r++) {

                divRow = document.createElement("div");
                divRow.className = "row";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-9";

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r].Publicacion);
                span.appendChild(txtSpan);
                divCol.appendChild(span);

                smallAutor = document.createElement("small");
                smallAutor.className = "form-text text-muted";
                txtSmallAutor = document.createTextNode("Autor: " + datos[r].Autor + "\t\tFecha: " + datos[r].Fecha);
                smallAutor.appendChild(txtSmallAutor);
                divCol.appendChild(smallAutor);

                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-3";

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block"

                txtBtn = document.createTextNode("Ver Detalles");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(datos[r]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Publicacion = datos.IdPublicacionForo;
                    window.location.href = "#!VerPublicacionP";

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divTodos.appendChild(divRow);



            }

            if (divPrincipalR.hasChildNodes()) {
                if (document.body.contains(document.getElementById("Todos"))) {
                    document.getElementById("Todos").remove();
                }
                divPrincipalR.appendChild(divTodos);

            } else {
                divPrincipalR.appendChild(divTodos);
            }

        }





    }

    MisPublicaciones = function () {
        //Form Oculto 1
        document.getElementById("OperationO1").setAttribute("value", "17");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto1"));
        var datos = datos1[0];

        var divPrincipalR = document.getElementById("resultados2");
        var divRow;
        var divCol;
        var span;
        var txtSpan;
        var BtnVerD;
        var txtBtn;
        var smallAutor;
        var txtSmallAutor;
        var divTodos = document.createElement("div");
        divTodos.setAttribute("id", "MisPublicaciones");

        if (datos != 5 && datos1 != 5) {

            for (r = 0; r < datos.length; r++) {

                divRow = document.createElement("div");
                divRow.className = "row";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-9";

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r].Publicacion);
                span.appendChild(txtSpan);
                divCol.appendChild(span);

                smallAutor = document.createElement("small");
                smallAutor.className = "form-text text-muted";
                txtSmallAutor = document.createTextNode("Fecha: " + datos[r].Fecha);
                smallAutor.appendChild(txtSmallAutor);
                divCol.appendChild(smallAutor);

                divRow.appendChild(divCol);

                //boton
                divCol = document.createElement("div");
                divCol.className = "col-md-3";

                BtnVerD = document.createElement("button");
                BtnVerD.className = "btn btn-success btn-block"

                txtBtn = document.createTextNode("Ver Detalles");
                BtnVerD.appendChild(txtBtn);
                ObjectString = JSON.stringify(datos[r]);
                BtnVerD.setAttribute("value", ObjectString);
                BtnVerD.addEventListener("click", function (ev) {
                    var datos = JSON.parse(ev.target.value);

                    $rootScope.Id_Publicacion = datos.IdPublicacionForo;
                    window.location.href = "#!VerPublicacionP";

                });
                divCol.appendChild(BtnVerD);
                divRow.appendChild(divCol);
                divTodos.appendChild(divRow);



            }

            if (divPrincipalR.hasChildNodes()) {
                if (document.body.contains(document.getElementById("MisPublicaciones"))) {
                    document.getElementById("MisPublicaciones").remove();
                }
                divPrincipalR.appendChild(divTodos);

            } else {
                divPrincipalR.appendChild(divTodos);
            }



        }





    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }








});

app.controller("VerPublicacionPC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerPublicacionP') {
            setListeners();
        }
    });

    setListeners = function () {
        actualizar();

        document.getElementById("btnPublicar").addEventListener("click", function () {
            document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
            document.getElementById("IdPublicacion").setAttribute("value", $rootScope.Id_Publicacion);
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();

            document.getElementById("Fecha").setAttribute("value", date);


            /* var fecha=new Date();
             document.getElementById("Fecha",fecha);*/

            document.getElementById("Operation").setAttribute("value", "20");

            //Ajax

            ajax("form#Principal");
            actualizar();
            document.getElementById("Respuesta").setAttribute("value", "");

        });






    }

    actualizar = function () {
        console.clear();
        document.getElementById("IdProfesorO").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("IdPublicacionO").setAttribute("value", $rootScope.Id_Publicacion);




        document.getElementById("OperationO").setAttribute("value", "19");

        //Ajax

        var datos1 = JSON.parse(ajax("form#Oculto"));
        var datos = datos1[0];
        console.log(datos);

        document.getElementById("Publicacion").setAttribute("value", datos[0].Publicacion);
        document.getElementById("AutorFecha").childNodes[0].nodeValue = "Autor: " + datos[0].AutorPublicacion + "\t\tFecha: " + datos[0].FechaPublicacion;

        if (datos[0].Respuesta != null) {

            var divPrincipalR = document.getElementById("resultados");
            var divTemporal
            var divRow;
            var divCol;
            var span;
            var txtSpan;
            var smallAutor;
            var txtSmallAutor;

            divTemporal = document.createElement("div");
            divTemporal.setAttribute("id", "DivTemporal");
            for (r = 0; r < datos.length; r++) {

                divRow = document.createElement("div");
                divRow.className = "row";

                //Texto
                divCol = document.createElement("div");
                divCol.className = "col-md-1"; //completar

                span = document.createElement("span");
                span.className = "text-success";

                // txtSpan=document.createTextNode(datos[r][c].Grupo);
                //span.appendChild(txtSpan);
                divCol.appendChild(span);
                divRow.appendChild(divCol);


                divCol = document.createElement("div");
                divCol.className = "col-md-11"; //completar

                span = document.createElement("span");
                span.className = "form-control";

                txtSpan = document.createTextNode(datos[r].Respuesta);
                span.appendChild(txtSpan);
                divCol.appendChild(span);

                smallAutor = document.createElement("small");
                smallAutor.className = "form-text text-muted";
                txtSmallAutor = document.createTextNode("Autor: " + datos[r].AutorRespuesta + "\t\tFecha: " + datos[r].FechaRespuesta);
                smallAutor.appendChild(txtSmallAutor);
                divCol.appendChild(smallAutor);

                divRow.appendChild(divCol);









                divTemporal.appendChild(divRow);


            }


            if (divPrincipalR.hasChildNodes()) {
                if (document.body.contains(document.getElementById("DivTemporal"))) {
                    document.getElementById("DivTemporal").remove();
                }
                divPrincipalR.appendChild(divTemporal);


            } else {
                divPrincipalR.appendChild(divTemporal);
            }
        }









    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        ////event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});

app.controller("VerPerfilAlumnoPC", function ($rootScope, $location, $scope) {
    $scope.$on('$routeChangeSuccess', function () {
        if ($location.path() == '/VerPerfilAlumnoP') {
            setListeners();
        }
    });

    setListeners = function () {
        //Form Oculto
        document.getElementById("IdAlumno").setAttribute("value", $rootScope.Id_Alumno);
        document.getElementById("IdProfesor").setAttribute("value", localStorage.getItem("IdUsuario"));
        document.getElementById("Operation").setAttribute("value", "22");

        //Ajax

        var datos = JSON.parse(ajax("form#Oculto"));



        document.getElementById("NombreArea").setAttribute("value", datos.AreaConocimiento);
        document.getElementById("Posgrado").setAttribute("value", datos.Posgrado);
        document.getElementById("LineaInvestigacion").setAttribute("value", datos.LineaInvestigacion);
        document.getElementById("Tema").setAttribute("value", datos.Tema);
        document.getElementById("NombreAlumno").setAttribute("value", datos.NombreAlumno);
        document.getElementById("ApellidosAlumno").setAttribute("value", datos.ApellidosAlumno);

        var Telefono = document.getElementById("Telefono")
        Telefono.setAttribute("value", datos.Telefono);
        document.getElementById("Correo").setAttribute("value", datos.Correo);

        document.getElementById("Foto").setAttribute("src", datos.Foto);









    }
    ajax = function (formulario) {
        var respuesta1;
        waitingForData = true;
        //event.preventDefault();
        var formData = new FormData($(formulario)[0]);
        $.ajax({
            url: 'profesor',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                Errores(respuesta);
                respuesta1 = respuesta;


            }
        });
        return respuesta1;
    }
    Errores = function (error) {

        switch (error) {
            case "1":
                alert("Usuario/Contraseña incorrectos");
                break;

            case "2":
                console.log("Fallo al Conectar BD Local");
                break;
            case "3":
                alert("Fallo al conectar BD remota");
                break;
            case "4":
                alert("Error en la BD");
                break;
            case "5":
                //alert("Consulta regresa conjunto Vacio");
                break;
            case "6":
                alert("Falló al ejecutar consulta");
                break;
            case "7":
                alert("Sesión Expiro");
                break;
            case "8":
                alert("Faltan Datos en el Formulario");
                break;
            case "9":
                alert("Datos Invalidos en formularo");
                break;
            case "10":
                alert("Operación denegada");
                break;
            case "11":
                alert("Formulario Invalido");
                break;
            case "12":
                alert("Archivo en Formulario es demasiado grande");
                break;
            case "255":
                alert("¡Error!");
                break;

            default:
                return error;
                break;
        }
        return "Error";



    }

});
//End Profesor Controller
