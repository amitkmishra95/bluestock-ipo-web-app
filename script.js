let companies = [];

fetch("companies.json")
  .then(res => res.json())
  .then(data => companies = data);

const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestions.innerHTML = "";

    if (value === "") {
        suggestions.style.display = "none";
        return;
    }

    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.id.toLowerCase().includes(value)
    );

    filtered.forEach(c => {
        const div = document.createElement("div");
        div.innerText = `${c.name} (${c.id})`;
        div.onclick = () => {
            window.location.href = `company.html?id=${c.id}`;
        };
        suggestions.appendChild(div);
    });

    suggestions.style.display = "block";
});
