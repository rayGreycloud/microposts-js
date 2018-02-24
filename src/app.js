import { http } from './ezhttp';
import { ui } from './ui';

// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);
// Add post listener
document.querySelector('.post-submit')
  .addEventListener('click', submitPost);

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

