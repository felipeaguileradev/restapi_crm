const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");

const productosController = require("../controllers/productoController");

const pedidosController = require("../controllers/pedidosController");

const usuarioController = require("../controllers/usuarioController");

// middle para proteger las rutas
const auth = require("../middlewares/auth");

module.exports = function () {
  // CLIENTES
  // Agrega nuevos clientes via POST
  router.post("/clientes", auth, clienteController.nuevoCliente);

  // Obtener todos los clientes
  router.get("/clientes", auth, clienteController.mostrarClientes);

  // mostrar un cliente en especifico
  router.get("/clientes/:idCliente", auth, clienteController.mostrarCliente);

  // Actualizar Cliente
  router.put("/clientes/:idCliente", auth, clienteController.actualizarCliente);

  // Eliminar Cliente
  router.delete(
    "/clientes/:idCliente",
    auth,
    clienteController.eliminarCliente
  );

  // ********* PRODUCTOS
  // Agrega nuevos productos via POST
  router.post(
    "/productos",
    auth,
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // Obtener todos los productos
  router.get("/productos", auth, productosController.mostrarProductos);

  // mostrar un producto en especifico
  router.get(
    "/productos/:idProducto",
    auth,
    productosController.mostrarProducto
  );

  // // Actualizar producto
  router.put(
    "/productos/:idProducto",
    auth,
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  // // Eliminar Cliente
  router.delete(
    "/productos/:idProducto",
    auth,
    productosController.eliminarProducto
  );

  // busqueda de productos
  router.post(
    "/productos/busqueda/:query",
    auth,
    productosController.buscarProducto
  );

  // ******* PEDIDOS
  // agregar nuevos pedidos
  router.post("/pedidos/nuevo/:idUsuario", auth, pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", auth, pedidosController.mostrarPedidos);

  // mostrar un pedido por su ID
  router.get("/pedidos/:idPedido", auth, pedidosController.mostrarPedido);

  // actualizar pedido
  router.put("/pedidos/:idPedido", auth, pedidosController.actualizarPedido);

  // Elimina un pedido
  router.delete("/pedidos/:idPedido", auth, pedidosController.eliminarPedido);

  //*******  USUARIOS
  router.post("/crear-cuenta", auth, usuarioController.registrarUsuario);

  router.post("/iniciar-sesion", usuarioController.autenticarUsuario);

  return router;
};
