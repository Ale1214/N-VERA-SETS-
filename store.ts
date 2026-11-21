/**
 * Configuración editable de la tienda.
 * Cambia estos valores mientras se construye el panel administrativo.
 * La tasa se deja en cero para evitar mostrar una conversión BCV inventada.
 */
export const storeConfig = {
  name: "N VERA SETS",
  whatsappNumber: "", // Formato internacional sin +, por ejemplo 58412XXXXXXX
  currency: "USD",
  bcvRate: 0,
  bcvUpdatedAt: "",
  igtfRate: 0.03,
  freeShippingFromUSD: 0,
  announcement: "JOYERÍA PARA ACOMPAÑAR TU ESTILO",
  contactEmail: "",
  instagram: ""
};

export const paymentMethods = [
  { id: "pago-movil", label: "Pago móvil", enabled: true, appliesIGTF: false, instructions: "Datos bancarios disponibles al confirmar el pedido." },
  { id: "transferencia", label: "Transferencia nacional", enabled: true, appliesIGTF: false, instructions: "Datos bancarios disponibles al confirmar el pedido." },
  { id: "zelle", label: "Zelle", enabled: false, appliesIGTF: true, instructions: "Configurar datos de recepción antes de habilitar." },
  { id: "usdt", label: "USDT / Binance Pay", enabled: false, appliesIGTF: false, instructions: "Configurar red, dirección y condiciones antes de habilitar." },
  { id: "efectivo-usd", label: "Efectivo en divisas", enabled: false, appliesIGTF: true, instructions: "Confirmar condiciones y aplicación legal del IGTF." }
] as const;
