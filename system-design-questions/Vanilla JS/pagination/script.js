document.addEventListener("DOMContentLoaded", function () {
  let products = [];
  let page = 1;
  const app = document.querySelector(".app");

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      if (data && data.products) {
        products = data.products;
        renderData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderData = () => {
    const prod = document.createElement("div");
    prod.classList.add("products");
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");

    if (products.length > 0) {
      products.slice((page - 1) * 10, page * 10).forEach((val) => {
        const prodCard = document.createElement("div");
        prodCard.classList.add("prodCard");
        prodCard.innerHTML = `
        <img src = ${val.thumbnail} alt = "${val.title}"/>
        <span>${val.title}</span>
        `;
        prod.appendChild(prodCard);
      });

      if (page > 1) {
        const prevBtn = createBtn("<", function () {
          selectPageHandler(page - 1);
        });
        pagination.appendChild(prevBtn);
      }
      for (let i = 0; i < products.length / 10; i++) {
        const btn = createBtn(
          i + 1,
          function () {
            selectPageHandler(i + 1);
          },
          page === i + 1
        );
        pagination.appendChild(btn);
      }
      if (page < products.length / 10) {
        const nextBtn = createBtn(">", function () {
          selectPageHandler(page + 1);
        });

        pagination.appendChild(nextBtn);
      }
      prod.appendChild(pagination);
    }
    app.innerHTML = "";
    app.appendChild(prod);
  };
  const createBtn = (text, callBack, isSelected = false) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.addEventListener("click", callBack);
    if (isSelected) {
      btn.classList.add("selectedBtn");
    }
    return btn;
  };
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      page = selectedPage;
      renderData();
    }
  };
  fetchProducts();
});
