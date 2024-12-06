let NB_ELEMENTS: number = 8;
let id: number = 0;
let tableau: { id: number; nom: string; texte: string; idsvg: number }[] = [
  {
    id: id++,
    nom: "Bronches",
    texte:
      "Les bronches du corps humain permettent d'ammenner l'oxygène jusqu'aux poumons tout comme les rivières ammènent l'eau à la mer.",
    idsvg: 1,
  },
  {
    id: id++,
    nom: "Poumons",
    texte:
      "Les poumons acceuillent de l'air dont les alvéoles captent son dioxygène. A l'inverse, l'océan lui, capte le dioxyde de carbonne de l'air qu'il contient.",
    idsvg: 2,
  },
  {
    id: id++,
    nom: "Glandes salivaires",
    texte:
      "Tout comme la salive permet d'altérer les aliments pour faciliter leur digestion, l'écume projeté sur les rivages travaille son environnement, le rendant plus favorable à certaines espèces.",
    idsvg: 3,
  },
  {
    id: id++,
    nom: "Glande thyroïde",
    texte:
      "La glande thyroïde joue un rôle majeur dans la régulation du taux de calcium du sang, contribuant à sa qualitée. De la même manière, les coccosphaerales contribuent à la qualité de l'eau de mer en régulant le taux de carbonne de l'eau dont elles calcifient le trop plein.",
    idsvg: 4,
  },
  {
    id: id++,
    nom: "Vertèbres",
    texte:
      "Les vertèbres servent de support aux organes dorsaux, analogiquement, les coraux produisent un squelette qui sert de support à de nombreuses espèces marines.",
    idsvg: 5,
  },
  {
    id: id++,
    nom: "Veines et artères",
    texte:
      "Les veines et artères traversent les corps humains, permettant des échanges indispensables au bons fonctionnements de celui-ci. Les courants marins, tant en profondeurs qu'en surface, occupent un rôle comparables. Cependant, dans un cas comme dans l'autre, une modifications des températures entraine des modifications de ces circulations et causent de lors dommages. ",
    idsvg: 6,
  },
  {
    id: id++,
    nom: "Système digestif",
    texte:
      "La digestion est un procédé complexe qui fait intervenir plusieurs organes afin de transformer un aliment en ressource. Les océans eux aussi, via divers procédés, peuvent transformer de nombreuses choses en ressources utiles ou indispensables à sa faune et sa flore. Il est cepandant important de noter que, tout comme manger n'importe quoi peut rendre affreusement malade, certains déchets ou composants chimiques dans l'océan détruisent ses écosystèmes.",
    idsvg: 6,
  },
  {
    id: id++,
    nom: "Reins",
    texte:
      "Les reins sont des organes vitaux pour l'homme par leur rôle de filtration du sang. Les éponges marines, elles, jouent un rôle similaire en filtrant l'eau de mer.",
    idsvg: 6,
  },
];
export default defineEventHandler(async (event) => {
  if (getRouterParam(event, "id") === undefined) {
    return null;
  }
  const id: number = Number(getRouterParam(event, "id"));
  if (id < 0 || id > NB_ELEMENTS - 1) {
    return { error: `ID must be between 0 and ${NB_ELEMENTS - 1}` };
  }
  return tableau[id];
});
