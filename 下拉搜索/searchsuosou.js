(function($){
		$.expr[":"].searchableSelectContains = $.expr.createPseudo(function(arg) {
			return function( elem ) {
					return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
			};
		});
	 $.searchData=function(parameter){
		 this.parameter=parameter;
		 var _this=this;
		 parameter.on('keyup', function(event){
	  	      if(event.which != 13 && event.which != 27 && event.which != 38 && event.which != 40)
	  	        _this.filter();	  	      
	     });
	 };
	 var $ss=$.searchData;
	 $ss.fn = $ss.prototype = {
			version: '0.0.1'
	 };
	 $ss.fn.extend = $ss.extend = $.extend;
	 $ss.fn.extend({
	  	filter: function(){
  		   var _this=this;
  		   var id=(_this.parameter.selector);
  		   var choicpara=(id+" .searchable-select-input");
  		   var text = $(""+choicpara+"").val();
  		   $(""+id+" .searchable-select-items").find('.searchable-select-item').addClass('searchable-select-hide');
  		   $(""+id+" .searchable-select-items").find('.searchable-select-item:searchableSelectContains('+text+')').removeClass('searchable-select-hide');
	  	},
	 });
     $.fn.searchData = function(parameter){
    	 var sS = new $ss($(this), parameter);
    	 return this;
     };
})(jQuery);
