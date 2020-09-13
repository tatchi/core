import { chain_ } from "./core"
import type { Effect } from "./effect"
import { map_ } from "./map_"

/**
 * Applicative's ap
 */
export function ap_<S, R, E, B, S2, R2, E2, A>(
  fab: Effect<S, R, E, (a: A) => B>,
  fa: Effect<S2, R2, E2, A>
): Effect<S2 | S, R & R2, E2 | E, B> {
  return chain_(fab, (ab) => map_(fa, ab))
}
