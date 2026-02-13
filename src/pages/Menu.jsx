import { menu } from "../data/menu";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BonelessBuilder from "../components/BonelessBuilder";

export default function Menu({ addToCart }) {

  const [builderItem, setBuilderItem] = useState(null);

  return (

    <div className="space-y-4">

      {menu.map(item => (

        <motion.div
          key={item.id}
          whileHover={{ scale: 1.03 }}
          className="
            backdrop-blur-lg
            bg-white/5
            border border-white/10
            p-5 rounded-xl shadow-lg
          "
        >

          <h3 className="font-semibold text-lg text-white">
            {item.name}
          </h3>

          <p className="text-orange-400 font-bold mb-3">
            ${item.price}
          </p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {

              const rect = e.currentTarget.getBoundingClientRect();

              if (item.hasSauce) {
                setBuilderItem(item);
              } else {
                addToCart(item, rect);
              }

            }}
            className="
              bg-gradient-to-r from-red-600 to-orange-500
              px-4 py-2 rounded-lg w-full
              font-semibold
              shadow-md
            "
          >
            Agregar
          </motion.button>


        </motion.div>
      ))}

      {/* BUILDER MODAL */}

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
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="relative"
            >

              <BonelessBuilder
                item={builderItem}
                onConfirm={(config) => {

                  addToCart(
                    config,
                    {
                      top: window.innerHeight / 2,
                      left: window.innerWidth / 2
                    }
                  );

                  setBuilderItem(null);
                }}
              />

              <button
                onClick={() => setBuilderItem(null)}
                className="
                  absolute -top-3 -right-3
                  bg-red-600 w-8 h-8 rounded-full
                  flex items-center justify-center
                  text-white font-bold shadow-lg
                "
              >
                ✕
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}
