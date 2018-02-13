const request = require('superagent');


module.exports = (app) => {
  app.post('/api/stock/portfolio', function (req, res, next) {

    const apikey = '3VFKAWHO47GHZM0N';
    //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
    const tickers = ['MSFT'];

    let completed = 0;
    const results = [];
    for (let i = 0; i < tickers.length; i +=1) {
      const ticker = tickers[i];

      request
        .get('www.alphavantage.co/query')
        .query({ 'function': 'TIME_SERIES_DAILY' })
        .query({ symbol: ticker })
        .query({ apikey: apikey })
        .then((response) => {
          completed += 1;
          //console.log('res', res.body);

          results.push(response.body);
          if (completed === tickers.length){

            console.log('completed');

            res.send({
              success: true,
              message: 'Ticker info',
              results: results
            });
          }
        });
    }

  });
};
