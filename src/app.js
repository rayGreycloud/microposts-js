import { http } from './ezhttp';
import { ui } from './ui';

// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);
// Add post listener
document.querySelector('.post-submit')
  .addEventListener('click', submitPost);
// Delete post listener 
document.querySelector('#posts')
  .addEventListener('click', deletePost);
// Edit state listener 
document.querySelector('#posts')
  .addEventListener('click', enableEdit);
// Cancel edit listener 
document.querySelector('.card-form')
  .addEventListener('click', cancelEdit);

// Fetch posts from api and display
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// submit post handler 
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;
  const data = {
    title, 
    body
  }
  
  // Validate input
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    if (id === '') {
      // Create post 
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added.', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));    
    } else {
      // Update post 
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated.', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));          
    }
  }
}

// delete post handler 
function deletePost(e) {
  // Check for delete class 
  if (e.target.parentElement.classList.contains('delete')) {
    // Set id
    const id = e.target.parentElement.dataset.id;
    // User confirms delete 
    if (confirm('Are you sure?')) {
      // Send request to delete post from db
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          // Show alert 
          ui.showAlert('Post removed.', 'alert alert-success');
          // Update display 
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
  
  e.preventDefault();
}

// Enable edit state 
function enableEdit(e) {
  const parent = e.target.parentElement;
  
  if (parent.classList.contains('edit')) {
    // Set id
    const id = parent.dataset.id;
    // Get title 
    const title = parent.previousElementSibling.previousElementSibling.textContent;
    // Get body 
    const body = parent.previousElementSibling.textContent;
    // Insert into data 
    const data = {
      id, 
      title,
      body
    }
    // Fill form with current post 
    ui.fillForm(data);
  }
  
  e.preventDefault();  
}

// Cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  
  e.preventDefault();  
}
