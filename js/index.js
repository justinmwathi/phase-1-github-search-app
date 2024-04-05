// Wait for the page to load before running the script

document.addEventListener("DOMContentLoaded", () => {
    // Target the form for searching GitHub users
const form = document.getElementById("github-form");
    // Add an event listener for the form submission
 form.addEventListener("submit", (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Get the value of the search input
const input = document.getElementById("search").value;
  
      // Perform a GET request to the GitHub User Search Endpoint
  
      fetch(`https://api.github.com/search/users?q=${input}`, {
  
        method: "GET",
  
        headers: {
  
          Accept: "application/vnd.github.v3+json"
  
        }
  
      })
     .then(response => response.json())
     .then((data) => {
        // Display the search results
        const resultsDiv = document.querySelector('#user-list');
        resultsDiv.innerHTML = '';
        data.items.forEach(item => {
          const userList= document.createElement('li');
          userList.innerHTML = `
            <h2><a href="${item.html_url}" target="_blank">${item.login}</a></h2>
            <img src="${item.avatar_url}" alt="${item.login}'s avatar">
          `;

          userList.addEventListener("click",()=>{
            fetch(`https://api.github.com/users/${item.login}/repos`, {
            method: "GET",
            headers: {
              Accept: "application/vnd.github.v3+json"
            }
          })
          .then(response => response.json())
          .then((data)=>{
            const reposContainer=document.getElementById("repos-list");
            reposContainer.innerHTML='';
            data.forEach(repo=>{
                const repoLists=document.createElement("li");
                repoLists.innerHTML+=`
                <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                <p>${repo.description || ''}</p>
                `;
                reposContainer.appendChild(repoLists);
            });
          })
          })
          resultsDiv.appendChild(userList);

        });
      })
     
  
    });
  
  });






  
