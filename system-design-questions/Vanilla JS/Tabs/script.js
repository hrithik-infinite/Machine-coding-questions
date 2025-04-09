const tabsData = [
  {
    id: "tab1",
    title: "Tab 1",
    data: "Tab 1 data",
  },
  {
    id: "tab2",
    title: "Tab 2",
    data: "Tab 2 data",
  },
  {
    id: "tab3",
    title: "Tab 3",
    data: "Tab 3 data",
  },
];
document.addEventListener("DOMContentLoaded", function () {
  let activeTab = tabsData[0].id;
  function renderTabs() {
    const tabsContainer = document.querySelector("#tabsContainer");
    const tabContentContainer = document.querySelector("#tabContent");

    tabsData.forEach((val) => {
      const tabsBtn = document.createElement("button");
      tabsBtn.className = "tabLinks";
      tabsBtn.textContent = val.title;
      tabsBtn.setAttribute("data-tab", val.id);
      tabsContainer.appendChild(tabsBtn);

      const tabContent = document.createElement("div");
      tabContent.id = val.id;
      tabContent.className = "tabContent";
      tabContent.innerHTML = `<h3>${val.title}</h3><p>${val.data}</p>`;
      tabContentContainer.appendChild(tabContent);
    });

    tabsContainer.addEventListener("click", function (event) {
      if (event.target.matches(".tabLinks")) {
        const tabId = event.target.getAttribute("data-tab");
        if (tabId !== activeTab) {
          openTab(tabId);
          activeTab = tabId;
        }
      }
    });
  }
  function openTab(tabId) {
    const tabContents = document.querySelectorAll(".tabContent");
    const tabLinks = document.querySelectorAll(".tabLinks");
    tabContents.forEach((val) => val.classList.remove("active"));
    tabLinks.forEach((val) => val.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document.querySelector(`button[data-tab="${tabId}"]`).classList.add("active");
  }
  renderTabs();
  openTab(activeTab);
});
