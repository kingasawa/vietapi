/**
 * V1Controller
 * @Author      :: Trần Cát Khánh
 * @description :: REST API V1 by VietAPI
 * @help        :: See http://vietapi.net/help
 */
var request = require('request');
var imdb = require('imdb-api');

module.exports = {
	vcb: (req,res) => {
    let params = req.allParams();
    request.get({
      url: 'https://santienao.com/api/v1/bank_accounts/'+params.number
    },function(error,response,body){
      var data = JSON.parse(body);
      return res.json(data);
    })
  },

  imdb: (req,res) => {
    let params = req.allParams();
    imdb.getById(params.title, function(err, things) {
      res.json(things);
    });
  },

  video: (req,res) => {
    let params = req.allParams();
    console.log(params.url);
    request.get({
      url: 'https://api.blogit.vn/getlink.php?link='+params.url
    },function(error,response,body){
      var data = JSON.parse(body);
      data.result.data.link[0].file = data.result.data.link[0].file.replace('api.blogit.vn','vietapi.net');
      data.result.data.link[1].file = data.result.data.link[1].file.replace('api.blogit.vn','vietapi.net');
      data.result.data.link[2].file = data.result.data.link[2].file.replace('api.blogit.vn','vietapi.net');
      if (data.result.server == 'Youtube') {
        data.result.data.link[3].file = data.result.data.link[3].file.replace('api.blogit.vn','vietapi.net');
        data.result.data.link[4].file = data.result.data.link[4].file.replace('api.blogit.vn','vietapi.net');
      }
      return res.json(data);
    })
  }
};

