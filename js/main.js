/* Interactive E-Book — COVER ONLY */
(function ($) {
  "use strict";

  // ===== Boot =====
  console.log("[BOOT] App started — COVER ONLY");

  // ===== Cache selectors =====
  const $pdf = $("#pdf-Viewr"); 
  const $spinner = $("#spinner");
  const $startBtn = $("#startBtn");

  const rawData = $pdf.attr("data") || "assets/pdf/TaskBook.pdf";
  const basePdf = rawData.split("#")[0].replace(/ /g, "%20"); // => assets/pdf/Task%20Book.pdf
  const viewerOpts = "toolbar=0&navpanes=0&scrollbar=0";

  const pdfUrl = (page) => `${basePdf}#page=${page}&${viewerOpts}`;

  // ===== Loader =====
  function loadPDF(pageNumber) {
    console.log("loaddpage:", pageNumber);

    $spinner.css("display", "flex");

    const url = pdfUrl(pageNumber);
    $pdf.attr("data", url);
    console.log("data obj->", url);

    // hide spinner
    $pdf.off("load").on("load", function () {
      console.log("[COVER] PDF load event — hide spinner");
      $spinner.hide();
    });

    // safety altrnetive
    setTimeout(function () {
      if ($spinner.is(":visible")) {
        console.log("(fallback)");
        $spinner.hide();
      }
    }, 1200);
  }

  // Screen cover
  function renderCover() {
    console.log("[VIEW] renderCover()");
    loadPDF(1);
    $startBtn.prop("disabled", false);
  }

  $startBtn.on("click", function () {
    console.log("[UI] Start clicked — (Next step: LESSON later)");
    $(this).prop("disabled", true).text("Loading…");
    setTimeout(() => $(this).prop("disabled", false).text("Start 💡"), 400);
  });

  renderCover();
})(jQuery);
