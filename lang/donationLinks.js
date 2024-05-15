const stripeLinks =  {
    'en': 'https://buy.stripe.com/7sI15Qfal61MbcY9AA',
    'ar': 'https://buy.stripe.com/14k15QgepgGqa8UcMP',
    'fr': 'https://buy.stripe.com/00g5m6faleyibcYdQU',
    'es': 'https://buy.stripe.com/00g5m6faleyibcYdQU',
    'fa': 'https://buy.stripe.com/cN229U8LXduegxi8wG',
    'de': 'https://buy.stripe.com/00g5m6faleyibcYdQU',
    'pt-br': 'https://buy.stripe.com/14kbKugepcqabcY6op',
    'uk': 'https://buy.stripe.com/3cs6qad2d3TE2Gs8wF',
    'it': 'https://buy.stripe.com/00g5m6faleyibcYdQU',
    'ru': 'https://donate.stripe.com/4gw9Cme6h9dY6WI6oq',
    'th': 'https://buy.stripe.com/3csaGq0frdue4OAbIT',
    'id': 'https://buy.stripe.com/14kaGq2nz1Lwfte5kw',
    'tr': 'https://buy.stripe.com/00g4i2gepeyifte9AI',
    'ko': 'https://buy.stripe.com/9AQ15Qgep61M5SEbIP',
    'bn': 'https://buy.stripe.com/8wMaGqfalai22Gs7sy',
}

const donationLink = (lang) => {
    const link = stripeLinks[lang]
    return link || stripeLinks['en']
}

module.exports = { donationLink }