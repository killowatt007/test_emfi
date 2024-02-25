const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEyYjc0NTliOWQ2MTE1MzQwZTg5NGUyODVkZjJlYWM0ZWFmYWNmZTQyODA4OTdlY2MzOWQ4YjBjOThlOWUwZGZmOWY3MzJiYzVmOTQ3YTk1In0.eyJhdWQiOiIwNGQwOTc0ZS1kYzQ0LTQxYjctODY0ZS05ZWY5NDhkM2E1ZjYiLCJqdGkiOiIxMmI3NDU5YjlkNjExNTM0MGU4OTRlMjg1ZGYyZWFjNGVhZmFjZmU0MjgwODk3ZWNjMzlkOGIwYzk4ZTllMGRmZjlmNzMyYmM1Zjk0N2E5NSIsImlhdCI6MTcwODg3NzgyMCwibmJmIjoxNzA4ODc3ODIwLCJleHAiOjE3MDg5NjQyMjAsInN1YiI6IjEwNzE3NDc4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTkwNzY2LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZjcyYWQ1MWMtMGNhYy00OTVjLWI2NDctODRlZDk3Y2FjMDI3In0.ofOCwy2XUW0AUp7gMNQO_qAUWu8FBC8lph_YXVcRPCxGzBlRmf218BX2V7IZOf02tBapQei5_18Swfjs8KzJvDZZUmPEsaXMDkMlwxuz-JvHzV2NxPVvCBMTuY-SGUdFX_Jeww9WpIO20w_FiYn66BHqriRb4d18Ld8heDVqYCNQAW5pFJVQksZVTMmeP2MdCld0Txv0ccWrPRXomBzOP9NfnwNao-1r6wha55V19SAWrbBuRdm8CZcKujnFRqOek3Egmkmze231j0w05DDXhc9Ns6LsUtQx1zob19hRizKTCkdGU2h42dk4zPeirbSeXTN4Q1x9hOGAfVsUmhHKog';
const refresh_token = 'def502000fe2fe9a333144489b024f77cb0d486446919166018c2d0f68b103e2ba30bda6e3144a829a8f6b3f0e0a1710b445a5c76c15225e2149df92fc98dd56e2b653e131182b505de55a0012c58d18328c4a12d9227967a0add10071d3b1b724c4f0ac6444326fd8d1ddb438d34c675052b917d1ca7531b269261cefb80d4bd4c24a442413dbe7db7e7a67754ab2cbdccb4759d65377617bc82a03a432d1dbc4de6805ef6bba6e0aa3ba42ece11c19b576219e3b093faa5dc26c3aeed5c17f75e4aee9e3246b2061d2e139435378a9bd87ca03795c5218e027f20d0d0bc150f0806e03bbd22e4fac696142eaa53084abc1b3a4f4008a181c43a70086737911ca0fe328eea8dc5f4d27dbf636e42e7ac4aef9f8fc6d2e3f3c4a605c4aaa905a480cb7961e474b2a3e890eff38728a71cdb37111a53e2039c26ed821fc6f071fcb17ce88c828fdbd9e787139e374f3e31db703226ec4741ea458aefd8413ffd0c31f62279454b73a9f624f1a232fd23debaeed0b8b475978cf2c23746b0d5c5a74a4fac2a71217a526b8436459709c0c6c826c99ed35b58cc1ca953e526c790086ecfe0c7965c39b3c90102ba4bb19f753882a6fa2a73bb90660f1f52aea083fc98d4e6300057a1276d2a9192ad7223ed038a97db4c2d8b4120586d14a09bff340713a9f68862bbee7f7848d06a7';

const formattedTime = (unix_timestamp) => {
  const date = new Date(unix_timestamp * 1000)
  const hours = date.getHours()
  const minutes = "0" + date.getMinutes()
  const seconds = "0" + date.getSeconds()
  const result = date.toLocaleDateString("en-US") +' '+ hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

  return result
}

