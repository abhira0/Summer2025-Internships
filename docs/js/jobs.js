let activeFilters = []; // Move this to the top
const activeFiltersContainer = document.getElementById("activeFilters"); // Move this to the top
let activeSorts = []; // Add this to the top
const activeSortsContainer = document.getElementById("activeSorts"); // Add this to the top
let currentUser = null;
let userApplications = { applications: {} }; // Update initialization

// Add these application management functions at the top
async function loadUserApplicationsFromServer() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/applications`);
        if (!response.ok) {
            throw new Error('Failed to load from server');
        }
        const data = await response.json();
        userApplications = data;
        saveUserApplicationsToStorage(); // Cache in localStorage
        return data;
    } catch (error) {
        console.error('Error loading from server:', error);
        return loadUserApplicationsFromStorage(); // Fallback to localStorage
    }
}

// Update isJobApplied function
function isJobApplied(jobId) {
    if (!currentUser || !userApplications.applications[currentUser]) {
        return false;
    }
    return userApplications.applications[currentUser].applied?.includes(jobId) || false;
}

// Update isJobHidden function
function isJobHidden(jobId) {
    if (!currentUser || !userApplications.applications[currentUser]) {
        return false;
    }
    return userApplications.applications[currentUser].hidden?.includes(jobId) || false;
}

function updateRowCount() {
  const visibleRows = document.querySelectorAll("#internshipTable tbody tr:not([style*='display: none'])").length;
  rowCount.textContent = `Total Rows: ${visibleRows}`;
}

function applyFilters() {
  document.querySelectorAll("#internshipTable tbody tr").forEach(row => {
    let shouldDisplay = true;

    activeFilters.forEach(filter => {
      let cellText = "";
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
          const dateText = new Date(row.cells[4].textContent); // Updated index
          shouldDisplay = shouldDisplay && dateText >= fromDate && dateText <= toDate;
          break;
        case "applied":
          const isApplied = row.cells[5].querySelector(".status-btn").classList.contains("applied");
          shouldDisplay = shouldDisplay && ((filter.applied && isApplied) || (!filter.applied && !isApplied));
          break;
        case "active":
          const isActive = row.cells[6].textContent.toLowerCase() === "active"; // Updated index
          shouldDisplay = shouldDisplay && ((filter.active && isActive) || (!filter.active && !isActive));
          break;
        case "hidden":
          const isHidden = row.cells[7].querySelector(".status-btn").classList.contains("applied");
          shouldDisplay = shouldDisplay && ((filter.hidden && isHidden) || (!filter.hidden && !isHidden));
          break;
      }

      if (filter.column !== "date" && filter.column !== "applied" && filter.column !== "active" && filter.column !== "hidden") {
        let conditionMet = false;
        if (filter.conditions) {
          if (filter.conditionType === "AND") {
            // Use every() to implement AND logic between conditions
            conditionMet = filter.conditions.every(condition => {
              switch (condition.type) {
                case "contains":
                  return cellText.includes(condition.value);
                case "equals":
                  return cellText === condition.value;
                case "not-equals":
                  return cellText !== condition.value;
                case "not-contains":
                  return !cellText.includes(condition.value);
                default:
                  return false;
              }
            });
          } else {
            // Use some() for OR logic (default behavior)
            conditionMet = filter.conditions.some(condition => {
              switch (condition.type) {
                case "contains":
                  return cellText.includes(condition.value);
                case "equals":
                  return cellText === condition.value;
                case "not-equals":
                  return cellText !== condition.value;
                case "not-contains":
                  return !cellText.includes(condition.value);
                default:
                  return false;
              }
            });
          }
        }
        shouldDisplay = shouldDisplay && conditionMet;
      }
    });

    row.style.display = shouldDisplay ? "" : "none";
  });
  updateRowCount();
  
  // Re-apply search if there's a search query
  const searchQuery = document.querySelector("#search").value;
  if (searchQuery) {
    document.querySelector("#search").dispatchEvent(new Event('input'));
  }
}

// Fetch both files and combine the data
Promise.all([
  fetch("https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json"),
  fetch("https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json"),
  loadUserApplicationsFromServer()
])
  .then(([listingsResponse, trackerResponse]) => {
    return Promise.all([
      listingsResponse.json(),
      trackerResponse.json()
    ]);
  })
  .then(([listings, tracker]) => {
    const table = document.querySelector("#internshipTable tbody");
    const rowCount = document.getElementById("rowCount");
    currentUser = JSON.parse(atob(localStorage.getItem('jwt_token').split('.')[1])).user;

    // Initialize user applications if not exists
    if (!userApplications.applications[currentUser]) {
        userApplications.applications[currentUser] = {
            applied: [],
            hidden: []
        };
    }

    // Populate the table
    listings.forEach((item) => {
      const row = document.createElement("tr");
      const date = new Date(item.date_updated * 1000);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "short",
        day: "2-digit"
      });

      const isApplied = isJobApplied(item.id) || 
                       (tracker.some(t => t.job_posting_id === item.id));
      const isHidden = isJobHidden(item.id);
      
      row.innerHTML = `
        <td>${item.company_name}</td>
        <td>${item.title}</td>
        <td>${item.locations}</td>
        <td>
          <div class="apply-links">
            <a href="${item.url}" class="apply-btn" target="_blank">Apply</a>
            <a href="https://simplify.jobs/p/${item.id}" target="_blank">
              <img src="simplify-logo.png" alt="Simplify" class="simplify-logo" data-tooltip="See on Simplify">
            </a>
          </div>
        </td>
        <td>${formattedDate}</td>
        <td>
          <div class="application-status" data-job-id="${item.id}">
            <button class="status-btn ${isApplied ? 'applied' : ''}" onclick="toggleApplicationStatus('${item.id}', this)">
              ${isApplied ? 'Yes' : 'No'}
            </button>
          </div>
        </td>
        <td>${item.active ? "Active" : "Inactive"}</td>
        <td>
            <div class="hide-status" data-job-id="${item.id}">
                <button class="status-btn ${isHidden ? 'applied' : ''}" 
                        onclick="toggleHideStatus('${item.id}', this)">
                    ${isHidden ? 'Yes' : 'No'}
                </button>
            </div>
        </td>
      `;

      // Don't show row if it's hidden
      if (isHidden) {
          row.style.display = 'none';
      }
      
      table.appendChild(row);
    });

    // Apply default filters
    activeFilters.push({ column: "date", fromDate: "2024-01-01", toDate: "" });
    activeFilters.push({ column: "active", active: true });
    activeFilters.push({
      column: "location",
      conditionType: "AND",
      conditions: [
      { type: "not-equals", value: "toronto, on, canada" },
      { type: "not-equals", value: "toronto, canada" },
      { type: "not-equals", value: "canada" },
      { type: "not-equals", value: "remote in canada" },
      { type: "not-equals", value: "mississauga, on, canada" },
      { type: "not-equals", value: "montreal, qc, canada" },
      { type: "not-equals", value: "vancouver, bc, canada" },
      { type: "not-equals", value: "vancouver, canada" },
      { type: "not-equals", value: "ottawa, canada" },
      { type: "not-equals", value: "london, uk" },
      { type: "not-equals", value: "cambridge, uk" },
      { type: "not-equals", value: "uxbridge, uk" }
      ]
    });
    activeFilters.push({ column: "hidden", hidden: false }); // Add not hidden filter
    activeFilters.push({ column: "applied", applied: false }); // Add not applied filter
    updateActiveFilters();
    applyFilters();

    // Add default sort
    activeSorts.push({ column: "date", order: "desc" });
    updateActiveSorts();
    sortTable();

    // Update row count
    updateRowCount();

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

    // Add event listener for Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        filterModal.style.display = 'none';
        sortModal.style.display = 'none';
      }
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
      if (event.target === filterModal || event.target === sortModal) {
        filterModal.style.display = "none";
        sortModal.style.display = "none";
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
      } else if (column === "applied" || column === "active" || column === "hidden") {
        filterOptions.innerHTML = `
          <select id="${column}Filter">
            <option value="true">${column === "applied" ? "Applied" : column === "hidden" ? "Hidden" : "Active"}</option>
            <option value="false">${column === "applied" ? "Not Applied" : column === "hidden" ? "Not Hidden" : "Inactive"}</option>
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
      
      // Add condition type selector if this is the first input
      if (filterOptions.children.length === 0) {
        const conditionTypeSelector = document.createElement("div");
        conditionTypeSelector.className = "condition-type-selector";
        conditionTypeSelector.innerHTML = `
          <select id="conditionType">
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
        `;
        filterOptions.appendChild(conditionTypeSelector);
      }
      
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
      } else if (column === "applied" || column === "active" || column === "hidden") {
        filter[column] = document.getElementById(`${column}Filter`).value === "true";
      } else {
        filter.conditions = [];
        filter.conditionType = document.getElementById("conditionType").value;
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

    function getConditionSymbol(type) {
      switch (type) {
        case "contains":
          return "∈";  // Element of (more intuitive than superset)
        case "equals":
          return "=";  // Simple equals
        case "not-equals":
          return "≠";  // Standard not equals
        case "not-contains":
          return "∉";  // Not element of (more intuitive than not superset)
        default:
          return type;
      }
    }

    function updateActiveFilters() {
      activeFiltersContainer.innerHTML = "";
      activeFilters.forEach((filter, index) => {
        const filterTag = document.createElement("div");
        filterTag.className = "filter-tag";
        
        let filterContent = `<span class="filter-column">${filter.column}</span>`;
        
        if (filter.column === "date") {
          filterContent += `
            <span class="filter-condition">:</span>
            <span class="filter-value">${filter.fromDate || "Any"}</span>
            <span class="filter-condition">→</span>
            <span class="filter-value">${filter.toDate || "Any"}</span>`;
        } else if (filter.column === "applied" || filter.column === "active" || filter.column === "hidden") {
          filterContent += `
            <span class="filter-condition">is</span>
            <span class="filter-value">${filter[filter.column] ? 
            (filter.column === "applied" ? "Applied" : filter.column === "hidden" ? "Hidden" : "Active") : 
            (filter.column === "applied" ? "Not Applied" : filter.column === "hidden" ? "Not Hidden" : "Inactive")}</span>`;
        } else {
          filter.conditions.forEach((condition, i) => {
            if (i > 0) {
              filterContent += `<span class="filter-condition">${filter.conditionType === "AND" ? "∧" : "∨"}</span>`; // AND/OR symbol
            }
            filterContent += `
              <span class="filter-condition">${getConditionSymbol(condition.type)}</span>
              <span class="filter-value">${condition.value}</span>`;
          });
        }
        
        filterContent += `
          <button class="edit" data-index="${index}" data-tooltip="Edit"><i class="fas fa-edit"></i></button>
          <button class="duplicate" data-index="${index}" data-tooltip="Duplicate"><i class="fas fa-copy"></i></button>
          <button class="remove" data-index="${index}" data-tooltip="Delete"><i class="fas fa-times"></i></button>
        `;
        
        filterTag.innerHTML = filterContent;
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
          } else if (filter.column === "applied" || filter.column === "active" || filter.column === "hidden") {
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

    // Sort functionality
    const sortModal = document.getElementById("sortModal");
    const addSortBtn = document.getElementById("addSort");
    const closeSortBtn = document.querySelector(".closeSort");
    const sortColumn = document.getElementById("sortColumn");
    const sortOrder = document.getElementById("sortOrder");
    const applySortBtn = document.getElementById("applySort");
    let editSortIndex = null;

    addSortBtn.onclick = () => {
      sortModal.style.display = "block";
      editSortIndex = null;
    };

    closeSortBtn.onclick = () => {
      sortModal.style.display = "none";
    };

    applySortBtn.onclick = () => {
      const column = sortColumn.value;
      const order = sortOrder.value;
      let sort = { column, order };

      if (editSortIndex !== null) {
        activeSorts[editSortIndex] = sort;
      } else {
        activeSorts.push(sort);
      }

      updateActiveSorts();
      sortTable();
      sortModal.style.display = "none";
    };

    function getSortSymbol(order) {
      return order === 'asc' 
        ? '<i class="fas fa-sort-amount-up-alt" data-tooltip="Ascending"></i>' 
        : '<i class="fas fa-sort-amount-down-alt" data-tooltip="Descending"></i>';
    }

    function updateActiveSorts() {
      activeSortsContainer.innerHTML = "";
      activeSorts.forEach((sort, index) => {
        const sortTag = document.createElement("div");
        sortTag.className = "sort-tag";
        sortTag.draggable = true;
        sortTag.dataset.index = index;
        
        sortTag.innerHTML = `
          <span class="sort-column">${sort.column}</span>
          <span class="sort-direction">${getSortSymbol(sort.order)}</span>
          <button class="edit" data-index="${index}" data-tooltip="Edit"><i class="fas fa-edit"></i></button>
          <button class="remove" data-index="${index}" data-tooltip="Delete"><i class="fas fa-times"></i></button>
        `;

        // Add drag event listeners
        sortTag.addEventListener('dragstart', handleDragStart);
        sortTag.addEventListener('dragend', handleDragEnd);
        sortTag.addEventListener('dragover', handleDragOver);
        sortTag.addEventListener('drop', handleDrop);

        activeSortsContainer.appendChild(sortTag);
      });

      document.querySelectorAll(".sort-tag .remove").forEach(button => {
        button.onclick = () => {
          const index = button.dataset.index;
          activeSorts.splice(index, 1);
          updateActiveSorts();
          sortTable();
        };
      });

      document.querySelectorAll(".sort-tag .edit").forEach(button => {
        button.onclick = () => {
          const index = button.dataset.index;
          const sort = activeSorts[index];
          editSortIndex = index;

          sortColumn.value = sort.column;
          sortOrder.value = sort.order;

          sortModal.style.display = "block";
        };
      });
    }

    function handleDragStart(e) {
      e.target.classList.add('dragging');
      e.dataTransfer.setData('text/plain', e.target.dataset.index);
    }

    function handleDragEnd(e) {
      e.target.classList.remove('dragging');
    }

    function handleDragOver(e) {
      e.preventDefault();
    }

    function handleDrop(e) {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const toIndex = parseInt(e.target.closest('.sort-tag').dataset.index);
      
      if (fromIndex !== toIndex) {
        const [movedSort] = activeSorts.splice(fromIndex, 1);
        activeSorts.splice(toIndex, 0, movedSort);
        updateActiveSorts();
        sortTable();
      }
    }

    function sortTable() {
      const rows = Array.from(table.querySelectorAll("tr"));
      
      rows.sort((a, b) => {
        // Try each sort rule in order until we find a difference
        for (const sort of activeSorts) {
          const columnIndex = {
            company: 0,
            role: 1,
            location: 2,
            date: 4,        // Updated indices
            applied: 5,      // Updated indices
            active: 6,       // Updated indices
            hidden: 7
          }[sort.column];

          let aText = a.cells[columnIndex].textContent.toLowerCase();
          let bText = b.cells[columnIndex].textContent.toLowerCase();

          if (sort.column === "date") {
            aText = new Date(aText);
            bText = new Date(bText);
          } else if (sort.column === "applied" || sort.column === "active" || sort.column === "hidden") {
            aText = aText === "active" || aText === "applied" || aText === "hidden";
            bText = bText === "active" || bText === "applied" || bText === "hidden";
          }

          if (aText < bText) return sort.order === "asc" ? -1 : 1;
          if (aText > bText) return sort.order === "asc" ? 1 : -1;
          // If equal, continue to next sort rule
        }
        return 0; // All sort rules resulted in equality
      });

      rows.forEach(row => table.appendChild(row));
    }
  })
  .catch(err => console.error(err));

// Search functionality
function performSearch() {
  const query = document.querySelector("#search").value.trim().toLowerCase();
  const searchFiltered = document.querySelector("#searchFiltered").checked;
  
  // Skip search if query is empty or only whitespace
  if (!query) {
    clearSearch();
    return;
  }
  
  document.querySelectorAll("#internshipTable tbody tr").forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchesSearch = text.includes(query);
    
    // If searching filtered rows, only search visible rows
    if (searchFiltered) {
      if (row.style.display !== "none") {
        row.style.display = matchesSearch ? "" : "none";
      }
    } else {
      // If searching all rows, ignore current visibility
      row.style.display = matchesSearch ? "" : "none";
    }
  });
  updateRowCount();
}

