import { db, getDocs, deleteDoc, doc, collection, updateDoc } from "../firebase/firebase.js";

const postsCollection = collection(db, "posts");

async function fetchPosts() {
  try {
    const querySnapshot = await getDocs(postsCollection);
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = '';
   
    if (querySnapshot.empty) {
      const noPostsMessage = document.createElement("div");
      noPostsMessage.textContent = "No posts available.";
      noPostsMessage.style.textAlign = "center";
      noPostsMessage.style.fontSize = "24px";
      noPostsMessage.style.color = "red";
      noPostsMessage.style.fontWeight = "bold";
      noPostsMessage.style.marginTop = "40px";
      postsContainer.appendChild(noPostsMessage);
      return;
    }

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      const postElement = document.createElement("div");
      postElement.classList.add("p-4", "bg-white", "rounded", "shadow", "mb-4");

      postElement.innerHTML = `
        <h3 class="font-semibold">${postData.username}</h3>
        <p>${postData.content}</p>
        <div class="mt-4">
          <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 edit-btn">Edit</button>
          <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2 delete-btn">Delete</button>
        </div>
      `;

      const editButton = postElement.querySelector(".edit-btn");
      const deleteButton = postElement.querySelector(".delete-btn");

      editButton.addEventListener("click", () => editPost(doc.id, postData));
      deleteButton.addEventListener("click", () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this post?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            deletePost(doc.id);
          }
        });
      });

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function deletePost(postId) {
  try {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);

    Swal.fire({
      icon: 'success',
      title: 'Post Deleted!',
      text: 'The post has been successfully deleted.',
    });

    fetchPosts();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'There was an error deleting the post.',
    });
  }
}

function editPost(postId, postData) {
  const editForm = document.createElement("div");
  editForm.classList.add("edit-form-container");
  editForm.innerHTML = `
    <h3>Edit Post</h3>
    <textarea id="editContent" rows="4" cols="50">${postData.content}</textarea>
    <br>
    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" id="saveBtn">Save</button>
    <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" id="cancelBtn">Cancel</button>
  `;

  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = '';
  postsContainer.appendChild(editForm);

  document.getElementById("saveBtn").addEventListener("click", () => saveEdit(postId));
  document.getElementById("cancelBtn").addEventListener("click", () => fetchPosts());
}

async function saveEdit(postId) {
  const newContent = document.getElementById("editContent").value;

  if (!newContent.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Content cannot be empty.',
    });
    return;
  }

  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      content: newContent,
    });

    Swal.fire({
      icon: 'success',
      title: 'Post Updated!',
      text: 'The post has been successfully updated.',
    });

    fetchPosts();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'There was an error updating the post.',
    });
  }
}

fetchPosts();
