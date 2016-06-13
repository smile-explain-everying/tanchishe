 $(function(){
 	$('.imga')
    .fadeToggle(2000)
    $('.imgb')
    .animate({width:'+=1200'},500)
    // .animate({opacity:0},2000)
    $('.imgc')
    .animate({left:'+=400'},500)
    .animate({bottom:'+=250'},500)
    $('.imgd')
    .animate({top:'+=300'},500)
    .animate({right:430},500)
    $('.imge')
    .fadeToggle(5000)
    .on('click',function(){
       $('.sence1').hide()
       $('.sence2').show()
    })
    $(document).on('keydown',function(){
    	 $('.sence1').hide()
       $('.sence2').show()
    })

    $('.she')
    .last()
    .addClass('shetou')

    var hang;
    var she = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    var shiwu = null;
    var timerID = null;
    var dirt = 39;


//  公共函数

    // 坐标函数
    var zb2id = function(x,y){
       return  x +'-'+ y;
    }
    // 放食物函数
    var fangshiwu = function(){
        var _x = Math.floor(Math.random()*hang);
        var _y = Math.floor(Math.random()*hang);
    
        $('#'+zb2id(_x,_y)).addClass('food');
        return {x:_x,y:_y};       //返回一个数据
    }
    // 布置场景函数
    var buchangjing = function(  ){
        hang = hang || 20;
        var 
        i  = 0,
        j = 0,
        wh = Math.floor(600/hang),
        sence = $('#sence');
        sence.empty().width(wh*hang).height(wh*hang);
        for(;i<hang;i++){
            for(j=0;j<hang;j++){
                $('<div>')
                .addClass('block')
                .attr('id',zb2id(i,j))
                .width(wh-2)
                .height(wh-2)
                .appendTo(sence)
            }
        }
         
   
}


var speed = 200;
var startGame = function(){
     clearInterval(timerID)

    timerID = setInterval(move,speed)
}
var pauseGame = function(){
    clearInterval(timerID)
}



var huashe = function(){
    she.forEach(function(v){
  $('#'+zb2id(v.x,v.y)).addClass('she');
   }) 
       
}
//主体逻辑
buchangjing();
food = fangshiwu(); 
huashe();
// 事件
    // 开始 结束 重新开始 的点击事件
$('.button li[data-cotroll]').bind('click',function(){

    // if(timerID){return};
    var str = $(this).attr('data-cotroll')
    if(str  ===  'start'){
        timerID = setInterval(move , 200);
        
    }

    else if(str  ===  'end'){     
        clearInterval(timerID);
    }
    else if( str === 'restart'){
        clearInterval(timerID);
        $('.she').removeClass('she');
        $('.food').removeClass('food');
        console.log($('.she'))
        she = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
        dirt = 39;
        huashe();
        food =fangshiwu();
        $('.tips').hide();
        timerID = setInterval(move,200); 
    }
})

//     // 键盘事件的处理
$(document).bind('keydown',function(e){
        if(e.keyCode !== 37 && e.keyCode !== 38 &&e.keyCode !== 39 &&e.keyCode !== 40){
         return;
        }   
        // 往左的时候不能往右走
        else if(Math.abs(e.keyCode-dirt ) == 2){
            return;
        }
        dirt = e.keyCode;
})
     // 场景选择的点击事件
$('ul li[data-row]').bind('click',function(){
    if(timerID){return};
    hang = Number($(this).attr('data-row'));
    $('li.active').removeClass('active'); //交叉选择器
    $(this).addClass('active')
    buchangjing(); 
    food = fangshiwu(); 
    huashe();
})
    //自定义选行的事件
$('.row').bind('keydown',function(e){
     if(e.keyCode == 13){
        
        hang = $(this).val();
        buchangjing ();
        // $('li[data-row = hang]').addClass('active');
        if(  isNaN(Number(hang)) ){
             buchangjing(hang);
        }else if( hang<5 || hang>40 ){
            alert("请重新输入");
            return;
        }else{
             $('li.active').removeClass('active');
             buchangjing();
             $('li[data-row = '+hang+']').addClass('active');
        }
        buchangjing();
        huashe();
        food = fangshiwu();
       
     }
})

// 让蛇移动的函数
var move=function(){
    var jiutou = she[she.length-1];
    var xintou;
    if(dirt == 39){
     xintou = {x:jiutou.x,y:jiutou.y+1}
    }else if(dirt == 37){
        xintou = {x:jiutou.x,y:jiutou.y-1}
    }else if(dirt == 38){
     xintou = {x:jiutou.x-1,y:jiutou.y}
    }else if(dirt == 40){
     xintou = {x:jiutou.x+1,y:jiutou.y}
    }
    if(xintou.x<0||xintou.x>hang-1||xintou.y<0||xintou.y>hang-1){
        clearInterval(timerID);
        $('.tips').show();
        return;
    }else if(xintou.x === food.x && xintou.y === food.y){
         she.push(xintou);
         $('#'+xintou.x +'-'+xintou.y).addClass('she')
         $('.food').removeClass('food');
         food = fangshiwu();
     }
     // 没有吃到食物
     else{

        she.push(xintou);
         
        $('#'+xintou.x +'-'+xintou.y).addClass('she')
        var weiba = she.shift();
         $('#'+zb2id(weiba.x,weiba.y)).removeClass('she');
    }
 
     
 }

 })