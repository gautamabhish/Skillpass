// lib/cloudinaryUpload.ts

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_unsigned_preset"); // Replace with your actual upload preset
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/dcn4q3zt1/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Upload failed.");
    }
  
    const data = await response.json();
    return data.secure_url as string;
  };
  