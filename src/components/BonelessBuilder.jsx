import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sauces } from "../data/menu";
import useBackClose from "../hooks/useBackClose";


const EXTRA_SAUCE_PRICE = 20;
const DRESSING_PRICE = 25;

export default function BonelessBuilder({
  item,
  onConfirm,
  onClose
}) {

  const [mode, setMode] = useState("banados");
  const [included, setIncluded] = useState([]);
  const [extras, setExtras] = useState([]);

  useBackClose(true, onClose);

  if (!item) return null;

  // 👉 bloquear incluidas si es naturales

  useEffect(() => {
    if (mode === "naturales") {
      setIncluded([]);
    }
  }, [mode]);

  // ===== INCLUIDAS =====

  const addIncluded = sauce => {
    if (mode === "naturales") return;
    if (included.length >= 2) return;
    setIncluded([...included, sauce]);
  };

  const removeIncluded = i => {
    const copy = [...included];
    copy.splice(i, 1);
    setIncluded(copy);
  };

  // ===== EXTRAS =====

  const addExtra = extra =>
    setExtras([...extras, extra]);

  const removeExtra = i => {
    const copy = [...extras];
    copy.splice(i, 1);
    setExtras(copy);
  };

  const extraTotal = extras.reduce(
    (sum, e) =>
      sum +
      (e === "Aderezo"
        ? DRESSING_PRICE
        : EXTRA_SAUCE_PRICE),
    0
  );

  const total = item.price + extraTotal;

  // ===== UI =====

  return (

    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="
        relative backdrop-blur-xl
        bg-black/40 border border-white/10
        p-6 rounded-2xl shadow-2xl
        w-full max-w-md text-white
      "
    >

      {/* cerrar */}

      <button
        onClick={onClose}
        className="
          absolute top-3 right-3
          w-8 h-8 rounded-full
          bg-white/10 hover:bg-red-500
        "
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4 text-orange-400">
        Configurar Boneless
      </h2>

      {/* MODOS */}

      <div className="mb-5 flex flex-col gap-2">

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={mode === "banados"}
            onChange={() => setMode("banados")}
          />
          Bañados
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={mode === "naturalesSalsa"}
            onChange={() => setMode("naturalesSalsa")}
          />
          Naturales + salsa aparte
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={mode === "naturales"}
            onChange={() => setMode("naturales")}
          />
          Naturales
        </label>

      </div>


      {/* INCLUIDAS */}

      <h3 className="mb-2 text-orange-300">
        Salsas incluidas (máx 2)
      </h3>

      <div
        className={`
          flex flex-wrap gap-2 mb-3
          ${mode === "naturales"
            ? "opacity-40 pointer-events-none"
            : ""}
        `}
      >

        {sauces.map(s => (

          <button
            key={s}
            onClick={() => addIncluded(s)}
            className="px-3 py-1 bg-white/10 rounded-lg"
          >
            + {s}
          </button>

        ))}

      </div>

      {included.map((s, i) => (

        <div
          key={i}
          className="flex justify-between text-sm mb-1"
        >
          {s}
          <button onClick={() => removeIncluded(i)}>
            ✕
          </button>
        </div>

      ))}

      {/* EXTRAS */}

      <h3 className="mt-5 mb-2 text-red-400">
        Extras
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">

        {sauces.map(s => (

          <button
            key={s + "extra"}
            onClick={() => addExtra(s)}
            className="px-3 py-1 bg-red-500/20 rounded-lg"
          >
            + {s} ($20)
          </button>

        ))}

        <button
          onClick={() => addExtra("Aderezo")}
          className="px-3 py-1 bg-yellow-500/20 rounded-lg"
        >
          + Aderezo ($25)
        </button>

      </div>

      {extras.map((s, i) => (

        <div
          key={i}
          className="flex justify-between text-sm mb-1"
        >
          {s} (
          ${s === "Aderezo"
            ? DRESSING_PRICE
            : EXTRA_SAUCE_PRICE})
          <button onClick={() => removeExtra(i)}>
            ✕
          </button>
        </div>

      ))}

      {/* TOTAL */}

      <div className="mt-5 text-lg font-bold text-orange-400">
        Total: ${total}
      </div>

      {/* CONFIRMAR */}

      <button
        onClick={() =>
          onConfirm({
            ...item,
            mode,
            includedSauces: included,
            extraSauces: extras,
            price: total
          })
        }
        className="
          mt-4 w-full
          bg-gradient-to-r from-red-600 to-orange-500
          py-2 rounded-lg
        "
      >
        Confirmar pedido
      </button>

    </motion.div>
  );
}
