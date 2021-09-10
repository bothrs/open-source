import { loadScript } from './loadScript.mjs'

export async function launch(evt) {
  await loadScript('https://embed.typeform.com/embed.js', 'typef_orm_share')
  if (typeof window.typeformEmbed !== 'undefined') {
    window.typeformEmbed.makePopup(evt.target.href, {
      mode: 'drawer_left',
      autoOpen: true,
    })
  }
}
