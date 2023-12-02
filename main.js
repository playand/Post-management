document.addEventListener('DOMContentLoaded', function () {
  const postForm = document.getElementById('postForm');
  const postList = document.getElementById('postList');
  let posts = [];

  postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;

    const editIndex = postForm.getAttribute('data-edit-index');
    if (editIndex !== null) {

      posts[editIndex] = { title, description, author };
      postForm.removeAttribute('data-edit-index');
    } else {

      const newPost = { title, description, author };
      posts.push(newPost);
    }
    savePostsToJson(posts);

    postForm.reset();

    displayPosts(posts);
  });

  function displayPosts(posts) {

    postList.innerHTML = '';


    posts.forEach((post, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `Title: ${post.title}<br/>Description: ${post.description}<br/>Author: ${post.author}`;


      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
        editPost(index);
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deletePost(index);
      });

      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);

      postList.appendChild(listItem);
    });
  }


  function editPost(index) {
    const post = posts[index];


    document.getElementById('title').value = post.title;
    document.getElementById('description').value = post.description;
    document.getElementById('author').value = post.author;

    postForm.setAttribute('data-edit-index', index);
  }


  function deletePost(index) {

    posts.splice(index, 1);


    savePostsToJson(posts);


    displayPosts(posts);
  }

  function savePostsToJson(posts) {
    const jsonPosts = JSON.stringify(posts);

    localStorage.setItem('posts', jsonPosts);
  }

  function loadPostsFromJson() {
    const jsonPosts = localStorage.getItem('posts');
    if (jsonPosts) {
      posts = JSON.parse(jsonPosts);
      displayPosts(posts);
    }
  }

  loadPostsFromJson();
});