function clearSearch() {
  document.querySelector("#search").value = '';
  // Reset to filtered view
  document.querySelectorAll("#internshipTable tbody tr").forEach(row => {
    row.style.display = "";
  });
  applyFilters();
}

// Add event listeners for search
document.querySelector("#searchButton").addEventListener("click", performSearch);
document.querySelector("#cancelSearch").addEventListener("click", clearSearch);
document.querySelector("#search").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    performSearch();
  }
  if (event.key === "Escape") {
    clearSearch();
  }
});

// Update checkbox event listener
document.querySelector("#searchFiltered").addEventListener("change", () => {
  const query = document.querySelector("#search").value;
  if (query) {
    performSearch();
  }
});

const token = localStorage.getItem('jwt_token');
if (token) {
    currentUser = JSON.parse(atob(token.split('.')[1])).user;
    if (!userApplications.applications[currentUser]) {
        userApplications.applications[currentUser] = [];
        saveUserApplicationsToStorage();
    }
}

function loadUserApplicationsFromStorage() {
    try {
        const stored = localStorage.getItem('userApplications');
        return stored ? JSON.parse(stored) : { applications: {} };
    } catch (error) {
        console.error('Error loading from storage:', error);
        return { applications: {} };
    }
}

function saveUserApplicationsToStorage() {
    try {
        localStorage.setItem('userApplications', JSON.stringify(userApplications));
    } catch (error) {
        console.error('Error saving to storage:', error);
    }
}

