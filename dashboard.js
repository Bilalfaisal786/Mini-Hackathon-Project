import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDkSwX5C3URXbZShC9Ho9e0UhoOXJqPx18",
    authDomain: "hackathon-project-54d06.firebaseapp.com",
    projectId: "hackathon-project-54d06",
    storageBucket: "hackathon-project-54d06.appspot.com",
    messagingSenderId: "340758903446",
    appId: "1:340758903446:web:37c09b8eedc0d1b83960b7"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  document.addEventListener("DOMContentLoaded", function() {
    
      
      //   const app =app
      // const auth = getAuth();
      // const db = getFirestore();
      let logoutBtn = document.getElementById("logout_btn");
      const blogPostsContainer = document.getElementById("blogPosts");
      let addBlogForm = document.getElementById("addBlogForm");
      let blogTitleInput = document.getElementById("blogTitle");
      let blogBodyInput = document.getElementById("blogBody");
      

      
      // Handle logout
      logoutBtn.addEventListener("click", async () => {
        console.log("Logout button clicked");
        await signOut(auth);
          window.location.href = "login.html";
        });
        
        // Display user's full name and fetch blog posts
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Display user's name
                const userFullName = user.displayName || user.email;
                document.querySelector(".header h1").textContent = `Welcome to Your Dashboard, ${userFullName}`;
                
                // Fetch and display blog posts
                await displayBlogPosts(user.uid);
                
                // Handle new blog post submission
                addBlogForm.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const title = blogTitleInput.value;
                    const body = blogBodyInput.value;
                    
                    if (title && body) {
                        await addNewBlogPost(user.uid, title, body);
                        blogTitleInput.value = "";
                        blogBodyInput.value = "";
                    }
                });
            }
        });
        
// Display user's blog posts
async function displayBlogPosts(userId) {
    blogPostsContainer.innerHTML = "";
    
    const blogPostsRef = collection(db, "blogPosts");
    const q = query(blogPostsRef, orderBy("timestamp", "desc"));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const blogData = doc.data();
        if (blogData.userId === userId) {
            const blogItem = createBlogItemElement(doc.id, blogData.title, blogData.body);
            blogPostsContainer.appendChild(blogItem);
        }
    });
}

// Create a blog post item element
function createBlogItemElement(postId, title, body) {
    const blogItem = document.createElement("div");
    blogItem.classList.add("blog-item");
    blogItem.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>
    <button class="edit-btn" data-id="${postId}">Edit</button>
    <button class="delete-btn" data-id="${postId}">Delete</button>
    `;
    
    const editBtn = blogItem.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const newTitle = prompt("Enter new title:", title);
        if (newTitle !== null) {
            updateBlogPostTitle(postId, newTitle);
        }
    });
    
    const deleteBtn = blogItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this post?")) {
            await deleteBlogPost(postId);
        }
    });
    
    return blogItem;
}

// Add a new blog post
async function addNewBlogPost(userId, title, body) {
    try {
        const newDocRef = await addDoc(collection(db, "blogPosts"), {
            userId,
            title,
            body,
            timestamp: new Date()
        });
        const blogItem = createBlogItemElement(newDocRef.id, title, body);
        blogPostsContainer.insertBefore(blogItem, blogPostsContainer.firstChild);
    } catch (error) {
        console.error("Error adding document:", error);
    }
}

// Update blog post title
async function updateBlogPostTitle(postId, newTitle) {
    const blogDocRef = doc(db, "blogPosts", postId);
    await updateDoc(blogDocRef, { title: newTitle });
    await displayBlogPosts(auth.currentUser.uid);
}

// Delete a blog post
async function deleteBlogPost(postId) {
    const blogDocRef = doc(db, "blogPosts", postId);
    await deleteDoc(blogDocRef);
    await displayBlogPosts(auth.currentUser.uid);
}






// await setDoc(doc(db, "user",user.uid), {
    //     blogTitle:blogTitle ,
    //     blogBody: blogBody,
    
    //   });
});