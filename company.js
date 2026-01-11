const params = new URLSearchParams(window.location.search);
const companyId = params.get("id");



fetch(`http://localhost:8080/api/company?id=${companyId}`)
  .then(res => res.json())
  .then(data => {
    renderCompany(data.company);
    renderAnalysis(data.data.analysis);
    renderProsCons(data.data.prosandcons);
    renderBalanceSheet(data.data.balancesheet);
    renderProfitLoss(data.data.profitandloss);
    renderCashFlow(data.data.cashflow);
  })
  .catch(err => console.error(err));

function renderCompany(c) {
  document.getElementById("company-card").innerHTML = `
    <img src="${c.company_logo}" width="80">
    <h1>${c.company_name}</h1>
    <p>${c.about_company}</p>
    <a href="${c.website}" target="_blank">Website</a>
  `;
}

// function renderAnalysis(arr) {
//   let html = "";
//   arr.forEach(a => {
//     html += `
//       <div class="analysis-box">
//         <strong>${a.compounded_sales_growth}</strong><br>
//         ${a.compounded_profit_growth}<br>
//         ${a.roe}
//       </div>
//     `;
//   });
//   document.getElementById("analysis").innerHTML = html;
// }
function renderAnalysis(arr) {
  let sales = "";
  let profit = "";
  let roe = "";

  arr.forEach(a => {
    if (a.compounded_sales_growth)
      sales += `<div>${a.compounded_sales_growth}</div>`;

    if (a.compounded_profit_growth)
      profit += `<div>${a.compounded_profit_growth}</div>`;

    if (a.roe)
      roe += `<div>${a.roe}</div>`;
  });

  document.getElementById("analysis").innerHTML = `
    <div class="analysis-box">
      <h4>Compounded Sales Growth</h4>
      ${sales}
    </div>

    <div class="analysis-box">
      <h4>Compounded Profit Growth</h4>
      ${profit}
    </div>

    <div class="analysis-box">
      <h4>Return on Equity</h4>
      ${roe}
    </div>
  `;
}


function renderProsCons(arr) {
  let pros = "", cons = "";

  arr.forEach(p => {
    if (p.pros && p.pros !== "NULL") pros += `<li>${p.pros}</li>`;
    if (p.cons && p.cons !== "NULL") cons += `<li>${p.cons}</li>`;
  });

  document.getElementById("pros-cons").innerHTML = `
    <div class="pros">
      <h3>Pros</h3>
      <ul>${pros}</ul>
    </div>
    <div class="cons">
      <h3>Cons</h3>
      <ul>${cons}</ul>
    </div>
  `;
}
function renderBalanceSheet(data) {
  let html = "<tr><th>Year</th><th>Equity</th><th>Reserves</th><th>Borrowings</th></tr>";
  data.forEach(d => {
    html += `
      <tr>
        <td>${d.year}</td>
        <td>${d.equity_capital}</td>
        <td>${d.reserves}</td>
        <td>${d.borrowings}</td>
      </tr>
    `;
  });
  document.getElementById("balance-sheet").innerHTML = html;
}

function renderProfitLoss(data) {
  let html = "<tr><th>Year</th><th>Sales</th><th>Net Profit</th><th>EPS</th></tr>";
  data.forEach(d => {
    html += `
      <tr>
        <td>${d.year}</td>
        <td>${d.sales}</td>
        <td>${d.net_profit}</td>
        <td>${d.eps}</td>
      </tr>
    `;
  });
  document.getElementById("profit-loss").innerHTML = html;
}

function renderCashFlow(data) {
  let html = "<tr><th>Year</th><th>Operating</th><th>Investing</th><th>Financing</th></tr>";
  data.forEach(d => {
    html += `
      <tr>
        <td>${d.year}</td>
        <td>${d.operating_activity}</td>
        <td>${d.investing_activity}</td>
        <td>${d.financing_activity}</td>
      </tr>
    `;
  });
  document.getElementById("cash-flow").innerHTML = html;
}

