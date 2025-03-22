const accordiansData = [
  {
    id: "accordian1",
    title: "Accordian 1",
    data: "Accordian 1 data",
  },
  {
    id: "accordian2",
    title: "Accordian 2",
    data: "Accordian 2 data",
  },
  {
    id: "accordian3",
    title: "Accordian 3",
    data: "Accordian 3 data",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const mainContainer = document.getElementById("accordian");

  accordiansData.forEach((val, index) => {
    const sectionItem = document.createElement("div");
    sectionItem.classList.add("accordian-item");

    const sectionHeader = document.createElement("div");
    sectionHeader.classList.add("accordian-title");
    sectionHeader.textContent = val.title;

    const sectionBody = document.createElement("div");
    sectionBody.classList.add("accordian-body");
    sectionBody.innerHTML = `<p>${val.data}</p>`;

    sectionItem.appendChild(sectionHeader);
    sectionItem.appendChild(sectionBody);
    mainContainer.appendChild(sectionItem);
    if (index === 0) {
      sectionItem.classList.add("active");
      sectionBody.style.display = "block";
    }
  });

  mainContainer.addEventListener("click", function (event) {
    const header = event.target.closest(".accordian-title");
    if (!header) {
      return;
    }
    const headerItem = header.parentNode;
    const content = headerItem.querySelector(".accordian-body");
    const isActive = headerItem.classList.contains("active");

    console.log(isActive);
    document.querySelectorAll(".accordian-item").forEach((item) => {
      item.classList.remove("active");
      item.querySelector(".accordian-body").style.display = "none";
    });
    if (!isActive) {
      headerItem.classList.add("active");
      content.style.display = "block";
    }
  });
});
