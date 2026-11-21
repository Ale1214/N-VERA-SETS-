import { NextResponse } from "next/server";

/**
 * Endpoint de demostración.
 * Antes de producción: validar precios y stock desde la base de datos,
 * guardar snapshot BCV/IGTF, proteger contra duplicados y conectar notificaciones.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
    }
    return NextResponse.json({
      status: "pending_validation",
      message: "Estructura recibida. Falta conectar base de datos y validación de pago."
    }, { status: 202 });
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }
}
