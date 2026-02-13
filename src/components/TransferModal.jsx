import { motion } from "framer-motion";

export default function TransferModal({ onClose }) {

  const clabe = "1278 2201 3704 5101 48";
  const card = "4027 6657 8558 2918";
  const name = "Brenda Berenise Villarreal Hernández";

  const copy = (text, label) => {

    navigator.clipboard.writeText(
      text.replace(/\s/g, "")
    );

    alert(`${label} copiado ✅`);
  };

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        fixed inset-0 z-[10000]
        bg-black/70
        flex items-center justify-center p-4
      "
    >

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="
          backdrop-blur-xl
          bg-black/40
          border border-white/10
          rounded-2xl
          p-6
          w-full max-w-md
          text-white
        "
      >

        <h2 className="text-xl font-bold mb-4 text-orange-400">
          Datos para transferencia
        </h2>

        {/* CLABE */}

        <p className="text-sm text-gray-300">
          CLABE interbancaria
        </p>

        <div className="flex gap-2 mb-3">

          <div className="flex-1 bg-white/10 p-2 rounded">
            {clabe}
          </div>

          <button
            onClick={() => copy(clabe, "CLABE")}
            className="bg-orange-500 px-3 rounded hover:scale-105 transition"
          >
            Copiar
          </button>

        </div>

        {/* TARJETA */}

        <p className="text-sm text-gray-300">
          Número de tarjeta
        </p>

        <div className="flex gap-2 mb-3">

          <div className="flex-1 bg-white/10 p-2 rounded">
            {card}
          </div>

          <button
            onClick={() => copy(card, "Tarjeta")}
            className="bg-orange-500 px-3 rounded hover:scale-105 transition"
          >
            Copiar
          </button>

        </div>

        {/* NOMBRE */}

        <p className="text-sm text-gray-300">
          Nombre
        </p>

        <div className="flex gap-2 mb-3">

          <div className="flex-1 bg-white/10 p-2 rounded">
            {name}
          </div>

          <button
            onClick={() => copy(name, "Nombre")}
            className="bg-orange-500 px-3 rounded hover:scale-105 transition"
          >
            Copiar
          </button>

        </div>

        <p className="text-yellow-400 text-sm mb-4">
          ⚠ Favor de enviar el comprobante al chat
        </p>

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
