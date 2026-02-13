import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const BUSINESS_PHONE = "528361227012"; // ← CAMBIA ESTE NÚMERO

export default function Checkout({ cart, onClose, onClearCart, onSuccess, onTicket }) {
  

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verifyOpen, setVerifyOpen] = useState(false);
  

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const openVerify = () => {

    if (!name || phone.length !== 10) {
      alert("Número inválido");
      return;
    }

    setVerifyOpen(true);
  };


  const sendWhatsApp = () => {

    let message = `🔥 Pedido Super Tasty Boneless\n\n`;

    cart.forEach(item => {

      const qtyText = item.quantity > 1
        ? ` x${item.quantity}`
        : "";

      message += `🍗 ${item.name}${qtyText}\n`;


      if (item.mode) {
        message += `Modo: ${item.mode === "banados" ? "Bañados" : "Naturales"}\n`;
      }

      if (item.includedSauces?.length) {
        message += `Incluidas: ${item.includedSauces.join(", ")}\n`;
      }

      if (item.extraSauces?.length) {
        message += `Extras: ${item.extraSauces.join(", ")}\n`;
      }

      message += `Precio: $${item.price}\n\n`;

    });

    message += `💰 Total: $${total}\n\n`;
    message += `Cliente: ${name}\nTel: ${phone}`;

    const url =
      `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;

    // 👉 MOSTRAR TICKET PRIMERO
    onTicket(cart, total);

    // 👉 luego abrir WhatsApp
    setTimeout(() => {
      window.open(url, "_blank");
    }, 400);

    // 👉 limpiar después
    onClearCart();
    onSuccess();

    setVerifyOpen(false);
    onClose();
  };


  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
    >

      {/* MAIN CHECKOUT */}

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-6 w-full max-w-md text-white"
      >

        <h2 className="text-xl font-bold mb-4 text-orange-400">
          Confirmar pedido
        </h2>

        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-white/10"
        />

        <input
          placeholder="Teléfono"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={e => {

            const clean = e.target.value.replace(/\D/g, "");
            setPhone(clean);

          }}
          className={`
            w-full mb-1 p-2 rounded
            ${phone.length > 0 && phone.length < 10
              ? "bg-red-500/20 border border-red-500"
              : "bg-white/10"}
          `}
        />

        {phone.length > 0 && phone.length < 10 && (
          <p className="text-red-400 text-sm mb-2">
            El número debe tener 10 dígitos
          </p>
        )}


        <div className="mb-4 text-sm">

          {cart.map((item, i) => (

            <div key={i} className="mb-1">

              {item.name}

              {item.includedSauces?.length > 0 &&
                ` — ${item.includedSauces.join(", ")}`}

              {item.extraSauces?.length > 0 &&
                ` (+${item.extraSauces.join(", ")})`}

            </div>

          ))}

          <div className="mt-2 font-bold text-orange-400">
            Total: ${total}
          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={openVerify}
            className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 py-2 rounded-lg"
          >
            Confirmar
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-white/10 py-2 rounded-lg"
          >
            Cancelar
          </button>

        </div>

      </motion.div>

      {/* VERIFICACIÓN */}

      <AnimatePresence>

        {verifyOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[10000]"
          >

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="backdrop-blur-xl bg-black/50 border border-white/10 rounded-xl p-6 w-full max-w-sm text-white"
            >

              <h3 className="text-lg font-bold mb-3 text-orange-400">
                Confirmar datos
              </h3>

              <p>Nombre: <b>{name}</b></p>
              <p className="mb-4">Teléfono: <b>{phone}</b></p>

              <div className="flex gap-3">

                <button
                  onClick={sendWhatsApp}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 py-2 rounded-lg"
                >
                  Enviar pedido
                </button>

                <button
                  onClick={() => setVerifyOpen(false)}
                  className="flex-1 bg-white/10 py-2 rounded-lg"
                >
                  Editar
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>
  );
}
