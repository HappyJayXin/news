$(function() {
  const URL =
    'https://newsapi.org/v2/top-headlines?country=tw&apiKey=727212ea46e34db1ab6a32d34abf7ad5'
  const req = new Request(URL, { method: 'GET' })  

  fetch(req)    
    .then(res => {
      return res.json()
    })
    .then(json => {
      console.log(json)
    })
    .catch(err => {
      alert('未取得資料!')
      console.error('ERROR', err)
    })
})