const table = {
  app: null,
  page: 1,

  render: function() {
    let html = ''

    this.app = $('#app')

    html =
      '<div class="container mt-5">'+
        '<div class="table-container">'+
          '<div class="spinner-border" role="status">'+
            '<span class="visually-hidden"></span>'+
          '</div>'+
          '<table class="table table-dark table-striped">'+
            '<thead>'+
              '<tr>'+
                '<th>Название сделки</th>'+
                '<th>Бюджет</th>'+
                '<th>Ответственный</th>'+
                '<th>Создания</th>'+
                '<th>Изменения</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
            '</tbody>'+
          '</table>'+
          '<div class="footer d-flex justify-content-between">'+
            '<div class="display">'+this.renderDisplay()+'</div>'+
            '<div class="pagin">'+this.renderPagination()+'</div>'+
          '</div>'+
        '</div>'+
      '</div>'

    this.app.html(html)
    
    this.updateData()
    this.triggers()
  },

  renderPagination: function() {
    let html = ''

    html =
      '<nav aria-label="Page navigation example">'+
        '<ul class="pagination">'+
          '<li class="page-item prev">'+
            '<a class="page-link" href="#">'+
              '<span aria-hidden="true">&laquo; Назад</span>'+
            '</a>'+
          '</li>'+
          '<li class="page-item next">'+
            '<a class="page-link" href="#">'+
              '<span aria-hidden="true">Вперед &raquo;</span>'+
            '</a>'+
          '</li>'+
        '</ul>'+
      '</nav>'
    
    return html
  },

  renderDisplay: function() {
    let html = ''

    html =
      '<div class="d-flex">'+
        '<div style="line-height:34px;width:100px;">Кол-во: </div>'+
        '<select class="form-select">'+
          '<option value="0">Все записи</option>'+
          '<option value="2">2</option>'+
          '<option value="5" selected>5</option>'+
          '<option value="10">10</option>'+
        '</select>'+
      '</div>'

    return html
  },

  renderData: function(leads) {
    let html = ''

    if (leads) {
      html = leads.map(item => {
        let html = ''
  
        html =
          '<tr>'+
            '<td>'+item.name+'</td>'+
            '<td>'+item.price+'</td>'+
            '<td>'+item.responsible_user_id+'</td>'+
            '<td>'+formattedTime(item.created_at)+'</td>'+
            '<td>'+formattedTime(item.updated_at)+'</td>'+
          '</tr>'
        
        return html
      }).join('')
    }

    return html
  },

  controlPagination: function(links) {
    if (links && links.prev) {
      this.app.find('.pagin .prev a').removeClass('disabled')
    }
    else {
      this.app.find('.pagin .prev a').addClass('disabled', 'disabled')
    }

    if (links && links.next) {
      this.app.find('.pagin .next a').removeClass('disabled')
    }
    else {
      this.app.find('.pagin .next a').addClass('disabled', 'disabled')
    }
  },

  getParams: function() {
    const data = {}
    const limit = Number(this.app.find('.display select').find(':selected').val())

    if (limit) {
      data.limit = limit
      data.page = this.page
    }

    return new URLSearchParams(data).toString()
  },

  updateData: async function() {
    let data = null
    let leads = null
    let links = null

    this.app.find('.table-container').addClass('load')

    data = await this.fetchData()

    if (data) {
      leads = data._embedded.leads
      links = data._links
    }

    this.app.find('table tbody').html(this.renderData(leads))
    this.controlPagination(links)

    this.app.find('.table-container').removeClass('load')
  },

  triggers: function() {
    const self = this

    this.app.find('.pagin .prev, .pagin .next').click(function() {
      const isDisabled = $(this).find('a').hasClass('disabled')

      if (!isDisabled) {
        const isNext = $(this).hasClass('next')

        if (isNext)
          self.page++
        else
          self.page--
        
        self.updateData()
      }
    })
    this.app.find('.display select').change(() => {
      this.page = 1
      this.updateData()
    })
  },

  fetchData: async function() {
    let data = null
    const url = 'https://denps448.amocrm.ru/api/v4/leads?'+this.getParams();
    const response = await fetch(`https://proxy.cors.sh/${url}`, { 
      headers: { 
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token,
        'x-cors-api-key': 'temp_dccb2bede90abd2c6d7e606adc35a7cd'
      }
    })

    if (response.ok) {
      data = await response.json()
    }
    else {
      alert('Ошибка загрузки данных')
    }

    return data
  }
}

table.render()




