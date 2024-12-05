let NB_ELEMENTS: number = 26;
let tableau: string[] = Array.from({ length: NB_ELEMENTS }, (_, i) =>
  String.fromCharCode(97 + i),
);
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
