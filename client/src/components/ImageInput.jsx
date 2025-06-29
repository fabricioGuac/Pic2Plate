import { useState } from "react";

export default function ImageInput({ setRecipes }) {
    // State variables
    // Tracks the selected file from either file input or the camera
    const [selectedFile, setSelectedFile] = useState(null);
    // Stores a URL preview for the selected image
    const [imagePreview, setImagePreview] = useState(null);
    //  Stores any error message to display to the user
    const [errorMsg, setErrorMsg] = useState("");
    // Flag to indicate whether the request to the API is in progress
    const [loading, setLoading] = useState(false);

    // Function to handle seelection of a new image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // Clears any previous error messages and recipe results
        setErrorMsg("");
        setRecipes([]);
        // Validate file size (limit to 15MB)
        if (file.size > 15 * 1024 * 1024) {
            setErrorMsg("File is too large. Please upload an image smaller than 15MB.");
            return;
        }
        // Sets new file and creates an object URL for the image preview
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Function to handle the upload to the backend API
    const handleUpload = async () => {
        // Ensure there is an image to check
        if (!selectedFile) {
            setErrorMsg(" Please select an image.");
            return;
        }

        // Initiates a bew form data object
        const formData = new FormData();
        // Adds the image file to the form data
        formData.append('image', selectedFile);
        // Starts loading state
        setLoading(true);

        try {
            // Calls the API endpoint to get the recipe recomendations
            const res = await fetch("/api/vision", {
                method: "POST",
                body: formData,
            });
            // Ensures the response is successfull
            if (!res.ok) {
                throw new Error("Server error");
            }
            // Parses the data
            const data = await res.json();
            // Shows the new recipes
            setRecipes(data.recipes);
            // Clears any error messages
            setErrorMsg("");
        } catch (err) {
            console.error(err);
            setErrorMsg("Failed to generate recipes.");
        } finally {
            //  Resets loading state
            setLoading(false);
        }
    };

    return (
        <div className="image-input-container">
            <label htmlFor="ingredients_img">Select Image</label>
            <input
                type="file"
                name="ingredients_img"
                id="ingredients_img"
                accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
                onChange={handleImageChange}
            />
            {/* Mobile option to take a picture of the ingredients (not like you are taking ingredients to you desktop) */}
            <label htmlFor="cameraInput">Take Picture</label>
            <input
                id="cameraInput"
                type="file"
                accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
                capture="environment"
                onChange={handleImageChange}
            />

            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Loading..." : "Generate Recipes"}
            </button>

            {errorMsg && <p>{errorMsg}</p>}
        </div>

    )
}