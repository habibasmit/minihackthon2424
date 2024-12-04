import { db, getDocs, deleteDoc, doc, collection } from "../firebase/firebase.js";  

// Firestore collection reference
const postsCollection = collection(db, "posts");
console.log(postsCollection, " <== postsCollection");

async function fetchPosts() {
  try {
    const querySnapshot = await getDocs(postsCollection);
    console.log("Snapshot fetched:", querySnapshot);

    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = '';

    if (querySnapshot.empty) {
      console.log("No posts found.");
      return;
    }

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      console.log("Post data:", postData);

      const postElement = document.createElement("div");
      postElement.classList.add("p-4", "bg-white", "rounded", "shadow", "mb-4");

      postElement.innerHTML = `
        <h3 class="font-semibold">${postData.username}</h3>
        <p>${postData.content}</p>
        <div class="mt-4">
          <button class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onclick="editPost('${doc.id}')">Edit</button>
          <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onclick="deletePost('${doc.id}')">Delete</button>
        </div>
      `;
      
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}


fetchPosts()