// ets_tracing: off

import { chain_, unit } from "./core"
import type { Effect } from "./effect"

/**
 * Ignores the result of the effect replacing it with a void
 */
export function asUnit<R, E, X>(self: Effect<R, E, X>, __trace?: string) {
  return chain_(self, () => unit, __trace)
}
