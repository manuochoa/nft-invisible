const minus = document.getElementById("minus"),
  plus = document.getElementById("plus"),
  coount = document.getElementById("count"),
  allprice = document.getElementById("allprice");
minus.addEventListener("click", () => {
  let e = Number(coount.innerText);
  e > 1 &&
    ((e -= 1),
    (coount.innerText = e),
    (allprice.innerText = (0.2 * e).toFixed(1)));
}),
  plus.addEventListener("click", () => {
    let e = Number(coount.innerText);
    e < 10 &&
      ((e += 1),
      (coount.innerText = e),
      (allprice.innerText = (0.2 * e).toFixed(1)));
  });
