# N VERA SETS — tienda base

Base inicial de e-commerce para joyería, construida con Next.js + TypeScript.

## Incluye
- Portada editorial responsive, priorizada para móvil.
- Catálogo de ejemplo con filtros por categoría.
- Detalle de producto, carrito y cantidades.
- Barra de bolsa fija en móvil.
- Inicio de pedido por WhatsApp (requiere configurar el número).
- Configuración centralizada de tienda y métodos de pago.
- Funciones base para USD, BsD e IGTF.
- Endpoint de demostración para recibir checkout.

## Requisitos
- Node.js 20.9 o superior.
- npm.

## Ejecutar
```bash
npm install
npm run dev
```
Abrir http://localhost:3000

## Primeros cambios
1. Editar `config/store.ts`.
2. Configurar `whatsappNumber` con el número comercial internacional, sin `+`.
3. Configurar la tasa BCV y fecha solo después de verificar el valor oficial.
4. Sustituir las fotos y productos de demostración por inventario real.
5. Revisar la aplicabilidad legal del IGTF para cada método antes de habilitarlo.

## Pendiente antes de vender en producción
- Supabase: base de datos, autenticación de administradores y almacenamiento de imágenes.
- API de pedidos que calcule precios y stock exclusivamente en servidor.
- Congelar tasa BCV, desglose de impuestos y precios al crear pedido.
- Validación de comprobantes y conciliación de pagos.
- Configurar proveedores de pago y credenciales como variables de entorno.
- Cotización de envíos, estados de despacho y políticas legales.
- Pruebas de seguridad, accesibilidad, rendimiento y compras reales.

Los productos, precios, imágenes, disponibilidad, medios de pago y tasas de este proyecto son demostrativos. No representan inventario ni condiciones comerciales confirmadas.
