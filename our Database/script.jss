// Replace with your Google Apps Script Web App URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPtrIIAyJuc0Jw36St-DaeHfabJNfCX7KjcTMHUkAMM2Enn2xwOnDnDzlkzPYwB94/exec";

// DOM Elements
const postsContainer = document.getElementById('posts');

// Fetch posts when the page loads
fetchPosts();

// Submit Post Functionality
function submitPost() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const formData = { name, email, message };

  fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Data submitted successfully!");
        fetchPosts(); // Refresh posts after submission
      } else {
        alert("Error submitting data: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fetch Posts Functionality
function fetchPosts() {
  fetch(SCRIPT_URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        displayPosts(data.data);
      } else {
        console.error("Error fetching posts:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Display Posts Functionality
function displayPosts(posts) {
  postsContainer.innerHTML = '';
  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <p><strong>Name:</strong> ${post[1]}</p>
      <p><strong>Email:</strong> ${post[2]}</p>
      <p><strong>Message:</strong> ${post[3]}</p>
      <p><small>${new Date(post[0]).toLocaleString()}</small></p>
    `;
    postsContainer.appendChild(postElement);
  });
}