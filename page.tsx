"use client";

import { useMemo, useState } from "react";
import { formatUSD, formatBsD } from "@/lib/pricing";
import { storeConfig } from "@/config/store";

type Product = {
  id: number; name: string; category: string; finish: string;
  price: number; oldPrice?: number; description: string; image: string; stock: number;
};

const products: Product[] = [
  { id: 1, name: "Set Aurora", category: "Sets", finish: "Baño dorado", price: 28, oldPrice: 35, description: "Un conjunto delicado para elevar un look diario o una ocasión especial.", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85", stock: 8 },
  { id: 2, name: "Collar Esencial", category: "Collares", finish: "Dorado", price: 18, description: "Una cadena fina y versátil, fácil de combinar y llevar en capas.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85", stock: 12 },
  { id: 3, name: "Aros Línea", category: "Aretes", finish: "Dorado", price: 14, description: "Aros de silueta limpia con presencia sutil.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85", stock: 10 },
  { id: 4, name: "Anillo Nacar", category: "Anillos", finish: "Dorado", price: 22, description: "Una pieza protagonista con acabado luminoso.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85", stock: 5 },
  { id: 5, name: "Pulsera Alba", category: "Pulseras", finish: "Dorado", price: 16, description: "Un detalle ligero para usar solo o acompañado.", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85", stock: 9 },
  { id: 6, name: "Set Perla", category: "Sets", finish: "Dorado y perla", price: 32, description: "Textura perlada y líneas delicadas para ocasiones especiales.", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85", stock: 4 }
];

const categories = ["Todos", "Sets", "Collares", "Anillos", "Aretes", "Pulseras"];

export default function Home() {
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = products.filter((p) => category === "Todos" || p.category === category);
  const cartItems = useMemo(() => products.filter((p) => cart[p.id]).map((p) => ({ ...p, quantity: cart[p.id] })), [cart]);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  function add(product: Product) {
    setCart((current) => ({ ...current, [product.id]: Math.min((current[product.id] || 0) + 1, product.stock) }));
    setCartOpen(true);
  }

  function whatsappOrder() {
    const number = storeConfig.whatsappNumber;
    const lines = cartItems.map((p) => `${p.quantity} x ${p.name} — ${formatUSD(p.price * p.quantity)}`).join("\n");
    const message = `Hola, quiero consultar este pedido de ${storeConfig.name}:\n${lines}\nSubtotal: ${formatUSD(subtotal)}\n¿Me indican disponibilidad, envío y formas de pago?`;
    if (!number) {
      alert("Configura el número de WhatsApp en config/store.ts para activar los pedidos.");
      return;
    }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <div className="announcement">{storeConfig.announcement}</div>
      <header className="header">
        <a className="wordmark" href="#inicio">{storeConfig.name}<span>JOYERÍA</span></a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#coleccion">Colección</a><a href="#nosotros">La marca</a><a href="#contacto">Contacto</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">Bolsa ({itemCount})</button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">PIEZAS PARA TODOS LOS DÍAS</p>
          <h1>Joyería que acompaña<br/><em>tu propia luz.</em></h1>
          <p className="hero-description">Sets, collares, anillos y detalles dorados seleccionados para darle intención a cada look.</p>
          <a className="primary-link" href="#coleccion">Explorar colección <span>↗</span></a>
          <div className="hero-note">COMPRA DIRECTA · ATENCIÓN POR WHATSAPP</div>
        </div>
        <div className="hero-image" role="img" aria-label="Detalle editorial de joyería dorada"/>
      </section>

      <section className="trust-strip" aria-label="Información de compra">
        <span>Atención personalizada</span><span>Confirmación de stock</span><span>Envíos por coordinar</span>
      </section>

      <section className="collection section" id="coleccion">
        <div className="section-heading">
          <div><p className="eyebrow">SELECCIÓN N VERA</p><h2>Encuentra tu pieza.</h2></div>
          <p>Diseños versátiles, detalles que se notan.</p>
        </div>
        <div className="category-list" aria-label="Filtrar por categoría">
          {categories.map((item) => <button key={item} className={category === item ? "category active" : "category"} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="product-grid">
          {visible.map((product) => (
            <article className="product-card" key={product.id}>
              <button className="product-image" onClick={() => setSelected(product)} aria-label={`Ver ${product.name}`}>
                {/* Imágenes demostrativas; sustituir por fotografías reales del inventario. */}
                <img src={product.image} alt={product.name} loading="lazy"/>
                {product.oldPrice && <span className="sale-tag">-20%</span>}
              </button>
              <div className="product-meta"><span>{product.category}</span><span>{product.finish}</span></div>
              <button className="product-name" onClick={() => setSelected(product)}>{product.name}</button>
              <div className="price-row"><strong>{formatUSD(product.price)}</strong>{product.oldPrice && <del>{formatUSD(product.oldPrice)}</del>}</div>
              <button className="add-button" onClick={() => add(product)}>Agregar al carrito</button>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-section" id="nosotros">
        <p className="eyebrow">N VERA SETS</p>
        <h2>El detalle correcto<br/><em>cambia todo.</em></h2>
        <p>Estamos aquí para ayudarte a elegir. Consulta materiales, medidas, disponibilidad y opciones de entrega antes de confirmar tu compra.</p>
      </section>

      <footer id="contacto">
        <div><a className="wordmark footer-mark" href="#inicio">{storeConfig.name}<span>JOYERÍA</span></a><p>Selección de joyería para tu día a día.</p></div>
        <div className="footer-links"><a href="#coleccion">Colección</a><a href="#contacto">Contacto</a><span>Cambios y condiciones: consultar antes de comprar.</span></div>
        <small>© {new Date().getFullYear()} N VERA SETS. Todos los derechos reservados.</small>
      </footer>

      {cartOpen && <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setCartOpen(false); }}>
        <aside className="drawer">
          <div className="drawer-head"><h2>Tu bolsa ({itemCount})</h2><button onClick={() => setCartOpen(false)} aria-label="Cerrar">✕</button></div>
          {cartItems.length === 0 ? <p className="empty">Tu bolsa está vacía.</p> : <>
            <div className="cart-lines">{cartItems.map((p) => <div className="cart-line" key={p.id}>
              <img src={p.image} alt=""/><div className="cart-info"><strong>{p.name}</strong><span>{formatUSD(p.price)}</span><div className="quantity"><button onClick={() => setCart((c) => ({ ...c, [p.id]: Math.max(0, (c[p.id] || 0) - 1) }))}>−</button><span>{p.quantity}</span><button onClick={() => setCart((c) => ({ ...c, [p.id]: Math.min(p.stock, (c[p.id] || 0) + 1) }))}>+</button></div></div>
              <strong>{formatUSD(p.price * p.quantity)}</strong>
            </div>)}</div>
            <div className="cart-total"><span>Subtotal</span><strong>{formatUSD(subtotal)}</strong></div>
            <p className="cart-note">Envío y disponibilidad se confirman antes del pago. La tasa BCV se mostrará cuando sea configurada.</p>
            <p className="bs-total">{formatBsD(storeConfig.bcvRate > 0 ? subtotal * storeConfig.bcvRate : null)}</p>
            <button className="checkout-button" onClick={whatsappOrder}>Consultar y confirmar por WhatsApp</button>
            <button className="continue-button" onClick={() => setCartOpen(false)}>Seguir comprando</button>
          </>}
        </aside>
      </div>}

      {selected && <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        <section className="product-modal">
          <button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar">✕</button>
          <img src={selected.image} alt={selected.name}/>
          <div><p className="eyebrow">{selected.category} · {selected.finish}</p><h2>{selected.name}</h2><strong className="modal-price">{formatUSD(selected.price)}</strong><p>{selected.description}</p><p className="stock">{selected.stock > 0 ? `${selected.stock} unidades de demostración disponibles` : "Agotado"}</p><button className="checkout-button" onClick={() => { add(selected); setSelected(null); }}>Agregar al carrito</button></div>
        </section>
      </div>}

      <div className="mobile-cart"><button onClick={() => setCartOpen(true)}>Ver bolsa · {itemCount} · {formatUSD(subtotal)}</button></div>
    </main>
  );
}
