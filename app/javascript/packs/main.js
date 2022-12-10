let fileName = "";
let formData = {};

$(document).on("turbolinks:load", function() {
  init();
  if (window.location.pathname == "/order") {
    initOrderForm();
  }
});

function init() {
  $("#contact-form").on("submit", function(event) {
    const data = getFormData($("#contact-form"));
    let valid = true;
    let output;

    $.each(data, function(k, v) {
      if (!v) {
        valid = false;
      }
    });

    if (valid) {
      $.post(
        "/contact",
        data,
        function(response) {
          if (response.type == "error") {
            output =
              '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">Nieznany błąd serwera</div>';
          } else {
            output =
              '<div class="alert-success" style="padding:10px; margin-bottom:25px;">Wiadomość wysłana</div>';

            $(".getin_form input").val("");
            $(".getin_form textarea").val("");
          }

          $("#result")
            .hide()
            .html(output)
            .slideDown();
        },
        "json"
      );
    } else {
      output =
        '<div class="alert-danger" style="padding:10px; margin-bottom:25px;">Proszę uzupełnić brkaujące pola</div>';
      $("#result")
        .hide()
        .html(output)
        .slideDown();
    }
    event.preventDefault();
  });

  $("#fileToUpload").on("change", function() {
    $("#fileToUpload")
      .closest("form")
      .ajaxSubmit({
        url: "/calculate",
        type: "post",
        success: function(data) {
          calculated(data);
          $("#process-info-loading").hide();
          $(".process-info-conatiner").show();
        },
        beforeSend: function() {
          resetCalc();
        },
        uploadProgress: function(event, position, total, percentComplete) {
          $(".process-info-conatiner").hide();
          $("#process-info-loading").show();
        }
      });
  });

  $("#model-quality").on("change", function() {
    $.post(
      "/calculate/quality",
      {
        quality: $("#model-quality").val(),
        color: $("#model-color").val() ? $("#model-color").val() : "black",
        filename: fileName
      },
      function(data) {
        updateCalc(data);
      }
    );
  });
  $("#model-color").on("change", function() {
    if (!$("#model-quality").val()) {
      $("#model-quality").val(2);
    }

    $.post(
      "/calculate/quality",
      {
        quality: $("#model-quality").val(),
        color: $("#model-color").val(),
        filename: fileName
      },
      function(data) {
        updateCalc(data);
      }
    );
  });
}

function updateCalc(data) {
  prepareCheckout(data);
  $("#step-3").removeClass("disabled-step");
  $("#step-4").removeClass("disabled-step");
  $("#calculated-price").html("Cena: <b>" + data.price + " zł</b>");
  $("#calculated-time").html("Przybliony czas wysyłki: <b> 4 dni </b>");
}

function resetCalc() {
  $("#step-2").addClass("disabled-step");
  $("#step-3").addClass("disabled-step");
  $("#step-4").addClass("disabled-step");
  $("#calculated-price").html("Cena: <b> - </b>");
  $("#calculated-time").html("Przybliżony czas wysyłki: <b> - </b>");
  $("#model-quality").val(undefined);
  $("#model-color").val(undefined);
}

function prepareCheckout(data) {
  let url = window.location.href + "order";
  let params;
  data = {
    price: data.price,
    fileName: data.fileName,
    color: $("#model-color").val(),
    quality: $("#model-quality").val()
  };
  params = Object.keys(data)
    .map(function(k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    })
    .join("&");
  params = btoa(unescape(encodeURIComponent(params)));
  url = url + "?orderHash=" + params;
  $("#submit_checkout_btn").attr("href", url);
}

function calculated(data) {
  fileName = data.filename;
  const file = $("#fileToUpload")
    .val()
    .split("\\");
  $("#submit_btn").text(file[file.length - 1]);
  $("#step-2").removeClass("disabled-step");
}

function initOrderForm() {
  const params = new URLSearchParams(
    atob(window.location.search.split("=")[1])
  );
  formData = {
    price: params.get("price"),
    filename: params.get("fileName"),
    color: params.get("color"),
    quality: params.get("quality")
  };
  $("#order-info-done").hide();
  $("#order-info-loading").hide();
  $("#madeline-holder").attr("file-name", formData.filename);
  $("#madeline-holder").attr("file-color", formData.color);

  $("input[name='calculation']").val(formData.price);
  $("input[name='filename']").val(formData.filename);
  $("input[name='color']").val(formData.color);
  $("input[name='quality']").val(formData.quality);

  $("#order-info-form").on("submit", function(event) {
    const data = getFormData($(this));
    $("#order-info").hide();
    $("#order-info-loading").show();
    $.post("/process_order", data, function(response) {
      $("#order-info-loading").hide();
      $("#order-info-done").show();
    });

    event.preventDefault();
  });
}

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}
