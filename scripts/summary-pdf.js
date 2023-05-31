$("#btnPrint").click(function () {
  var summContents = $("#form2-summ").html();
  var imgSrc = $("#hero-img").attr("src");
  var printWindow = window.open(" ", " ", "height=400,width=800");
  var product = $(".config-header").text();
  var fName = $("#Adu-First-Name").val();
  var lName = $("#Adu-Last-Name").val();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 2).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  printWindow.document.write(
    "<html><head><title>Steelblox Configurator PDF Summary</title>"
  );
  printWindow.document.write(
    '<link rel ="stylesheet" href="https://32ql2.csb.app/summary.css"/></head><body >'
  );
  // printWindow.document.write(img);
  printWindow.document.write(
    `<div class="first-page_wrap">
      <div class="header-wrap">
        <img class="logo" width="240px" src="https://uploads-ssl.webflow.com/60247b4d3be37651b31b5969/605d07971f2f285bc5d7b630_Logo%20-%20Web.svg"/>
        <div class="contact-wrap"><p>Contact us</p><p>805.324.7751</p><p>sales@steelblox.com</p></div>
      </div>
      <div class="summary-hero_wrap">
        <img class="summary-hero_img" src="${imgSrc}"/>
        <div class="summary-hero_content-wrap">
          <div>
            <h1>${product}</h1>
            <p>${fName} ${lName}</p>
          </div>
          <div>
            <p>Proposal Valid Until:</p>
            <p>${today}</p>
          </div>
        </div>
      </div>
    </div>`
  );
  printWindow.document.write(summContents);
  printWindow.document.write("</body></html>");
  setTimeout(function () {
    printWindow.print();
    printWindow.document.close();
  }, 2000);
});

// Quote is valid for 30 days
// pricing subject to change without notice
// place in top right - across from Project summary
