$(function() {
  const URL =
    'https://newsapi.org/v2/top-headlines?country=tw&apiKey=727212ea46e34db1ab6a32d34abf7ad5'
  const req = new Request(URL, {method: 'GET'})

  fetch(req)
    .then(res => {
      return res.json()
    })
    .then(json => {
      showData(json)
    })
    .catch(err => {
      $('.alert').removeClass('d-none')
      console.error('ERROR', err)
    })

  function showData(data) {
    if (data.status === 'ok') {
      const newsLen = data.articles.length
      console.log(data)

      for(let a = 0; a < newsLen; a++) {
        $('#newsList').append(
          `<a
          href="#"
          class="list-group-item list-group-item-action flex-column align-items-start"
        >
        <div class="row">          
          <small class="col-12">${transTime(
            data.articles[a].publishedAt
          )}</small>  
          <h3 class="mb-3 col-12">${data.articles[a].title}</h3>          
        </div>          
          <p class="mb-1 text-truncate" style="max-width: 50rem">
            ${data.articles[a].description}
          </p>
          <small class="float-right">${data.articles[a].source.name}</small>
        </a>`
        )
      }      
    }
  }

  // 轉換時間格式
  function transTime(time) {
    return new Date(+new Date(time) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '')
  }
})
