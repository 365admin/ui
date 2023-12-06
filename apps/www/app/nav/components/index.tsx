export { default as Port } from "./PortDefault"
export { default as Container } from "./ContainerDefault"
export function getSlugElement(s: string) {
  const slugelement = decodeURIComponent(s ?? "")
    .replaceAll(" ", "-")
    .replace(/[^A-Za-z0-9_\-]/gi, "")
    .toLowerCase()

  return slugelement
}
export function getLevels(journey: string, slug: string[]) {
  function valueFromSlug(pos: number, defaultValue?: string) {
    if (!slug) return defaultValue ?? ""
    return slug.length >= pos + 1
      ? getSlugElement(slug[pos])
      : defaultValue ?? ""
  }
  const port = valueFromSlug(0) === "port" ? valueFromSlug(1) : ""
  const container =
    port && valueFromSlug(2) === "container" ? valueFromSlug(3) : ""
  return {
    journey, //: valueFromSlug(0),

    port,
    container,
  }
}
