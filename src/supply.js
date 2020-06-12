const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const config = JSON.parse(fs.readFileSync('./config.json'));
const ProxyManager = require('./classes/proxyManager');
const eCrypt = require('./classes/ecrypt')

const captchaAPI = '04cad6aebe2122f83c6cb424317fa484';
const capthcaSiteKey = '6LcGOFgUAAAAAGMC007IMYaAZcxysrKWFeDvnt7w';

class Supply {
    constructor(profile, taskID) {
        this.taskID = taskID;
        this.profile = profile;
        this.proxy = newProxy();

        this.productTitle = '';
        this.encryptionKey = '';
        this.productImage = '';

        this.scrapePage();
    }

    scrapePage() {
        request({
            url: config.url,
            proxy: this.proxy
        }, (err, resp, body) => {
            // An error occured requesting the raffle page
            if (err || resp.statusCode !== 200) {
                return console.log("Error requesting raffle page!");
            }
            // If the request worked
            const $ = cheerio.load(body);
            this.productImage = `https://www.supplystore.com.au` + $('.page-content > img').attr('src');
            this.productTitle = $('.page-content > img').attr('alt');
            this.encryptionKey = $('form#raffleForm').attr('data-eway-encrypt-key');
            this.encryptCard();

        });
    }
    encryptCard() {
        const encryptedCardNumber = eCrypt.encrypt(this.profile.cardNumber, this.encryptionKey);
        const encryptedCVVNumber = eCrypt.encrypt(this.profile.CVV, this.encryptionKey);
        this.solveCaptcha();

    }
    solveCaptcha(){

    }

}

const newProxy = () => {
    return new ProxyManager().get_next_proxy();
}

module.exports = Supply;