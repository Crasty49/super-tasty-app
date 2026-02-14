import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Menu from "./pages/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import logo from "./assets/SuoerTastyBoneless.jpeg";
import PromoSlider from "./components/PromoSlider";
import SuccessModal from "./components/SuccessModal";
import TicketModal from "./components/TicketModal";

export default function App() {

  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [flyAnim, setFlyAnim] = useState(null);
  const cartRef = useRef();
  const [successOpen, setSuccessOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState([]);
  const [lastTotal, setLastTotal] = useState(0);

  // 🔥 HORARIO
  const now = new Date();
  const day = now.getDay(); // 0 = domingo, 6 = sábado
  const hour = now.getHours();

  const isOpen =
    (day === 6 || day === 0) &&
    hour >= 10 &&
    hour < 20;

  const addToCart = (item, originRect) => {

    if (!originRect) {
      setCart(prev => [...prev, item]);
      return;
    }

    const cartRect = cartRef.current.getBoundingClientRect();

    setFlyAnim({
      start: originRect,
      end: cartRect
    });

    setTimeout(() => {
      setCart(prev => [...prev, item]);
      setFlyAnim(null);
    }, 600);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 text-white">

      {/* HEADER */}
      <div className="backdrop-blur-md bg-white/5 border-b border-white/10 p-6 shadow-xl">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <img src={logo} className="w-16 h-16 rounded-xl shadow-lg" />
          <h1 className="text-2xl font-bold">
            Super Tasty Boneless
          </h1>
        </div>
      </div>

      {/* AVISO SI ESTÁ CERRADO */}
      {!isOpen && (
        <div className="
          max-w-4xl mx-auto mt-6 p-4
          bg-red-600/20 border border-red-500
          rounded-xl text-center text-red-400
        ">
          🔒 Estamos cerrados.
          <br />
          Sábado y domingo de 10:00 AM a 8:00 PM
        </div>
      )}

      {/* CONTENIDO */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        {/* SLIDER */}
        <PromoSlider />

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-2 gap-6">

          <Menu addToCart={addToCart} />

          <div ref={cartRef}>
            <Cart
              cart={cart}
              isOpen={isOpen}
              onCheckout={() => setCheckoutOpen(true)}
              onRemove={(index) =>
                setCart(prev => prev.filter((_, i) => i !== index))
              }
            />
          </div>

        </div>

      </div>

      {/* ANIMACIÓN VUELO */}
      <AnimatePresence>
        {flyAnim && (
          <motion.div
            initial={{
              position: "fixed",
              top: flyAnim.start.top,
              left: flyAnim.start.left,
              width: 36,
              height: 36,
              borderRadius: 999,
              background: "#f97316"
            }}
            animate={{
              top: flyAnim.end.top + 20,
              left: flyAnim.end.left + 20,
              scale: 0.5,
              opacity: 0.6
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut"
            }}
            className="z-[9999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* CHECKOUT */}
      {checkoutOpen && isOpen && (
        <Checkout
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onClearCart={() => setCart([])}
          onSuccess={() => setSuccessOpen(true)}
          onTicket={(order, total) => {
            setLastOrder(order);
            setLastTotal(total);
            setTicketOpen(true);
          }}
        />
      )}

      {successOpen && (
        <SuccessModal onClose={() => setSuccessOpen(false)} />
      )}

      {ticketOpen && (
        <TicketModal
          cart={lastOrder}
          total={lastTotal}
          onClose={() => setTicketOpen(false)}
        />
      )}

    </div>
  );
}
