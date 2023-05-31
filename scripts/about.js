$(document).ready(function () {
  const founderInfo = {
    al: {
      descr:
        "20+  years in the shipping container business, Al has sold and sourced thousands of shipping containers in North America. His military background in accounting and finance has served him well as an entrepreneur in a space where he has created many popular online marketplaces for the automated sales and modification of shipping containers. Al’s background in workflow process, automation, cost accounting, systems implementation, web design and digital marketing will serve the team well as they aggressively launch the new business model. Al rounds out a powerful team in an industry eager to shift focus to modern building and business techniques.",
      linkedin: "https://www.linkedin.com/in/al-harris-a566b729/",
      img:
        "https://assets.website-files.com/60247b4d3be37651b31b5969/60a2ccac93704bcc83aa4e1c_Al%20Front%20View-p-800.jpeg"
    },

    eric: {
      descr:
        "In 1989, Eric began his career interning with Tom Oswalt Architects as a Junior Designer and Draftsman. His first professional design project, a community of townhomes, still stands in Westlake Village, California. In 1990, Eric started Corbett Design and then later incorporated The Royal Roost in 2004. The scale of his projects organically evolved over the next 21 years from small residential remodels into full scale Architectural and Interior Design. Incorporating in 2011, Eric has since led Kingdom to complete award-winning projects, most recognized by SARA and Dezeen. In 31 years of experience, his work has been seen as futuristic, practical, and relevant.",
      linkedin: "https://www.linkedin.com/in/eric-corbett-56b7b75a/",
      img:
        "https://uploads-ssl.webflow.com/60247b4d3be37651b31b5969/60a2cd7037022de391a80d12_project-image-kingdom-10%402x-371d84f5f7e3c647a99bfb844beb5552fd35b6eea713a5adc467c3d00369e4bc.jpg"
    },
    peter: {
      descr:
        "Peter DeMaria is the founding Principal of DeMaria Design LLC and Logical Homes. The driving design innovator behind the affordable housing/homeless solutions at HBG Modular/Azria Homes, he visualizes architecture fulfilling a critical force on the planet. The recipient of three AIA Honor Awards for Excellence in Design he also received Bank of Manhattan’s Innovative Entrepreneur of the Year Award in recognition of his progressive and committed business development focused on alternative building methodologies and systems. Recognized with national and local design awards, his work has been published and exhibited internationally and also televised on the Sundance Channel, HGTV, CNN, and MSNBC.",
      linkedin: "https://www.linkedin.com/in/peter-demaria-4b021b12/",
      img:
        "https://uploads-ssl.webflow.com/60247b4d3be37651b31b5969/60a2bfed9304af3286d0a73c_Peter%20pic.jpg"
    },
    mark: {
      descr:
        "Mark has been an Officer in four publicly held companies and has had the opportunity to lead several public and private world-class organizations. He began his career at Procter & Gamble and was recruited into senior operating, marketing, strategic planning and general management positions at Blockbuster Entertainment, The Kobacker Company, and EZCorp, in addition to being part of the team that managed the IPO of Linens ‘n Things on the NYSE. During this time, and in addition to base responsibilities, Mark gained invaluable experience in the areas of Mergers, Acquisitions, Capital Raising and Initial Public Offerings. In 2007 Mark founded The Stuart Group, a consultancy focused on managing a unique portfolio of clients in a diverse range of categories and industries. Specializing in high impact business plan development, start-up business cycling, vertical expansion, progressive reorganization and strategic growth planning and as well as CEO/Senior management executive development, Mark blends business vision with operational execution to insure cohesive realization of each business’s objectives.",
      linkedin: "https://www.linkedin.com/in/mark-allen-stuart-97578310/",
      img:
        "https://uploads-ssl.webflow.com/60247b4d3be37651b31b5969/61b7ed92a6f539074930e724_Mark%20Allen%20Stuart.jpg"
    }
  };

  $(".founder__card").click(function (e) {
    e.preventDefault();
    // get founder info
    let founderName = $(this).find(".founder__name").text();
    let founderTitle = $(this).find(".founder__titles").text();
    let arrayTitle = founderTitle.split("|");
    let formatTitle = arrayTitle.join(" | ");
    console.log(founderName, founderTitle);

    // populate popup with found info
    $("#founder-name").text(founderName);
    $("#founder-title").text(formatTitle);
    $("#founder-descr").text(founderInfo[$(this).attr("founder")].descr);
    $("#founder-linkedin").attr(
      "href",
      founderInfo[$(this).attr("founder")].linkedin
    );
    $("#founder-img").attr("src", founderInfo[$(this).attr("founder")].img);
    $("#founder-img").attr("srcset", founderInfo[$(this).attr("founder")].img);

    // open popup
    $(".founders__bio").addClass("active");
    $(".close-btn-v2").addClass("active");
    $("body").css("overflow", "hidden");
  });

  // close popup
  $(".close-btn-v2").click(function () {
    $(".founders__bio").removeClass("active");
    $(".close-btn-v2").removeClass("active");
    $("body").css("overflow", "visible");
  });
});

$(".founder__card").hover(
  function () {
    $(this).find(".divider-line.founders.animation").addClass("active");
  },
  function () {
    $(this).find(".divider-line.founders.animation").removeClass("active");
  }
);
