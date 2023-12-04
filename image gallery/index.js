const startCatBtn = document.querySelector(".startCatBtn");
const loader = document.getElementById("loader");


async function getRandomCatImages() {
  try {
    loader.style.display = "block"; 

    const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
    
    if (!res.ok) {
      throw new Error("Что-то пошло не так!");
    }
    
    const data = await res.json();
    
    if (data && Array.isArray(data)) {
      const urls = data.map(cat => cat.url);
      displayCatImages(urls);
    } else {
      throw new Error("Отсутствуют данные о изображениях");
    }
  } catch (e) {
    console.error(e.message);
  } finally {
    console.log("(＾• ω •＾)");
    loader.style.display = "none"; 
  }
}


function displayCatImages(imageUrls) {
  const ImageContainer = document.getElementById("img-container");
  
  imageUrls.forEach(imageUrl => {
    const catImage = document.createElement("img");
    catImage.src = imageUrl;
    ImageContainer.appendChild(catImage);
  });
}


startCatBtn.addEventListener("click", getRandomCatImages);

