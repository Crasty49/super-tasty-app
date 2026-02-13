import { motion } from "framer-motion";

export default function SuccessModal({ onClose }) {

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        fixed inset-0
        bg-black/70
        flex items-center justify-center
        z-[10000]
      "
    >

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className="
          backdrop-blur-xl
          bg-black/40
          border border-white/10
          rounded-xl
          p-8
          text-center
          text-white
          max-w-sm
        "
      >

        <div className="text-5xl mb-3">
          ✅
        </div>

        <h2 className="text-xl font-bold mb-2 text-orange-400">
          Pedido enviado
        </h2>

        <p className="text-gray-300 mb-4">
          Gracias por tu compra
        </p>

        <button
          onClick={onClose}
          className="
            w-full
            bg-gradient-to-r from-red-600 to-orange-500
            py-2 rounded-lg
          "
        >
          Continuar
        </button>

      </motion.div>

    </motion.div>
  );
}
