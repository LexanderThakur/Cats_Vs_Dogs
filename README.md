# 🐱🐶 Unsupervised Cats vs Dogs Classification using SimCLR

This project implements **SimCLR-based contrastive learning** to separate cat and dog images **without using any labels**.  
A custom CNN encoder is trained entirely through augmentations and the NT-Xent loss, and the resulting embeddings are clustered using PCA + K-Means.

---

## 🌟 Overview

Traditional Cats vs Dogs classification uses supervised learning and requires thousands of labeled images.  
In this project, we explore a **fully unsupervised alternative** using:

- A custom CNN encoder
- SimCLR contrastive learning
- Strong augmentation pipeline
- NT-Xent loss
- PCA + K-means clustering

The goal is to show that meaningful visual representations can emerge **without supervision**.

---

## 🧠 Method Summary

### **1. Data Augmentation (SimCLR Framework)**

Each image is transformed into **two augmented views** using:

- RandomResizedCrop
- HorizontalFlip
- ColorJitter
- GaussianBlur
- RandomGrayscale
- ToTensor + Normalization

These views form **positive pairs**, while all other images act as **negative pairs**.

---

### **2. CNN Encoder**

A lightweight convolutional encoder extracts a **256-dimensional feature vector** from each augmented view.  
The model uses:

- Conv → BatchNorm → ReLU blocks
- MaxPooling
- AdaptiveAvgPool
- A final fully connected projection to 256 dimensions

---

### **3. Projection Head**

A small MLP maps embeddings from **256 → 128 dimensions**.  
The projection head:

- Makes contrastive training easier
- Prevents representation collapse
- Is discarded after training

---

### **4. Contrastive Learning (NT-Xent Loss)**

The NT-Xent loss encourages:

- **High similarity** for augmented views of the same image
- **Low similarity** for views from different images

This organizes the embedding space into meaningful structure **without labels**.

---

### **5. Embedding Extraction + Clustering**

After training:

- Extract 256-d embeddings for all images
- Apply PCA (256 → 50) for clustering
- Apply PCA (50 → 2) or t-SNE for visualization
- Run **K-Means (k=2)** to cluster Cats vs Dogs

---

## 📊 Results

### **Clustering Performance**

- **K-Means Accuracy:** ~73.45%
- Clear separation in PCA/t-SNE visualizations
- Strong semantic grouping despite zero labels used

### **Training Stability**

- Trained for **200 epochs**
- Used a GPU with **3.6 GB VRAM**, batch size = 16
- Took ~3 nights of training (~570 minutes each)

---

## 🧪 Key Findings

- SimCLR learns strong image features **without labels**.
- Even a small custom CNN can produce meaningful embeddings.
- Augmentations and contrastive loss are crucial for learning invariances.
- Unsupervised embeddings cluster naturally into cats and dogs.

---

---

---
