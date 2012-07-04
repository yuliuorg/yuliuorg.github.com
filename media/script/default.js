$(document).ready(function(){
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
                        index = length
                    }else{
                        for(var i=length-1;i>=0;i--){
                            if( (nowTop+step) >= scrollTop[i]){
                                index = i
                                break;
                            }
							index=0;
                        }
                    }
                    $('#toc li').removeClass('on')
                    $('#toc li').eq(index).addClass('on')
                });
            });



});

