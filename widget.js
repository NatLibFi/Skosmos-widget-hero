/* global Vue */

const HERO = {
  vueApp: null,
  createVueApp: function () {
    return Vue.createApp({
      data () {
        return {
          imgurl: HERO.imgUrl
        }
      },
      template: `<img alt="" id="hero-img" :src="imgurl" v-if="imgurl">`
    })
  },
  imgUrl: null,
  getTranslation: function (key) {
    let getLang = window.SKOSMOS.lang
    if (getLang !== 'fi' && getLang !== 'sv') {
      getLang = 'en'
    }
    return {
      fi: 'Vastaava sivu Europeana Heraldicassa',
      sv: 'Motsvarande sida i Europeana Heraldica',
      en: 'Corresponding page in Europeana Heraldica'
    }[getLang]
  },
  appendMountPoint: function () {
    const mountPoint = document.getElementById('hero-plugin')
    if (mountPoint) {
      if (this.vueApp) {
        this.vueApp.unmount()
      }
      mountPoint.remove()
    }
    const newMountPoint = document.createElement('div')
    newMountPoint.id = 'hero-plugin'
    newMountPoint.classList.add('col-lg-2', 'px-0', 'text-end')
    document.getElementById('concept-label').classList.remove('col-lg-8')
    document.getElementById('concept-label').classList.add('col-lg-6')
    document.getElementById('concept-heading').append(newMountPoint)
    },
  render: function () {
    this.vueApp = this.createVueApp()
    this.vueApp.mount('#hero-plugin')
  },
  remove: function () {
    if (this.vueApp) {
      this.vueApp.unmount()
      this.vueApp = null
    }
  },
  createLink: function (id) {
    const divElement = document.createElement('div')
    divElement.classList.add('row')
    const anchorElement = document.createElement('a')
    const linkTarget = `https://heraldica.narc.fi/termi.html?id=${id}&lang=${window.SKOSMOS.lang}&t=${window.SKOSMOS.content_lang}`
    anchorElement.setAttribute('href', linkTarget)
    anchorElement.setAttribute('target', '_blank')
    anchorElement.id = 'hero-link'
    anchorElement.textContent = HERO.getTranslation('linkText')
    document.querySelector('.main-content-section').appendChild(divElement)
    divElement.appendChild(anchorElement)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  window.loadHeroImage = function (data) {
    // Only activating the widget when on a concept page and there is a prefLabel.
    if (data.pageType !== 'concept' || data.prefLabels === undefined) {
      return
    }
    HERO.appendMountPoint()
    // reading the id from the uri
    const id = data.uri.substr(data.uri.lastIndexOf('/p') + 2)
    HERO.imgUrl = 'https://heraldica.narc.fi/img/hero/thumb/' + id + '.png'
    HERO.render(id)
    HERO.createLink(id)
  }
})
