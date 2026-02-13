import { motion, AnimatePresence } from "framer-motion";

export default function Cart({ cart, onCheckout, onRemove }) {

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (

    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        backdrop-blur-lg
        bg-white/5
        border border-white/10
        p-6 rounded-xl shadow-lg
      "
    >
      <h2 className="font-bold text-xl mb-4 flex items-center gap-2">

        🛒 Carrito

        {cart.length > 0 && (
          <motion.span
            key={cart.length}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="
              bg-orange-500
              text-black
              px-2 py-0.5
              rounded-full
              text-sm font-bold
            "
          >
            {cart.length}
          </motion.span>
        )}

      </h2>


      {cart.length === 0 ? (

        <p className="text-gray-400">
          Tu carrito está vacío
        </p>

      ) : (

        <AnimatePresence>

          {cart.map((item, i) => (

            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="
                mb-4 pb-3 border-b border-white/10
                flex justify-between gap-3
              "
            >

              {/* INFO */}

              <div>

                <p className="font-semibold text-white">
                  {item.name}
                </p>

                {item.mode && (
                  <p className="text-sm text-gray-400">
                    Modo: {item.mode === "banados"
                      ? "Bañados"
                      : "Naturales"}
                  </p>
                )}

                {item.includedSauces?.length > 0 && (
                  <p className="text-sm text-gray-300">
                    Incluidas: {item.includedSauces.join(", ")}
                  </p>
                )}

                {item.extraSauces?.length > 0 && (
                  <p className="text-sm text-gray-300">
                    Extras: {item.extraSauces.join(", ")}
                  </p>
                )}

                <p className="font-bold text-orange-400 mt-1">
                  ${item.price}
                </p>

              </div>

              {/* BOTÓN ELIMINAR */}

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => onRemove(i)}
                className="
                  bg-red-600/80
                  hover:bg-red-600
                  w-9 h-9 rounded-full
                  flex items-center justify-center
                  text-white font-bold
                  shadow-md
                "
              >
                ✕
              </motion.button>

            </motion.div>

          ))}

        </AnimatePresence>
      )}

      {cart.length > 0 && (

        <motion.button
          layout
          whileTap={{ scale: 0.97 }}
          onClick={onCheckout}
          className="
            w-full mb-3
            bg-gradient-to-r from-red-600 to-orange-500
            py-2 rounded-lg
          "
        >
          Confirmar pedido
        </motion.button>

      )}

      <motion.h3
        layout
        className="
          mt-4 text-xl font-bold text-orange-400
        "
      >
        Total: ${total}
      </motion.h3>

    </motion.div>
  );
}
