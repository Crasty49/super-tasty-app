import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransferModal from "./TransferModal";
import useBackClose from "../hooks/useBackClose";



const BUSINESS_PHONE = "528361227012";

export default function Checkout({
  cart,
  onClose,
  onClearCart,
  onSuccess,
  onTicket
}) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verifyOpen, setVerifyOpen] = useState(false);

  const [payment, setPayment] = useState("efectivo");
  const [cash, setCash] = useState("");
  const [transferOpen, setTransferOpen] = useState(false);

  useBackClose(true, onClose);


  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const cashInvalid =
    payment === "efectivo" &&
    cash !== "" &&
    Number(cash) < total;

  const openVerify = () => {

    if (!name || phone.length !== 10) {
      alert("Datos inválidos");
      return;
    }

    if (cashInvalid) {
      alert("El monto es menor al total");
      return;
    }

    setVerifyOpen(true);
  };

  const sendWhatsApp = () => {

    let message = `🔥 Pedido Super Tasty Boneless\n\n`;

    cart.forEach(item => {

      let emoji = "🍗";
      const itemName = item.name.toLowerCase();

      if (itemName.includes("papas")) emoji = "🍟";
      if (itemName.includes("queso")) emoji = "🧀";

      const qtyText =
        item.quantity > 1
          ? ` x${item.quantity}`
          : "";

      message += `${emoji} ${item.name}${qtyText}\n`;

      if (item.mode) {
        message += `Modo: ${
          item.mode === "banados"
            ? "Bañados"
            : "Naturales"
        }\n`;
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

    message += `💳 Pago: ${
      payment === "efectivo"
        ? "Efectivo"
        : "Transferencia"
    }\n`;

    if (payment === "efectivo") {

      const change = Number(cash) - total;

      message += `Cliente paga con: $${cash}\n`;
      message += `Feria: $${change}\n`;
    }

    message += `\nCliente: ${name}\nTel: ${phone}`;

    const url =
      `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;

    onTicket(cart, total);
    onClearCart();
    onSuccess();

    window.open(url, "_blank");

    setVerifyOpen(false);
    onClose();
  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
    >

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-6 w-full max-w-md text-white"
      >

        <h2 className="text-xl font-bold mb-4 text-orange-400">
          Confirmar pedido
        </h2>

        {/* Nombre */}

        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-white/10"
        />

        {/* Teléfono */}

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

        {/* MÉTODO DE PAGO */}

        <div className="mb-3">

          <p className="text-sm text-gray-300 mb-1">
            Método de pago
          </p>

          <div className="flex gap-4 mb-2">

            <label>
              <input
                type="radio"
                checked={payment === "efectivo"}
                onChange={() => setPayment("efectivo")}
              /> Efectivo
            </label>

            <label>
              <input
                type="radio"
                checked={payment === "transferencia"}
                onChange={() => {
                  setPayment("transferencia");
                  setTransferOpen(true);
                }}
              /> Transferencia
            </label>

          </div>

          {payment === "efectivo" && (

            <>

              <input
                placeholder="Monto con el que paga"
                type="number"
                value={cash}
                onChange={e => setCash(e.target.value)}
                className={`
                  w-full p-2 rounded mb-1
                  ${cashInvalid
                    ? "bg-red-500/20 border border-red-500"
                    : "bg-white/10"}
                `}
              />

              {cashInvalid && (
                <p className="text-red-400 text-sm">
                  El monto es menor al total
                </p>
              )}

            </>

          )}

        </div>

        {/* Resumen */}

        <div className="mb-4 text-sm">

          {cart.map((item, i) => (

            <div key={i}>

              {item.name}
              {item.quantity > 1 && ` x${item.quantity}`}

            </div>

          ))}

          <div className="mt-2 font-bold text-orange-400">
            Total: ${total}
          </div>

        </div>

        {/* Botones */}

        <div className="flex gap-3">

          <button
            onClick={openVerify}
            disabled={cashInvalid}
            className={`
              flex-1 py-2 rounded-lg
              ${cashInvalid
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-orange-500"}
            `}
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

      {/* MODAL VERIFICACIÓN */}

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
              className="backdrop-blur-xl bg-black/50 border border-white/10 rounded-xl p-6 w-full max-w-sm text-white"
            >


              <h3 className="text-lg font-bold mb-3 text-orange-400">
                Confirmar datos
              </h3>

              <p>Nombre: <b>{name}</b></p>
              <p className="mb-4">Tel: <b>{phone}</b></p>

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
      {/* MODAL TRANSFERENCIA */}

      {transferOpen && (
        <TransferModal
          onClose={() => setTransferOpen(false)}
        />
      )}

    </motion.div>
  );
}
