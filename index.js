const nightmare = require('nightmare')()
const nightmare2 = require('nightmare')()

const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]

checkPrice()

async function checkPrice() {
  try {
    var priceString = await nightmare.goto(url)
                                       .wait("#priceblock_ourprice")
                                       .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                       .end()

    var priceNumber = parseFloat(priceString.replace('$', ''))
    if (priceNumber < minPrice) {
      await out(
        ` price is $${priceNumber} which dropped below desired price $${minPrice}`
      )
    } else {
      console.log('Price is too high')
    }
  } catch (e) {
    console.log('Error')
    throw e
  }
}

async function out(price) {
  var nameString = await nightmare2.goto(url)
                                       .wait("#productTitle")
                                       .evaluate(() => document.getElementById("productTitle").innerText)
                                       .end()
  var name = nameString.substring(0, 35);
  console.log(name + price)
  console.log('Click here to view item: ' + url)
}