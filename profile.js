import { getAuth, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const auth = getAuth();
const profileForm = document.getElementById("profileForm");
const displayNameInput = document.getElementById("displayName");
const profilePhotoInput = document.getElementById("profilePhoto");
const previewImage = document.getElementById("previewImage");
const newPasswordInput = document.getElementById("newPassword");

// Handle profile update form submission
profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = auth.currentUser;
  const newDisplayName = displayNameInput.value;
  const newProfilePhoto = profilePhotoInput.files[0]; // Get selected file
  const newPassword = newPasswordInput.value;

  try {
    if (newDisplayName !== user.displayName || newProfilePhoto) {
      // Update display name
      // Update profile photo if a new file is selected
      await updateProfileAndPhoto(user, newDisplayName, newProfilePhoto);
    }

    if (newPassword) {
      await updatePassword(user, newPassword);
    }

    // Handle successful profile update
    alert("Profile updated successfully!");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // Handle error
    alert("An error occurred while updating your profile.");
  }
});

// Update profile photo and display name
async function updateProfileAndPhoto(user, displayName, profilePhoto) {
  try {
    if (profilePhoto) {
      // Upload image to a storage service (you'll need to implement this)
      const imageUrl = await uploadProfilePhoto(profilePhoto);
      await updateProfile(user, {
        displayName: displayName,
        photoURL: imageUrl,
      });
    } else {
      await updateProfile(user, {
        displayName: displayName,
      });
    }
  } catch (error) {
    throw error;
  }
}

// Implement this function to upload the profile photo to a storage service
async function uploadProfilePhoto(profilePhoto) {
  // You should implement this function to upload the photo and return its URL
  // Example: use Firebase Storage or another storage service
  // return imageUrl;
}
