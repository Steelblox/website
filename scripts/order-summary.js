const element = document.getElementById("order-conf");
var opt = {
  margin: 1,
  filename: "steelblox-order-summary.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "px", format: [1162, 1324.23] }
};

$("#download-os").click(function (e) {
  e.preventDefault();
  html2pdf().set(opt).from(element).save();
});
