$(function() {
  const URL =
    'https://newsapi.org/v2/top-headlines?country=tw&apiKey=727212ea46e34db1ab6a32d34abf7ad5'
  const req = new Request(URL, { method: 'GET' })

  $('.navbar-brand').on('click', ()=> { return false })

  // 載入前模組
  for (let a = 0; a < 20; a++) {
    $('#newsList').append(
      `<a
      href="#"
      class="list-group-item list-group-item-action flex-column align-items-start"
    >
      <div class="row">          
        <div class="htmlModal_time col-1 mb-3"></div>  
        <div class="htmlModal_title col-12 mb-3"></div>
      </div> 
      <div class="row">
        <div class="col-12 htmlModal_content mb-1"></div>
        <div class="col-1 htmlModal_name offset-11"></div>
      </div>
    </a>`
    )
  }

  // ajax
  fetch(req)
    .then(res => {
      return res.json()
    })
    .then(json => {
      // show data to html
      showData(json)
    })
    .catch(err => {
      // can't not get data
      $('.alert').removeClass('d-none')
      console.error('ERROR', err)
    })

  function showData(data) {
    if (data.status === 'ok') {
      // article count length
      const newsLen = data.articles.length
      // console.log(data)

      $('#newsList').html('')
      for (let a = 0; a < newsLen; a++) {
        $('#newsList').append(
          `<a
          href=""
          class="a list-group-item list-group-item-action flex-column align-items-start"
        >
        <div class="articleId sr-only">${a}</div>
        <div class="row">          
          <small class="col-12">${transTime(
            data.articles[a].publishedAt
          )}</small>  
          <h3 class="mb-3 col-12 text-primary">${
            data.articles[a].title
          }</h3>          
        </div>          
          <p class="mb-1 text-truncate" style="max-width: 50rem">
            ${data.articles[a].description}
          </p>
          <small class="float-right">${data.articles[a].source.name}</small>
        </a>`
        )
      }
    }
    // if item click change page and show news detail
    getDetail(data)
  }

  // 轉換時間格式
  function transTime(time) {
    return new Date(+new Date(time) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, ' ')
      .replace(/\.[\d]{3}Z/, '')
  }

  function getDetail(data) {
    // click news list
    $('#newsList a').on('click', function(e) {
      e.preventDefault()
      // console.log(location.pathname.slice(1))

      let getid = new Promise(resolve =>
        resolve(
          $(this)
            .find('.articleId')
            .text()
        )
      )
      const process = async () => {
        let id = await getid
        let state = { id: id }
        window.history.pushState(state, null, `${location.pathname}/${id}`)

        $('#content')
          .removeClass('movein')
          .addClass('moveout')
        // wait 0.5 second
        await new Promise(resolve => setTimeout(resolve, 500))
        $('#content').hide()
        $('#content_detail').show()
        $('#content_detail').append(`
          <div class="card my-4 border-darkblue">
            <img
              class="card-img-bottom img-thumbnail"
              src="${data.articles[id].urlToImage}"          
            />
            <div class="card-body">
              <h3 class="card-title">${data.articles[id].title}</h3>
              <p class="card-text">
                <small class="text-muted">${transTime(
                  data.articles[id].publishedAt
                )}</small>
              </p>
              <p class="card-text">
                ${data.articles[id].description}
              </p>
              <div class="row justify-content-end">            
                <a class="col-12 text-right" target="_blank"
                  href="${data.articles[id].url}"
                  >${data.articles[id].source.name}</a
                >
              </div>
            </div>            
          </div>
        `)
        $('#backPage img').attr('src', 'img/arrow.svg')
      }
      process()
    })
  }

  // 返回
  $(window).on('popstate', function(e) {    
    if (!history.state) {
      $('#content_detail').html('')
      $('#content')
        .show()
        .removeClass('moveout')
        .addClass('movein')
      $('#backPage img').attr('src', '')
    }
  })
})
