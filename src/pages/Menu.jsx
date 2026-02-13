import { menu } from "../data/menu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BonelessBuilder from "../components/BonelessBuilder";

export default function Menu({ addToCart }) {

  const [builderItem, setBuilderItem] = useState(null);
  const [qty, setQty] = useState({});

  const changeQty = (id, delta) => {
    setQty(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  return (

    <div className="space-y-4">

      {menu.map(item => {

        const quantity = qty[item.id] || 1;

        return (

            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="
                backdrop-blur-lg backdrop-blur-fix
                bg-black/40
                border border-white/10
                p-5 rounded-xl shadow-lg
              "
            >


            <h3 className="font-semibold text-lg text-white">
              {item.name}
            </h3>

            <p className="text-orange-400 font-bold mb-3">
              ${item.price * quantity}
            </p>

            {/* SELECTOR DE CANTIDAD */}

            {item.hasQuantity && (

              <div className="flex items-center gap-3 mb-3">

                <button
                  onClick={() => changeQty(item.id, -1)}
                  className="bg-white/10 px-3 py-1 rounded"
                >
                  −
                </button>

                <span className="font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => changeQty(item.id, +1)}
                  className="bg-white/10 px-3 py-1 rounded"
                >
                  +
                </button>

              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {

                const rect = e.currentTarget.getBoundingClientRect();

                if (item.hasSauce) {
                  setBuilderItem(item);
                } else {

                  addToCart({
                    ...item,
                    quantity,
                    price: item.price * quantity
                  }, rect);
                }

              }}
              className="
                bg-gradient-to-r from-red-600 to-orange-500
                px-4 py-2 rounded-lg w-full font-semibold shadow-md
              "
            >
              Agregar
            </motion.button>

          </motion.div>

        );
      })}

      {/* BUILDER */}

      <AnimatePresence>

        {builderItem && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0 z-[9999]
              bg-black/70 backdrop-blur-sm
              flex items-center justify-center p-4
            "
          >

            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >

            <BonelessBuilder
              item={builderItem}

              onConfirm={(config) => {
                addToCart(config, {
                  top: window.innerHeight / 2,
                  left: window.innerWidth / 2
                });

                setBuilderItem(null);
              }}

              onClose={() => setBuilderItem(null)}
            />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}
