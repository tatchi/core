import type { Cause } from "../Cause/cause"
import * as O from "../Option"
import { foldCauseM_, halt, succeed } from "./core"
import type { Effect } from "./effect"

/**
 * Recovers from some or all of the error cases with provided cause.
 */
export function catchSomeCause_<S2, R2, E2, A2, S, R, E, A>(
  effect: Effect<S2, R2, E2, A2>,
  f: (_: Cause<E2>) => O.Option<Effect<S, R, E, A>>
) {
  return foldCauseM_(
    effect,
    (c): Effect<S, R, E | E2, A> =>
      O.fold_(
        f(c),
        () => halt(c),
        (a) => a
      ),
    (x) => succeed(x)
  )
}

/**
 * Recovers from some or all of the error cases with provided cause.
 */
export function catchSomeCause<S, R, E, E2, A>(
  f: (_: Cause<E2>) => O.Option<Effect<S, R, E, A>>
) {
  return <S2, R2, A2>(effect: Effect<S2, R2, E2, A2>) => catchSomeCause_(effect, f)
}
