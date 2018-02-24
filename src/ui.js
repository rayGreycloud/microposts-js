class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }
  
  showPosts(posts) {
    let output = '';
    
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id=${post.id}>
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id=${post.id}>
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });
    
    this.post.innerHTML = output;
  }
  
  showAlert(message, className) {
    this.clearAlert();
    
    // Create div 
    const div = document.createElement('div');
    // Add classes 
    div.className = className;
    // Add text 
    div.appendChild(document.createTextNode(message));
    // Get parent 
    const container = document.querySelector('.postsContainer');
    // Get posts 
    const posts = document.querySelector('#posts');
    // Insert alert div 
    container.insertBefore(div, posts);
    // Timer - clear alert after 3 secs
    setTimeout(() => {
      this.clearAlert();
    }, 3000);     
  }
  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  // Clear input fields 
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
  // Fill input fields 
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    this.changeFormState('edit');
  }
  // Clear Id 
  clearIdInput() {
    this.idInput.value = '';
  }
  // Change form state 
  changeFormState(type) {
    // Check state type
    if (type === 'edit') {
      // if edit then change button
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-outline-warning btn-block';
      
      // Create cancel button 
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-outline-secondary btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));
      
      // Get parent element 
      const cardForm = document.querySelector('.card-form');
      // Insert update button
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
      // cardForm.insertBefore(button, this.postSubmit.nextSibling);
    } else {
      // Change button to Post It
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-outline-primary btn-block';
      // Remove cancel button if there
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // Clear ID from hidden field 
      this.clearIdInput();
      // Clear text fields 
      this.clearFields();
      
    }
  }
}

export const ui = new UI();