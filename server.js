const request = require('request');
const cheerio = require('cheerio');
const PATH = "https://www.ilkkimbuldu.com";
var counter = 0;
for (var i = 1; i < 137; i++) {
  request(PATH+"/page/"+i,(error , response , html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let posts = {};
      $('.list-post').each((i,el)=>{
        getDetail($(el).find('.entry-header .entry-title a').attr('href'));
      })
    }

  });
}

getDetail = (link) =>{
   request(link,(error , response , html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const title   = $('.entry-header h1').text().replace(/\s\s+/g +'');
      const category= $('.entry-footer .cat-links a').text().replace(/\s\s+/g +'');
      const content = $('.entry-content').text().replace(/\s\s+/g +'');
      console.log(title);
      console.log(category);
      console.log(content);
      console.log("*******************************************************");
      console.log("*******************************************************");
      console.log("*******************************************************");
      console.log("*******************************************************");
      counter++;
      console.log(counter);
    }
  });
}


console.log("İşlemler Tamamlandı");
