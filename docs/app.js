let activeFilters = []; // Move this to the top
const activeFiltersContainer = document.getElementById("activeFilters"); // Move this to the top

// Fetch internship data from the README file (or a preprocessed JSON file)
fetch("../.github/scripts/listings.json")
  .then(response => response.json())
  .then(data => {
    const table = document.querySelector("#internshipTable tbody");
    const rowCount = document.getElementById("rowCount");

    // Populate the table with the first 100 rows
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      const date = new Date(item.date_updated * 1000);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "2-digit"
      });

      row.innerHTML = `
        <td>${item.company_name}</td>
        <td>${item.title}</td>
        <td>${item.locations}</td>
        <td><a href="${item.url}" target="_blank">Link</a></td>
        <td><a href="https://simplify.jobs/p/${item.id}" target="_blank">Link</a></td>
        <td>${formattedDate}</td>
        <td>
          <input type="checkbox" data-id="${index}" ${item.applied ? "checked" : ""}>
        </td>
        <td>${item.active ? "Active" : "Inactive"}</td>
      `;
      table.appendChild(row);
    });

    // Apply default filters
    activeFilters.push({ column: "date", fromDate: "2024-01-01", toDate: "" });
    activeFilters.push({ column: "active", active: true });
    activeFilters.push({ column: "location", conditions: [{ type: "not-equals", value: "toronto, on, canada" }] });
    activeFilters.push({ column: "location", conditions: [{ type: "not-contains", value: "vancouver, canada" }] });
    activeFilters.push({ column: "location", conditions: [{ type: "not-contains", value: "ottawa, canada" }] });
    updateActiveFilters();
    applyFilters();

    // Update row count
    updateRowCount();

    // Save changes when a checkbox is clicked
    table.addEventListener("change", (event) => {
      const checkbox = event.target;
      if (checkbox.type === "checkbox") {
        const id = checkbox.dataset.id;
        data[id].applied = checkbox.checked;

        // Save to localStorage
        localStorage.setItem("internshipData", JSON.stringify(data));
      }
    });

    // Add event listeners for filter buttons
    document.querySelectorAll(".apply-filter").forEach((button, index) => {
      button.addEventListener("click", () => {
        const filterType = button.previousElementSibling.previousElementSibling.value;
        const filterValue = button.previousElementSibling.value.toLowerCase();
        const columnIndex = index;

        document.querySelectorAll("#internshipTable tbody tr").forEach(row => {
          const cellText = row.cells[columnIndex].textContent.toLowerCase();
          let shouldDisplay = true;

          switch (filterType) {
            case "contains":
              shouldDisplay = cellText.includes(filterValue);
              break;
            case "equals":
              shouldDisplay = cellText === filterValue;
              break;
            case "not-equals":
              shouldDisplay = cellText !== filterValue;
              break;
            case "not-contains":
              shouldDisplay = !cellText.includes(filterValue);
              break;
          }

          row.style.display = shouldDisplay ? "" : "none";
        });
      });
    });

    // Global filter functionality
    const filterModal = document.getElementById("filterModal");
    const addFilterBtn = document.getElementById("addFilter");
    const closeBtn = document.querySelector(".close");
    const filterColumn = document.getElementById("filterColumn");
    const filterOptions = document.getElementById("filterOptions");
    const applyGlobalFilterBtn = document.getElementById("applyGlobalFilter");
    let editIndex = null;

    addFilterBtn.onclick = () => {
      filterModal.style.display = "block";
      editIndex = null;
    };

    closeBtn.onclick = () => {
      filterModal.style.display = "none";
    };

    window.onclick = (event) => {
      if (event.target == filterModal) {
        filterModal.style.display = "none";
      }
    };

    filterColumn.onchange = () => {
      const column = filterColumn.value;
      filterOptions.innerHTML = "";

      if (column === "date") {
        filterOptions.innerHTML = `
          <label for="fromDate">From:</label>
          <input type="date" id="fromDate">
          <label for="toDate">To:</label>
          <input type="date" id="toDate">
        `;
      } else if (column === "status" || column === "active") {
        filterOptions.innerHTML = `
          <select id="${column}Filter">
            <option value="true">${column === "status" ? "Applied" : "Active"}</option>
            <option value="false">${column === "status" ? "Not Applied" : "Inactive"}</option>
          </select>
        `;
      } else {
        addFilterInput();
      }
    };

    function addFilterInput() {
      const filterInput = document.createElement("div");
      filterInput.className = "filter-input";
      filterInput.innerHTML = `
        <select class="filterType">
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="not-equals">Not Equals</option>
          <option value="not-contains">Not Contains</option>
        </select>
        <input type="text" class="filterValue">
        <button class="add-input">+</button>
        <button class="remove-input">-</button>
      `;
      filterOptions.appendChild(filterInput);

      filterInput.querySelector(".add-input").onclick = () => {
        addFilterInput();
      };

      filterInput.querySelector(".remove-input").onclick = () => {
        filterInput.remove();
      };

      filterInput.querySelector(".filterValue").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          applyGlobalFilterBtn.click();
        }
      });
    }

    applyGlobalFilterBtn.onclick = () => {
      const column = filterColumn.value;
      let filter = { column };

      if (column === "date") {
        filter.fromDate = document.getElementById("fromDate").value;
        filter.toDate = document.getElementById("toDate").value;
      } else if (column === "status" || column === "active") {
        filter[column] = document.getElementById(`${column}Filter`).value === "true";
      } else {
        filter.conditions = [];
        document.querySelectorAll(".filter-input").forEach(input => {
          const type = input.querySelector(".filterType").value;
          const value = input.querySelector(".filterValue").value.toLowerCase();
          filter.conditions.push({ type, value });
        });
      }

      if (editIndex !== null) {
        activeFilters[editIndex] = filter;
      } else {
        activeFilters.push(filter);
      }

      updateActiveFilters();
      applyFilters();
      filterModal.style.display = "none";
    };

    function updateActiveFilters() {
      activeFiltersContainer.innerHTML = "";
      activeFilters.forEach((filter, index) => {
        const filterTag = document.createElement("div");
        filterTag.className = "filter-tag";
        let filterDescription = `${filter.column}: `;
        if (filter.column === "date") {
          filterDescription += `${filter.fromDate || "Any"} to ${filter.toDate || "Any"}`;
        } else if (filter.column === "status" || filter.column === "active") {
          filterDescription += filter[filter.column] ? (filter.column === "status" ? "Applied" : "Active") : (filter.column === "status" ? "Not Applied" : "Inactive");
        } else {
          filter.conditions.forEach((condition, i) => {
            filterDescription += `${condition.type} ${condition.value}`;
            if (i < filter.conditions.length - 1) {
              filterDescription += " OR ";
            }
          });
        }
        filterTag.innerHTML = `
          ${filterDescription}
          <button class="edit" data-index="${index}">Edit</button>
          <button class="duplicate" data-index="${index}">Duplicate</button>
          <button class="remove" data-index="${index}">&times;</button>
        `;
        activeFiltersContainer.appendChild(filterTag);
      });

      document.querySelectorAll(".filter-tag .remove").forEach(button => {
        button.onclick = () => {
          const index = button.dataset.index;
          activeFilters.splice(index, 1);
          updateActiveFilters();
          applyFilters();
        };
      });

      document.querySelectorAll(".filter-tag .edit").forEach(button => {
        button.onclick = () => {
          const index = button.dataset.index;
          const filter = activeFilters[index];
          editIndex = index;

          filterColumn.value = filter.column;
          filterColumn.onchange();

          if (filter.column === "date") {
            document.getElementById("fromDate").value = filter.fromDate;
            document.getElementById("toDate").value = filter.toDate;
          } else if (filter.column === "status" || filter.column === "active") {
            document.getElementById(`${filter.column}Filter`).value = filter[filter.column] ? "true" : "false";
          } else {
            filter.conditions.forEach((condition, i) => {
              if (i > 0) {
                addFilterInput();
              }
              const filterInputs = document.querySelectorAll(".filter-input");
              filterInputs[i].querySelector(".filterType").value = condition.type;
              filterInputs[i].querySelector(".filterValue").value = condition.value;
            });
          }

          filterModal.style.display = "block";
        };
      });

      document.querySelectorAll(".filter-tag .duplicate").forEach(button => {
        button.onclick = () => {
          const index = button.dataset.index;
          const filter = activeFilters[index];
          activeFilters.push({ ...filter });
          updateActiveFilters();
          applyFilters();
        };
      });

      updateRowCount();
    }

    function applyFilters() {
      document.querySelectorAll("#internshipTable tbody tr").forEach(row => {
        let shouldDisplay = true;

        activeFilters.forEach(filter => {
          let cellText;
          switch (filter.column) {
            case "company":
              cellText = row.cells[0].textContent.toLowerCase();
              break;
            case "role":
              cellText = row.cells[1].textContent.toLowerCase();
              break;
            case "location":
              cellText = row.cells[2].textContent.toLowerCase();
              break;
            case "date":
              const fromDate = filter.fromDate ? new Date(filter.fromDate) : new Date(-8640000000000000);
              const toDate = filter.toDate ? new Date(filter.toDate) : new Date(8640000000000000);
              const dateText = new Date(row.cells[5].textContent);
              shouldDisplay = shouldDisplay && dateText >= fromDate && dateText <= toDate;
              break;
            case "status":
              const isChecked = row.cells[6].querySelector("input").checked;
              shouldDisplay = shouldDisplay && ((filter.status && isChecked) || (!filter.status && !isChecked));
              break;
            case "active":
              const isActive = row.cells[7].textContent.toLowerCase() === "active";
              shouldDisplay = shouldDisplay && ((filter.active && isActive) || (!filter.active && !isActive));
              break;
          }

          if (filter.column !== "date" && filter.column !== "status" && filter.column !== "active") {
            let conditionMet = false;
            filter.conditions.forEach(condition => {
              switch (condition.type) {
                case "contains":
                  conditionMet = conditionMet || cellText.includes(condition.value);
                  break;
                case "equals":
                  conditionMet = conditionMet || cellText === condition.value;
                  break;
                case "not-equals":
                  conditionMet = conditionMet || cellText !== condition.value;
                  break;
                case "not-contains":
                  conditionMet = conditionMet || !cellText.includes(condition.value);
                  break;
              }
            });
            shouldDisplay = shouldDisplay && conditionMet;
          }
        });

        row.style.display = shouldDisplay ? "" : "none";
      });
      updateRowCount();
    }

    function updateRowCount() {
      const visibleRows = document.querySelectorAll("#internshipTable tbody tr:not([style*='display: none'])").length;
      rowCount.textContent = `Total Rows: ${visibleRows}`;
    }
  })
  .catch(err => console.error(err));

// Search functionality
document.querySelector("#search").addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll("#internshipTable tbody tr").forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
  updateRowCount();
});
