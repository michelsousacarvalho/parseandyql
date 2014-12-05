
Parse.Cloud.define("requestInformation", function(request, response) {
		 var Content = Parse.Object.extend("ContentHtml",{}, {
		    requestNoticeWithYQLAndSave:function(url) {
				var cont = new Content();
		   		var formatURL = "select * from html where url=\""+url+"\" and xpath='//div[contains(@id,\"materia-letra\")]//p'";
		   		var apiURLYQL = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent(formatURL) + "&format=json&diagnostics=true&callback=";
		   		Parse.Cloud.httpRequest({
		   			url:apiURLYQL,
		   			headers : {
		   				 'Content-Type': 'application/json;encoding=utf8;charset=utf-8'
		   			}, success: function(httpResponse){
		   				var jsonObj = JSON.parse(httpResponse.buffer);
						var contentHTMLParsed = jsonObj.query.results;					
		   					var content = new Content();
							content.set("content",contentHTMLParsed);
							content.save();
							return content;
		   			}, error:function() {
		   			  	console.error('Request failed with response code ' + httpResponse.status) ;
		   			 }
		   		});
		   	}
		 });
		 var cont = new Content.requestNoticeWithYQLAndSave("http://g1.globo.com/economia/midia-e-marketing/noticia/2014/11/empresas-brasileiras-fazem-pao-de-queijo-day-nos-estados-unidos.html");
});

