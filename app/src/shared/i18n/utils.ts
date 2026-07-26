import type { IBaseMessages, IMessages, ISupportedLocale } from './types'
import enMessages from './messages/en'
import esMessages from './messages/es'
import ruMessages from './messages/ru'

export const getMessagesByLocale = (locale: ISupportedLocale) => {
  const allMessages: { [locale in ISupportedLocale]: IBaseMessages } = {
    en: enMessages,
    es: esMessages,
    ru: ruMessages
  }
  return allMessages[locale]
}

export const getMessageById = (messages: IMessages, id: string): string => {
  const keys = id.split('.')
  let message: string | IMessages = messages

  for (const key of keys) {
    // @ts-ignore
    message = message[key]
    if (!message) {
      throw new Error(`Message with id ${id} not found`)
    }
  }

  if (typeof message !== 'string') {
    throw new Error(`Message with id ${id} not found`)
  }

  return message
}
