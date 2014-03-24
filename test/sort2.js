

$(document).ready(function(){
$("div").sort(function (prev, next) {
    return parseInt(next.dataset.sort) - parseInt(prev.dataset.sort);
}).appendTo("body");
})