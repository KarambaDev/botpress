export interface Config {
  /** The bot token received from the Telegram Botfather */
  botToken: string

  /** The bot token received from the Telegram Botfather */
  proxy: {
    /**
     * Weather or not to escape plain html payload
     */
    host: string,
    port: number,
    login: string,
    psswd: string,
  }

  /** Enable or disable this channel for this bot */
  enabled: boolean

  /** Force usage of webhooks */
  forceWebhook: boolean

  /**
   * The duration of the authentication session when a user authenticate through this channel.
   * @default 24h
   */
  chatUserAuthDuration: string
}
