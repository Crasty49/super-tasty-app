import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Menu from "./pages/Menu";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import logo from "./assets/SuoerTastyBoneless.jpeg";
import PromoSlider from "./components/PromoSlider";
import SuccessModal from "./components/SuccessModal";
import TicketModal from "./components/TicketModal";

import { db } from "./firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";

export default function App() {

  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [flyAnim, setFlyAnim] = useState(null);
  const cartRef = useRef();
  const [successOpen, setSuccessOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState([]);
  const [lastTotal, setLastTotal] = useState(0);

  const [horario, setHorario] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

      let horarioData = {};
      let timeoutRef;

      const calcularEstado = () => {

        if (!horarioData) return;

        const now = new Date();

        const dias = [
          "domingo","lunes","martes","miercoles",
          "jueves","viernes","sabado"
        ];

        const hoy = dias[now.getDay()];

        const activo = horarioData[hoy]?.activo ?? true;
        const apertura = horarioData[hoy]?.apertura || "00:00";
        const cierre = horarioData[hoy]?.cierre || "00:00";

        const minutosActual =
          now.getHours() * 60 + now.getMinutes();

        const [hA, mA] = apertura.split(":").map(Number);
        const [hC, mC] = cierre.split(":").map(Number);

        const minutosApertura = hA * 60 + mA;
        const minutosCierre = hC * 60 + mC;

        const abierto =
          activo &&
          minutosActual >= minutosApertura &&
          minutosActual < minutosCierre;

        setIsOpen(abierto);

        // 🔥 calcular cuando volver a revisar EXACTO
        let proximoCambio;

        if (abierto) {
          proximoCambio = minutosCierre - minutosActual;
        } else {
          proximoCambio = minutosApertura - minutosActual;
        }

        if (proximoCambio < 0) proximoCambio = 1;

        const ms = proximoCambio * 60000;

        clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => {
          calcularEstado();
        }, ms);
      };

      // 🔥 escuchar horario firebase
      const refHorario = doc(db, "config", "horario");

      const unsubHorario = onSnapshot(refHorario, (snap) => {
        if (!snap.exists()) return;

        horarioData = snap.data();
        setHorario(horarioData);

        calcularEstado();
      });

      // 🔴 mensaje rojo
      const refMsg = doc(db,"config","mensaje");
      const unsubMsg = onSnapshot(refMsg,(snap)=>{
        if(snap.exists()){
          setMensaje(snap.data().texto);
        }
      });

      return () => {
        unsubHorario();
        unsubMsg();
        clearTimeout(timeoutRef);
      };

    }, []);


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
          {mensaje || "Cerrado"}
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
