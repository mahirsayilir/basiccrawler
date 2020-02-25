const request = require('request');
const cheerio = require('cheerio');
const PATH = "https://www.instagram.com/explore/tags/cekilis/";
let counter = 0;

request(PATH,(error , response , html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('script[type="text/javascript"]').each((i,el)=>{
      if (i == 3) {
        var data = $(el).html();
        var data = data.replace(/window._sharedData =/g,"");
        var data = data.replace(/;/g,"");
        const dataObject = JSON.parse(data);
        var deneme = dataObject.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges.map(function(detail , index){
          var info = {
            "image" : detail.node.display_url,
            "shortcode" : detail.node.shortcode,
            "Açıklama"  : detail.node.edge_media_to_caption.edges[0].node.text
          }
          counter++;
          return info;
        });
        console.log(deneme);
        console.log("Counted Post : " + counter);
      /**
       *   const dataObject = JSON.parse(data);
         console.log(dataObject);
       */
      }
    });
    console.log("Crawling is finished");
  }else {
    console.log(error);
  }

});
