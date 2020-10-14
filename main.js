"use strict";

/*    Node constants:   */
const fs = require('fs');
var path   = require("path");
const util = require('util');
const http = require('http');
const https = require('https');
const express = require('express');
var session = require('express-session');
const formidable = require('formidable');
const app = express();
const appHTTP = express();
var mysql = require('mysql');
/*                      */

/*      promises:      */

/*                      */

/*  Users and other source files:  */
const Login = require("./src/usuarios/login.js");
const Admin = require("./src/usuarios/admin.js");
const Alumno = require("./src/usuarios/alumno.js");
const Profesor = require("./src/usuarios/profesor.js");
const Registrador = require("./src/usuarios/registrador.js");
const Errors = require("./src/errors.js");
const InputParser = require("./src/inputParsing.js");
const SQL = require("./src/sqlAccess.js");
const SessionHandler = require('./src/sessionHandler.js');
// this one includes the master server:
const ListCallbackHandler = require("./src/listCallbackHandler.js");
/*                                  */

/*    Certificates:   */
const privateKey  = fs.readFileSync('certificates/hostname.local.key', 'utf8');
const certificate = fs.readFileSync('certificates/hostname.local.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
/*                    */

/*       Servers       */
const httpServer = http.createServer(appHTTP);
const httpsServer = https.createServer(credentials, app);
/*                    */

// Allow access from all the devices of the network (as long as connections are allowed by the firewall)
var LANAccess = "0.0.0.0";
//for http
httpServer.listen(8080, LANAccess);
// For https
httpsServer.listen(8443, LANAccess);

// Redirect all incoming HTTP traffic to the HTTPS version of the site:
appHTTP.get('*', function(req, res) {
    //res.redirect('https://' + req.headers.host + req.url);
    res.redirect('https://localhost:8443/');

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
})

/*      sessions:     */
app.use(session({
  secret: SessionHandler.secret,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
      path: '/',
      httpOnly: false,
      secure: true,
      maxAge: SessionHandler.fortyMinutes,
      sameSite: true,
  }
}));

app.use('/static', express.static('html'));
app.use('/resources', express.static('resources'));

app.use('/', express.static('views'));

app.get('/tests', (req, res) => {
    res.sendFile(path.join(__dirname+'/html/home.html'));
});
app.get('/testLogin', (req, res) => {
    res.sendFile(path.join(__dirname+'/html/login.html'));
});







app.post('/login', (req, res) => {

    console.log("\n**********\nLOGIN");

    Login.processRequest(req, res)
    .then( ( pack ) => {
        //console.log(pack);

        return ListCallbackHandler.dispatchFunctionStack(pack);
    })
    .then( ( value ) => {
        // save the user id and type in the current session:
        console.log("DONE:");
        console.log(value);
    })
    .catch( ( err ) => {
        console.log("ERROR:");
        console.log(err);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(err);
    });

});


app.post('/admin', (req, res) => {

    console.log("\n**********\nADMIN");
    console.log(req.session.IdentificadorSitio);
    console.log(req.session.IdUniversidadSitio);
    console.log(req.session.userType);
    console.log();

    /*
    // validate session duration:
    if (req.session.cookie.expires < Date.now()) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_007);
        return;
    }
    // validate session permissions:
    if (req.session.userType != 'administrador') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_010);
        return;
    }
    */

    // handle the request:
    Admin.processRequest(req, res)
    .then( ( pack ) => {
        return ListCallbackHandler.dispatchFunctionStack(pack);
    })
    .then( ( value ) => {
        console.log("DONE:");
        console.log(value);
    })
    .catch( ( err ) => {
        console.log("ERROR:");
        console.log(err);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(err);
    });

});


app.post('/registrador', (req, res) => {
    console.log("\n**********\nREGISTRADOR");
    console.log(req.session.IdentificadorSitio);
    console.log(req.session.IdUniversidadSitio);
    console.log(req.session.userType);
    console.log();

    /*
    // validate session duration:
    if (req.session.cookie.expires < Date.now()) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_007);
        return;
    }
    // validate session permissions:
    if (req.session.userType != 'registrador') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_010);
        return;
    }
    */

    // handle the request:
    Registrador.processRequest(req, res)
    .then( ( pack ) => {
        return ListCallbackHandler.dispatchFunctionStack(pack);
    })
    .then( ( value ) => {
        console.log("DONE:");
        console.log(value);
    })
    .catch( ( err ) => {
        console.log("ERROR:");
        console.log(err);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(err);
    });
});

app.post('/profesor', (req, res) => {
    console.log("\n**********\nPROFESOR");
    console.log(req.session.IdentificadorSitio);
    console.log(req.session.IdUniversidadSitio);
    console.log(req.session.userType);
    console.log();

    /*
    // validate session duration:
    if (req.session.cookie.expires < Date.now()) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_007);
        return;
    }
    // validate session permissions:
    if (req.session.userType != 'profesor') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_010);
        return;
    }
    */

    // handle the request:
    Profesor.processRequest(req, res)
    .then( ( pack ) => {
        return ListCallbackHandler.dispatchFunctionStack(pack);
    })
    .then( ( value ) => {
        console.log("DONE:");
        console.log(value);
    })
    .catch( ( err ) => {
        console.log("ERROR:");
        console.log(err);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(err);
    });
});

app.post('/alumno', (req, res) => {

    console.log("\n**********\nALUMNO");
    console.log(req.session.IdentificadorSitio);
    console.log(req.session.IdUniversidadSitio);
    console.log(req.session.userType);
    console.log();

    /*
    // validate session duration:
    if (req.session.cookie.expires < Date.now()) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_007);
        return;
    }
    // validate session permissions:
    if (req.session.userType != 'alumno') {
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(Errors.ERR_010);
        return;
    }
    */
    // handle the request:
    Alumno.processRequest(req, res)
    .then( ( pack ) => {
        return ListCallbackHandler.dispatchFunctionStack(pack);
    })
    .then( ( value ) => {
        console.log("DONE:");
        console.log(value);
    })
    .catch( ( err ) => {
        console.log("ERROR:");
        console.log(err);
        res.writeHead(200, { 'content-type': 'text/plain' });
        res.end(err);
    });

});

app.post('/unlogin', (req, res) => {

    console.log("\n**********\nUNLOGIN");
    req.session.IdentificadorSitio = null;
    req.session.IdUniversidadSitio = null;
    req.session.userType = null;
    console.log();
    
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end("0");

});
