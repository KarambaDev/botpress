import * as sdk from 'botpress/sdk'
import 'bluebird-global'
// import https from 'https'
import { Config } from '../config'

import api from './api'
import fs from 'fs'
import request from 'request'
import gm from 'gm'

export async function setupMiddleware(bp: typeof sdk) {
  bp.events.registerMiddleware({
    description:
      'Make magick happen',
    direction: 'incoming',
    handler: outgoingHandler,
    name: 'photo.sendMessages',
    order: 101
  })

  async function outgoingHandler(event: sdk.IO.IncomingEvent, next: sdk.IO.MiddlewareNextCallback) {
    if (event.type === 'image') {
      if (event.channel === 'odnoklassniki') {
        const pictureUrl = event.payload.url
        console.log(pictureUrl)
        gm(request(pictureUrl))
          .write('/home/elrond/bot/dev2/reformat.jpg', function (err) {
            if (!err) { console.log('done') }
            else { console.log(err) }
          });
      }
      const quest = event.state.user.active_quest
      const quest_step = event.state.user.q_sub

    } else {
      return next()
    }

    // const client: OdnoklassnikiClient = clients[event.botId]
    // if (!client) {
    //   return next()
    // }
    // console.log('!!!!!!!!!!!!!!!!!!!!!')
    // console.log(event)
    // return client.handleOutgoingEvent(bp, event, next)
  }
}


// This is called when server is started, usually to set up the database
const onServerStarted = async (bp: typeof sdk) => {
  await setupMiddleware(bp)
}

// At this point, you would likely setup the API route of your module.
const onServerReady = async (bp: typeof sdk) => {
  await api(bp)
}

// Every time a bot is created (or enabled), this method will be called with the bot id
const onBotMount = async (bp: typeof sdk, botId: string) => { }

// This is called every time a bot is deleted (or disabled)
const onBotUnmount = async (botId: string) => { }

// When anything is changed using the flow editor, this is called with the new flow, so you can rename nodes if you reference them
const onFlowChanged = async (bp: typeof sdk, botId: string, flow: sdk.Flow) => { }

/**
 * This is where you would include your 'demo-bot' definitions.
 * You can copy the content of any existing bot and mark them as "templates", so you can create multiple bots from the same template.
 */
const botTemplates: sdk.BotTemplate[] = [{ id: 'my_bot_demo', name: 'Bot Demo', desc: `Some description` }]

/**
 * Skills allows you to create custom logic and use them easily on the flow editor
 * Check this link for more information: https://botpress.com/docs/developers/create-module/#skill-creation
 */
const skills: sdk.Skill[] = []

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  onBotMount,
  // onBotUnmount,
  onFlowChanged,
  botTemplates,
  skills,
  definition: {
    // This must match the name of your module's folder, and the name in package.json
    name: 'photo-magick',
    /**
     * When menuIcon is set to `custom`, you need to provide an icon. It must be at that location: `/assets/icon.png`
     * Otherwise, use Material icons name: https://material.io/tools/icons/?style=baseline
     */
    menuIcon: 'flag',
    // This is the name of your module which will be displayed in the sidebar
    menuText: 'Photo Magick',
    // When set to `true`, the name and icon of your module won't be displayed in the sidebar
    noInterface: false,
    // The full name is used in other places, for example when displaying bot templates
    fullName: 'Photo Magick',
    // Not used anywhere, but should be a link to your website or module repository
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
