export function apply<T>(t: T, f: (t: T) => void) {
  f(t);
  return t;
}
