/* Interactive E-Book — COVER ONLY */
(function ($) {
  "use strict";

  // ===== Boot =====
  console.log("[BOOT] App started — COVER ONLY");

  // ===== Cache selectors =====
  const $pdf = $("#pdf-Viewr");
  const $spinner = $("#spinner");
  const $startBtn = $("#startBtn");

  const rawData = $pdf.attr("data") || "assets/pdf/coverBook.pdf";
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

  /* =====================[ additions without touching your code above ]===================== */

  // بسيط: تعريف عناصر الواجهه الجديدة لو كانت موجودة بـ HTML
  const $lessonUI = $("#lesson-controls");
  const $quizBox = $("#quizBox");
  const $btnAudio = $("#btnAudio");
  const $btnNext = $("#btnNext");
  const narration = document.getElementById("narration");

  // ترتيب الصفحات داخل نفس PDF (عدّل الأرقام لو غير هيك)
  const PAGES = { cover: 1, lesson: 2, quiz: 3 };

  // اظهار/اخفاء واجهات وتحميل الصفحة المطلوبة
  function go(step) {
    if (step === "cover") {
      $startBtn.removeClass("hide").prop("disabled", false).text("Start 💡");
      $lessonUI.addClass("hide");
      $quizBox.addClass("hide");
      try {
        narration && narration.pause();
      } catch (e) {}
      loadPDF(PAGES.cover);
      return;
    }
    if (step === "lesson") {
      $startBtn.addClass("hide");
      $lessonUI.removeClass("hide");
      $quizBox.addClass("hide");
      loadPDF(PAGES.lesson);
      return;
    }
    if (step === "quiz") {
      $startBtn.addClass("hide");
      $lessonUI.addClass("hide");
      $quizBox.removeClass("hide");
      try {
        narration && narration.pause();
      } catch (e) {}
      loadPDF(PAGES.quiz);
      return;
    }
  }

  $startBtn.on("click", function () {
    setTimeout(function () {
      go("lesson");
    }, 450);
  });

  // Play/Pause للصوت
  $btnAudio.on("click", function () {
    if (!narration) return;
    if (narration.paused) {
      narration.play().catch(function () {});
      $btnAudio.text("❚❚ Pause").attr("aria-pressed", "true");
    } else {
      narration.pause();
      $btnAudio.text("▶ Play").attr("aria-pressed", "false");
    }
  });

  // Next → Quiz
  $btnNext.on("click", function () {
    go("quiz");
  });

  $quizBox.on("submit", function (e) {
    e.preventDefault();
    const selected = $quizBox.find('input[name="q1"]:checked').get(0);
    if (!selected) {
      alert("Please choose an answer.");
      return;
    }
    if (selected.hasAttribute("data-correct")) {
      alert("Correct!");
    } else {
      alert("Try Again!");
    }
  });
})(jQuery);
