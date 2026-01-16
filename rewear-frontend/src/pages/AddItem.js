import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AddItem.css";
import API from "../services/api";
import { toast } from "react-toastify";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Create a preview for the image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("⚠️ Please login first!");
        navigate("/login");
        return;
      }

      // ✅ Prepare form data for file upload
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("image", formData.image);

      // ✅ Send to backend
      await API.post("/items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Item request sent to admin. Await approval!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        image: null,
      });
      setPreviewImage(null);
      navigate("/browse"); // redirect
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to upload item. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-item-page">
      <Navbar />

      <div className="add-item-container">
        <div className="add-item-header">
          <h1 className="add-item-title">Share Your Item</h1>
          <p className="add-item-subtitle">
            Upload clothing you no longer use and make it available for
            swapping!
          </p>
        </div>

        <div className="add-item-content">
          <form className="add-item-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter item name (e.g., Blue T-Shirt)"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Choose a category</option>
                  <option value="tops">Tops</option>
                  <option value="dresses">Dresses</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your item, condition, size, brand, etc."
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="form-textarea"
              ></textarea>
            </div>

            <div className="upload-section">
              <label className="form-label">Upload Image *</label>
              <div
                className="upload-area"
                onClick={() => document.getElementById("image-upload").click()}
              >
                {previewImage ? (
                  <div className="image-preview-container">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="image-preview"
                    />
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📷</div>
                    <p className="upload-text">Click to upload an image</p>
                    <p className="upload-hint">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  id="image-upload"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Uploading...
                  </>
                ) : (
                  "Add Item"
                )}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/browse")}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="info-sidebar">
            <div className="info-card">
              <h3>💡 Tips for Great Listings</h3>
              <ul>
                <li>Include detailed descriptions</li>
                <li>Take clear, well-lit photos</li>
                <li>Mention size, brand, and condition</li>
                <li>Highlight any unique features</li>
              </ul>
            </div>
            <div className="eco-impact">
              <div className="impact-icon">♻️</div>
              <h4>Your Impact</h4>
              <p>
                By sharing your item, you're contributing to a more sustainable
                fashion ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
