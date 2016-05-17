;(function($){
        /*匹配列表数据*/
		$.expr[":"].searchableSelectContains = $.expr.createPseudo(function(arg) {
			return function( elem ) {
					return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
			};
		});
     /*初始加载入口*/
	 $.searchData=function(parameter){
		 this.parameter=parameter;
		 var _this=this;
         _this.init();
		 parameter.on('keyup', function(event){
	  	      if(event.which != 13 && event.which != 27 && event.which != 38 && event.which != 40)
	  	        _this.filter();
              event.stopPropagation();
	     });
		 $(""+parameter.selector+" .searchable-select-item").on('click',function(){
			  var secId=$(this).attr("id");
			  _this.ItemClick(secId);
             return false;
		 });
         var domClass="."+$(""+parameter.selector+"").attr("class");
		  $(""+domClass+", .searchable-select-dropdown ").on("mouseleave",function(){
			   _this.deLeave();
              return false;
		  });
	 };
	 var $ss=$.searchData;
	 $ss.fn = $ss.prototype = {
			version: '0.0.1'
	 };
	 $ss.fn.extend = $ss.extend = $.extend;
	 $ss.fn.extend({
         /*初始加载函数*/
         init:function(){
             var _this=this;
             var thisId=_this.parameter.selector;
             $(""+thisId+"").on("click",function(){
                 $(""+thisId+"").children().removeClass("searchable-select-hide");
                 $(""+thisId+"").children().show();
             });
         },
         /*匹配输入函数*/
	  	filter: function(){
  		   var id=(this.parameter.selector);
  		   var choicPara=(id+" .searchable-select-input");
  		   var text = $(""+choicPara+"").val();
  		   $(""+id+" .searchable-select-items").find('.searchable-select-item').addClass('searchable-select-hide');
  		   $(""+id+" .searchable-select-items").find('.searchable-select-item:searchableSelectContains('+text+')').removeClass('searchable-select-hide');
	  	},
         /*列表选择事件*/
		ItemClick: function(sectedId){
			 var deThisId="#"+sectedId;
			$(""+deThisId+"").addClass("selected").siblings().removeClass("selected");
			var deParentId="#"+$(""+deThisId+"").parent().attr("id");
			var val=$(""+deParentId+"  div.selected").text();
			$(""+this.parameter.selector+" .searchable-select-holder").text(val);
            $("div.searchable-select-dropdown").addClass("searchable-select-hide");
			var newClass=$(""+this.parameter.selector+" .searchable-select-dropdown").selector;
			$(""+newClass+"").addClass("searchable-select-hide");
		},
         /*鼠标离开事件*/
		deLeave:function(){
            $(".searchable-select-dropdown").addClass("searchable-select-hide");
		},
	 });
     $.fn.searchData = function(parameter){
    	   new $ss($(this), parameter);
    	 return this;
     };
})(jQuery);
