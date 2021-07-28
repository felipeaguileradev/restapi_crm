const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");

const productosController = require("../controllers/productoController");

const pedidosController = require("../controllers/pedidosController");

module.exports = function () {
  // CLIENTES
  // Agrega nuevos clientes via POST
  router.post("/clientes", clienteController.nuevoCliente);

  // Obtener todos los clientes
  router.get("/clientes", clienteController.mostrarClientes);

  // mostrar un cliente en especifico
  router.get("/clientes/:idCliente", clienteController.mostrarCliente);

  // Actualizar Cliente
  router.put("/clientes/:idCliente", clienteController.actualizarCliente);

  // Eliminar Cliente
  router.delete("/clientes/:idCliente", clienteController.eliminarCliente);

  // PRODUCTOS
  // Agrega nuevos productos via POST
  router.post(
    "/productos",
    productosController.subirArchivo,
    productosController.nuevoProducto
  );

  // Obtener todos los productos
  router.get("/productos", productosController.mostrarProductos);

  // mostrar un producto en especifico
  router.get("/productos/:idProducto", productosController.mostrarProducto);

  // // Actualizar producto
  router.put(
    "/productos/:idProducto",
    productosController.subirArchivo,
    productosController.actualizarProducto
  );

  // // Eliminar Cliente
  router.delete("/productos/:idProducto", productosController.eliminarProducto);

  // PEDIDOS
  // agregar nuevos pedidos
  router.post("/pedidos", pedidosController.nuevoPedido);

  // mostrar todos los pedidos
  router.get("/pedidos", pedidosController.mostrarPedidos);

  // mostrar un pedido por su ID
  router.get("/pedidos/:idPedido", pedidosController.mostrarPedido);

  // actualizar pedido
  router.put("/pedidos/:idPedido", pedidosController.actualizarPedido);

  // Elimina un pedido
  router.delete("/pedidos/:idPedido", pedidosController.eliminarPedido);

  return router;
};
