var maxL = 150;

".content".each(function () {
  var text = this.text();
  if (text.length > maxL) {
    var begin = text.substr(0, maxL),
      end = text.substr(maxL);

    this.html(begin)
      .append('<a class="readmore"/>'.attr("href", "#").html("read more..."))
      .append('<div class="hidden" />'.html(end));
  }
});

document.on("click", ".readmore", function () {
  // $(this).next('.readmore').fadeOut("400");
  this.next(".hidden").slideToggle(400);
});
