import { http } from './ezhttp';
import { ui } from './ui';

// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);
// Add post listener
document.querySelector('.post-submit')
  .addEventListener('click', submitPost);
// Delete post listner 
document.querySelector('#posts')
  .addEventListener('click', deletePost);

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
  
  const data = {
    title, 
    body
  }
  
  // Create post 
  http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post added.', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));    
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

