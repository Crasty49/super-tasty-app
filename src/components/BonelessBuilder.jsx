import { useState } from "react";
import { motion } from "framer-motion";
import { sauces } from "../data/menu";

const EXTRA_PRICE = 15;

export default function BonelessBuilder({ item, onConfirm }) {

  const [mode, setMode] = useState("banados");
  const [included, setIncluded] = useState([]);
  const [extras, setExtras] = useState([]);

  if (!item) return null;

  // ---- lógica ----

  const addIncluded = sauce => {
    if (included.length >= 2) return;
    setIncluded([...included, sauce]);
  };

  const removeIncluded = i => {
    const copy = [...included];
    copy.splice(i, 1);
    setIncluded(copy);
  };

  const addExtra = sauce =>
    setExtras([...extras, sauce]);

  const removeExtra = i => {
    const copy = [...extras];
    copy.splice(i, 1);
    setExtras(copy);
  };

  const total =
    item.price + extras.length * EXTRA_PRICE;

  // ---- UI ----

  return (

    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="
        backdrop-blur-xl
        bg-black/40
        border border-white/10
        p-6 rounded-2xl
        shadow-2xl
        w-full max-w-md
        text-white
      "
    >

      {/* título */}

      <h2 className="text-xl font-bold mb-4 text-orange-400">
        Configurar Boneless
      </h2>

      {/* modo */}

      <div className="mb-5 space-y-2">

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            checked={mode === "banados"}
            onChange={() => setMode("banados")}
          />
          Bañados
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            checked={mode === "naturales"}
            onChange={() => setMode("naturales")}
          />
          Naturales + botecitos
        </label>

      </div>

      {/* incluidas */}

      <h3 className="font-semibold mb-2 text-orange-300">
        Incluidas (máx 2)
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">

        {sauces.map(s => (

          <button
            key={s}
            onClick={() => addIncluded(s)}
            className="
              px-3 py-1
              bg-white/10
              hover:bg-orange-500
              rounded-lg transition
            "
          >
            + {s}
          </button>

        ))}

      </div>

      {included.map((s, i) => (

        <div
          key={i}
          className="
            flex justify-between
            text-sm mb-1
            bg-white/5 px-2 py-1 rounded
          "
        >
          {s}
          <button onClick={() => removeIncluded(i)}>
            ✕
          </button>
        </div>

      ))}

      {/* extras */}

      <h3 className="font-semibold mt-5 mb-2 text-red-400">
        Extras (+$15)
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">

        {sauces.map(s => (

          <button
            key={s + "extra"}
            onClick={() => addExtra(s)}
            className="
              px-3 py-1
              bg-red-500/20
              hover:bg-red-500
              rounded-lg transition
            "
          >
            + {s}
          </button>

        ))}

      </div>

      {extras.map((s, i) => (

        <div
          key={i}
          className="
            flex justify-between
            text-sm mb-1
            bg-white/5 px-2 py-1 rounded
          "
        >
          {s} (+$15)
          <button onClick={() => removeExtra(i)}>
            ✕
          </button>
        </div>

      ))}

      {/* total */}

      <div className="mt-5 text-lg font-bold text-orange-400">
        Total: ${total}
      </div>

      {/* confirmar */}

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
          hover:scale-105 transition
          font-semibold
        "
      >
        Confirmar pedido
      </button>

    </motion.div>
  );
}
