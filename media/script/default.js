$(document).ready(function(){
		// prettyprint代码高亮需要
		$('pre').addClass('prettyprint');
		prettyPrint();

		//添加a的链接样式
		$('.content a').each(function(index,element){
				var href = $(this).attr('href');
				if(href){
					if(href.indexOf('#') == 0){
					}else if (href.indexOf('/') == 0 ){
					}else if (href.toLowerCase().indexOf('localhost')>-1 ){
					}else if (href.toLowerCase().indexOf('yuliu.org')>-1 ){
					}else if ($(element).has('img').length){
					}else{
						$(this).attr('target','_blank');
						$(this).addClass('external');
					}
				}
		});

		// 根据文章h1,h2等标题自动生成文章目录  div#toc
		var toctmpl = '<p>'+ $('.title h1').text() +'</p>';
		toctmpl += '<ul>';
		$(".post h1,.post h2,.post h3").each(function(i) {
				var current = $(this);
				current.prop("id", "title" + i);
				toctmpl += ("<li class='" +current.prop("tagName").toLowerCase() + "'><a id='pageindex" + i + "' href='#title" +
					i + "' data-id='title" + i + "'>" + current.html() + "</a></li>");
		});
		toctmpl += '</ul>';
		if(toctmpl.indexOf('</li>') > -1){
			$("#toc").append(toctmpl);
			var top=$('header').offset().top;
			var left = $('#main').offset().left;
			//var height = $('nav').height();
			var width = $('#main').width();
			$("#toc").css('top', top);
			$("#toc").css('left', left+width+20);
		}

		// 文章目录的跟踪显示
		$(window).load(function(){
				var scrollTop = [];
				$.each($('#toc li a'),function(index,item){
						if(!$(item).attr('data-top')){
							var top = $('#'+$(item).attr('data-id')).offset().top;
							scrollTop.push(top);
							$(item).attr('data-top',top);
						}
				});
				$('#toc li').eq(0).addClass('on');

				$(window).scroll(function(){
						var nowTop = $(window).scrollTop(),index,length = scrollTop.length;
						var step = 40;
						if(nowTop+step > scrollTop[length-1]){
							index = length;
						}else{
							for(var i=length-1;i>=0;i--){
								if( (nowTop+step) >= scrollTop[i]){
									index = i;
									break;
								}
								index=0;
							}
						}
						$('#toc li').removeClass('on');
						$('#toc li').eq(index).addClass('on');
				});
		});

		// 设置div#toc的最大高度。
		$('#toc').css('max-height',$(window).height()-80);


});


//js加载函数
var PSJS ={};

PSJS.loadScript = function(file,callback) {
	var _doc = document.getElementsByTagName('head')[0];
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', file);
	_doc.appendChild(js);

	if (!/*@cc_on!@*/0) { //if not IE
		//Firefox2、Firefox3、Safari3.1+、Opera9.6+ support js.onload
		js.onload = function () {
			callback();
		}
	} else {
		//IE6、IE7 support js.onreadystatechange
		js.onreadystatechange = function () {
			if (js.readyState == 'loaded' || js.readyState == 'complete') {
				callback();
			}
		}
	}
	return false;
}
