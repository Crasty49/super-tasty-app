export const sauces = [
  "BBQ",
  "BBQ Hot",
  "Búfalo",
  "Mango habanero"
];

export const menu = [

  {
    id: 1,
    name: "Boneless (12 pz)",
    price: 140,
    hasSauce: true
  },

  {
    id: 2,
    name: "Media orden Boneless (6 pz)",
    price: 80,
    hasSauce: true
  },

  // 🔥 productos con selector de cantidad

  {
    id: 3,
    name: "Orden de papas gajo",
    price: 60,
    hasSauce: false,
    hasQuantity: true
  },

  {
    id: 4,
    name: "Orden de papas a la francesa",
    price: 55,
    hasSauce: false,
    hasQuantity: true
  },

  {
    id: 5,
    name: "Orden de dedos de queso (12 pz)",
    price: 130,
    hasSauce: false,
    hasQuantity: true
  },

  {
    id: 6,
    name: "Media orden dedos de queso (6 pz)",
    price: 75,
    hasSauce: false,
    hasQuantity: true
  }

];
