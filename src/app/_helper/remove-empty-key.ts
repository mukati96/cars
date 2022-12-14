export function RemoveEmptyKeys(obj: any): any {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => (v != '' && v != null))
      .map(([k, v]) => [k, v === Object(v) ? RemoveEmptyKeys(v) : v])
  );
}
