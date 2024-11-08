const storageKey = "jxt_0_dynamicBlogWebsitePosts";

const samplePosts = [
    {
        title: "Blog Post Title 1",
        summary: "Add text here...",
        link: "post1.html"
    },
    {
        title: "Blog Post Title 2",
        summary: "Add text here...",
        link: "post2.html"
    },
    {
        title: "Blog Post Title 3",
        summary: "Add text here...",
        link: "post3.html"
    }
];

localStorage.setItem(storageKey, JSON.stringify(samplePosts));


function loadBlogPosts() {
    
    const posts = JSON.parse(localStorage.getItem(storageKey)) || [];
    const blogSection = document.querySelector(".blog-posts");

    blogSection.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("article"); 
        postElement.classList.add("post");

        
        postElement.innerHTML = 
        "<h2><a href='" + post.link + "'>" + post.title + "</a></h2>" +
        "<p class='post-summary'>" + (post.content || post.summary) + "</p>" +
        (post.imageUrl ? "<img src='" + post.imageUrl + "' alt='" + post.title + "' class='post-image'>" : "") +
        "<a href='" + post.link + "' class='read-more'>Read More</a>";


        blogSection.appendChild(postElement);
    });
}

function saveNewPost(event) {

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const imageUrl = document.getElementById("postImage").value || null;

    if (title.trim() == "" || content.trim() == "") {
        alert("Please fill in both the title and content section.");
        return;
    }

    const newPost = {
        title: title,
        content: content,
        imageUrl: imageUrl
    };

    
    const posts = JSON.parse(localStorage.getItem(storageKey)) || [];
    posts.push(newPost);

    localStorage.setItem(storageKey, JSON.stringify(posts));

    alert("New blog post saved successfully!");
    document.getElementById("newPostForm").reset();
}

if (document.querySelector(".blog-posts")) {
    window.addEventListener("DOMContentLoaded", loadBlogPosts);
}

const newPostForm = document.getElementById("newPostForm");
if (newPostForm) {
    newPostForm.addEventListener("submit", saveNewPost);
}


function loadPostDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const posts = JSON.parse(localStorage.getItem("jxt_0_dynamicBlogWebsitePosts")) || [];
    const post = posts[postId];

    if (post) {
        document.getElementById("postTitle").innerText = post.title;
        document.getElementById("postContent").innerText = post.content;
        document.getElementById("editTitle").value = post.title;
        document.getElementById("editContent").value = post.content;
    }
}


document.getElementById("editButton").addEventListener("click", function () {
    document.getElementById("editForm").style.display = "block";
    document.getElementById("editButton").style.display = "none";
});


document.getElementById("cancelButton").addEventListener("click", function () {
    document.getElementById("editForm").style.display = "none";
    document.getElementById("editButton").style.display = "block";
});


document.getElementById("saveButton").addEventListener("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const posts = JSON.parse(localStorage.getItem("jxt_0_dynamicBlogWebsitePosts")) || [];
    const post = posts[postId];

    post.title = document.getElementById("editTitle").value;
    post.content = document.getElementById("editContent").value;

    localStorage.setItem("jxt_0_dynamicBlogWebsitePosts", JSON.stringify(posts));

    alert("Post updated successfully!");
    loadPostDetails();
    document.getElementById("editForm").style.display = "none";
    document.getElementById("editButton").style.display = "block";
});

/
document.getElementById("deleteButton").addEventListener("click", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    const posts = JSON.parse(localStorage.getItem("jxt_0_dynamicBlogWebsitePosts")) || [];
    
    posts.splice(postId, 1);

    localStorage.setItem("jxt_0_dynamicBlogWebsitePosts", JSON.stringify(posts));

    alert("Post deleted successfully!");

    window.location.href = "index.html";
});

if (window.location.pathname.endsWith("post.html")) {
    window.addEventListener("DOMContentLoaded", loadPostDetails);
}