// Initialize userApplications
userApplications = loadUserApplicationsFromStorage();

// Replace existing loadUserApplications function
async function loadUserApplications() {
    try {
        // Try to load from localStorage first
        userApplications = loadUserApplicationsFromStorage();
        return userApplications[currentUser] || {};
    } catch (error) {
        console.error('Error loading user applications:', error);
        return {};
    }
}

// Replace existing saveUserApplications function
async function saveUserApplications() {
    try {
        userApplications[currentUser] = userApplications[currentUser] || {};
        saveUserApplicationsToStorage(userApplications);
        
        // Optional: Try to sync with GitHub (if implemented)
        try {
            await syncWithGitHub();
        } catch (e) {
            console.log('GitHub sync failed, using local storage only');
        }
    } catch (error) {
        console.error('Error saving user applications:', error);
    }
}

// Add this server sync function
async function syncApplicationsToServer() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userApplications)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save to server');
        }
        
        return true;
    } catch (error) {
        console.error('Server sync failed:', error);
        return false;
    }
}

// Update the toggleApplicationStatus function
async function toggleStatus(jobId, button, type) {
    if (!currentUser) return;

    try {
        // Initialize if needed
        if (!userApplications.applications[currentUser]) {
            userApplications.applications[currentUser] = { applied: [], hidden: [] };
        }
        if (!userApplications.applications[currentUser][type]) {
            userApplications.applications[currentUser][type] = [];
        }

        const statusArray = userApplications.applications[currentUser][type];
        const index = statusArray.indexOf(jobId);
        const isCurrentlySet = index !== -1;

        // Toggle status
        if (isCurrentlySet) {
            statusArray.splice(index, 1);
        } else {
            statusArray.push(jobId);
        }

        // Update UI immediately
        button.textContent = !isCurrentlySet ? 'Yes' : 'No';
        button.classList.toggle('applied');

        // Save to localStorage first
        saveUserApplicationsToStorage();

        // Then sync with server
        const synced = await syncApplicationsToServer();
        if (!synced) {
            console.warn('Changes saved locally but failed to sync with server');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        // Revert UI changes on error
        button.textContent = isCurrentlySet ? 'Yes' : 'No';
        button.classList.toggle('applied');
        alert('Failed to update status. Please try again.');
    }
}

// Add these window functions for the onclick handlers
window.toggleApplicationStatus = (jobId, button) => toggleStatus(jobId, button, 'applied');
window.toggleHideStatus = (jobId, button) => toggleStatus(jobId, button, 'hidden');

// Update the initial data loading to use localStorage
Promise.all([
    fetch("https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/listings_parsed.json"),
    fetch("https://raw.githubusercontent.com/abhira0/Summer2025-Internships/dev/docs/analytics/cache/simplify/parsed.json"),
    loadUserApplications()
])
.then(([listingsResponse, trackerResponse, userApps]) => {
    // ...existing code...
    
    // When creating table rows, check localStorage
    const isApplied = appliedJobIds.has(item.id) || 
                      (userApplications[currentUser] && userApplications[currentUser][item.id]);
    
    // ...existing code...
});

const style = document.createElement('style');
style.textContent = `
    .status-btn {
        padding: 5px 15px;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid #404040;
        background: #333;
        color: #e0e0e0;
        transition: all 0.3s ease;
    }

    .status-btn.applied {
        background: #2ecc71;
        color: white;
        border-color: #27ae60;
    }

    .application-status {
        display: flex;
        justify-content: center;
    }
`;
document.head.appendChild(style);
