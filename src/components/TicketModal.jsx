import { motion } from "framer-motion";

export default function TicketModal({ cart, total, onClose }) {

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        fixed inset-0
        bg-black/70
        flex items-center justify-center
        z-[10000]
        p-4
      "
    >

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="
          bg-zinc-900
          border border-white/10
          rounded-xl
          p-6
          w-full max-w-sm
          text-white
          shadow-xl
        "
      >

        <h2 className="text-xl font-bold mb-4 text-orange-400 text-center">
          Ticket del pedido
        </h2>

        <div className="text-sm mb-4">

          {cart.map((item, i) => (

            <div key={i} className="mb-2">

              <p className="font-semibold">
                {item.name}
              </p>

              {item.includedSauces?.length > 0 && (
                <p>
                  Incluidas: {item.includedSauces.join(", ")}
                </p>
              )}

              {item.extraSauces?.length > 0 && (
                <p>
                  Extras: {item.extraSauces.join(", ")}
                </p>
              )}

              <p>Precio: ${item.price}</p>

            </div>

          ))}

        </div>

        <div className="font-bold text-lg mb-4 text-orange-400 text-center">
          Total: ${total}
        </div>

        <button
          onClick={onClose}
          className="
            w-full
            bg-gradient-to-r from-red-600 to-orange-500
            py-2 rounded-lg
          "
        >
          Cerrar
        </button>

      </motion.div>

    </motion.div>
  );
}
