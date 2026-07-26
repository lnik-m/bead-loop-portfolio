import enMessages from './messages/en'

export type DeepKeyOf<T> = T extends object
  ? {
      // @ts-ignore
      [K in keyof T]: K | `${K & string}.${DeepKeyOf<T[K]>}`
    }[keyof T]
  : never

export type ISupportedLocale = 'en' | 'ru' | 'es'

export type IMessages = {
  [key: string]: IMessages | string
}

export type IBaseMessages = typeof enMessages
