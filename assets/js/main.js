$(function() {
  var socket = io.sails.connect();
  socket.get('/socket');

  $('#getDataMovie').submit(function(g) {
    $('button.getDataMovie').find('i').removeClass('sr-only');
    g.preventDefault();
    var data = $('#getDataMovie').serialize();
    socket.post('/v1/getmovie?'+data);
  });

  $('#getActorName').submit(function(g) {
    $('button.getActorName').find('i').removeClass('sr-only');
    g.preventDefault();
    var data = $('#getActorName').serialize();
    socket.post('/v1/getactor?'+data);
  });

  socket.on('find/data',function(recieve) {
    $('button.getDataMovie').find('i').addClass('sr-only');
    $('#result-data .hinhanh-phim img').attr('src',recieve.msg.poster);
    $('#result-data .dulieu-phim h2').text(recieve.msg.title);
    $('#result-data .dulieu-phim').find('h5.time-phim').html('<span class="glyphicon glyphicon-time"></span> '+recieve.msg.runtime);
    $('#result-data .dulieu-phim').find('h5.year-phim').html('<span class="glyphicon glyphicon-calendar"></span> '+recieve.msg._year_data);
    $('#result-data .dulieu-phim').find('span.daodien-phim').text(recieve.msg.director);
    $('#result-data .dulieu-phim').find('span.dienvien-phim').text(recieve.msg.actors);
    $('#result-data .dulieu-phim').find('span.diem-phim').text(recieve.msg.rating);
    $('#result-data .dulieu-phim').find('span.theloai-phim').text(recieve.msg.genres);
    $('#result-nodata').addClass('sr-only');
    $('#result-data').removeClass('sr-only');
  });
  socket.on('find/nodata',function(){
    $('#result-nodata').html('<div class="alert alert-danger"> <strong>Lỗi!</strong> Không tìm thấy dữ liệu yêu cầu. </div>');
    $('#result-data').removeClass('sr-only');
    $('#result-nodata').addClass('sr-only');
  });

  socket.on('find/actors',function(recieve) {
    recieve.msg.forEach(function(data) {
      console.log(data);
      var newThumb = data.thumbnail.split('@@.');
      var actorThumb = newThumb[0]+'@@';
      $('#result-actor .hinhanh-dienvien img').attr('src',actorThumb);
      $('#result-actor .dulieu-dienvien h2').text(data.title);
      $('#result-actor .dulieu-dienvien').find('h5.id-actor').html(data.id);
      $('#result-noactor').addClass('sr-only');
      $('#result-actor').removeClass('sr-only');
    })
  });


});
