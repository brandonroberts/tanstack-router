import { batch, createStore } from '@tanstack/angular-store'
import {
  createNonReactiveMutableStore,
  createNonReactiveReadonlyStore,
} from '@tanstack/router-core'
import type { Readable } from '@tanstack/angular-store'
import type { GetStoreConfig } from '@tanstack/router-core'

declare module '@tanstack/router-core' {
  export interface RouterReadableStore<TValue> extends Readable<TValue> {}
}

export const getStoreFactory: GetStoreConfig = (opts) => {
  if (opts.isServer) {
    return {
      createMutableStore: createNonReactiveMutableStore,
      createReadonlyStore: createNonReactiveReadonlyStore,
      batch: (fn) => fn(),
    }
  }
  return {
    createMutableStore: createStore,
    createReadonlyStore: createStore,
    batch: batch,
  }
}
