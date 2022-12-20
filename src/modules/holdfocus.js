const input = document.querySelectorAll("[data-labal-marker]");
const inputArr = Array.from(input);

inputArr.forEach((el) => {
  el.onblur = function (event) {
    if (event.target.value) {
      el.classList.add("value-exist");
    } else {
      el.classList.remove("value-exist");
    }
  };
});
