import { paymentMethods, storeConfig } from "@/config/store";

export type PaymentMethodId = typeof paymentMethods[number]["id"];

export function calculateOrder(subtotalUSD: number, paymentMethodId: PaymentMethodId, bcvRate = storeConfig.bcvRate) {
  const method = paymentMethods.find((item) => item.id === paymentMethodId);
  if (!method || !method.enabled) throw new Error("Método de pago no disponible.");

  // La elegibilidad legal del IGTF debe verificarse y configurarse antes de producción.
  const igtfUSD = method.appliesIGTF ? roundMoney(subtotalUSD * storeConfig.igtfRate) : 0;
  const totalUSD = roundMoney(subtotalUSD + igtfUSD);

  return {
    subtotalUSD: roundMoney(subtotalUSD),
    igtfUSD,
    totalUSD,
    totalBsD: bcvRate > 0 ? roundMoney(totalUSD * bcvRate) : null,
    bcvRateSnapshot: bcvRate,
    bcvUpdatedAtSnapshot: storeConfig.bcvUpdatedAt
  };
}

export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

export function formatBsD(value: number | null) {
  if (value === null) return "Tasa BCV por configurar";
  return new Intl.NumberFormat("es-VE", { style: "decimal", maximumFractionDigits: 2 }).format(value) + " BsD";
}
