const fs = require('fs')

class ProxyManager {
  constructor (location = './proxies.txt') {
    this.formattedProxies = []
    this.badProxyArr = []

    const proxyFile = fs.readFileSync(location).toString()
    this.proxies = proxyFile.split('\n')
    this.index = 0

    if (typeof this.proxies !== 'undefined' && this.proxies.length > 0) {
      this.proxies.forEach((proxy, index) => {
        try {
          if (proxy != '') {
            if (proxy.split(':').length == 2) {
              this.formattedProxies.push(proxy.trim())
            } else {
              if (proxy.includes('@')) {
                this.formattedProxies.push(proxy.trim())
              } else {
                const formatProxy = `${proxy.trim().split(':')[2]}:${proxy.trim().split(':')[3]}@${proxy.trim().split(':')[0]}:${proxy.trim().split(':')[1]}`
                this.formattedProxies.push(formatProxy)
              };
            };
          };
        } catch (error) {
          if (!this.badProxyArr.includes(proxy)) {
            this.badProxyArr.push(proxy)
          };
        };
      })
    };
  };

  format (proxy) {
    if (proxy == undefined) {
      return proxy
    } else {
      return `http://${proxy}`
    };
  };

  get_next_proxy (randomProxy = true, index = 0) {
    if (this.index == this.formattedProxies.length) {
      return this.format(undefined)
    }
    if (randomProxy) {
      const rand = Math.floor(Math.random() * this.formattedProxies.length)
      return this.format(this.formattedProxies[rand])
    } else {
      return this.format(this.formattedProxies[index])
    };
  };
};

module.exports = ProxyManager