export function assert(condition: boolean) {
  if (!condition) {
    console.error('Assertion fail!');
    console.trace();
  }
}