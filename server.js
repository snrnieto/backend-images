const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
var port = process.env.PORT || 3001;



const images = [
  "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1618333452884-5c8d211ed2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1603217192097-13c306522271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1584998316204-3b1e3b1895ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1616313253719-c46514cddee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1617059322001-a61ce9551e08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1616847220575-31b062a4cd05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
];

const videos = [
  "https://assets.mixkit.co/videos/preview/mixkit-a-model-in-a-red-outfit-lifts-their-leg-in-50648-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-to-the-camera-in-retro-outfit-49076-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-girl-posing-for-the-camera-in-the-middle-of-nowhere-34407-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-with-her-headphones-while-taking-a-walk-4823-large.mp4",
];

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

function getRandomVideo() {
  return videos[Math.floor(Math.random() * videos.length)];
}

function getRandomType() {
  return Math.random() > 0.15 ? "image" : "video";
}

function generateRandomId() {
  return Math.floor(Math.random() * 1000);
}
function generateRandomImageList(length) {
  return [...Array(length)].map((_, index) => {
    const type = getRandomType();
    return {
      id: generateRandomId(),
      products: [...Array(length)].map((_, index) => {
        return {
          id: generateRandomId(),
          type,
          src: type === "image" ? getRandomImage() : getRandomVideo(),
          thumbnail: getRandomImage(),
          name: `Product Name ${index}`,
          store: `Store Name ${index}`,
          price: `$${Math.floor(Math.random() * 100)}`,
          quantity: 1,
          checked: true,
        };
      }),
    };
  });
}

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

function getRandomMultipleOf100() {
  return Math.floor(Math.random() * 10 + 1) * 100;
}

// Endpoint to get a list of outfits
app.get("/outfits", (req, res) => {
  const imagesLength = Math.floor(Math.random() * 8) + 2;

  const outfits = generateRandomImageList(imagesLength);

  const outfitsToReturn = outfits.map((outfit) => {
    const sortedProducts = outfit.products.sort((a, b) =>
      a.type === "video" ? -1 : 1
    );
    outfit.products = sortedProducts;
    return outfit;
  });

  res.json({ outfits: outfitsToReturn });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
