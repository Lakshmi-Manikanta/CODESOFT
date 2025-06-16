// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Blog script loaded!");

    // Optional: Toggle comment section (if using one)
    const toggleButtons = document.querySelectorAll(".toggle-comments");
    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const commentBox = button.nextElementSibling;
            commentBox.classList.toggle("hidden");
        });
    });

    // Optional: Confirm delete post
    const deleteForms = document.querySelectorAll(".delete-post-form");
    deleteForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            if (!confirm("Are you sure you want to delete this post?")) {
                e.preventDefault();
            }
        });
    });
});
