const accessKey = process.env.UNSPLASH_API_KEY;

const form = document.querySelector("form");
const input = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore =document.getElementById("show-more");

let inputData = "";
let page = 1;
let title = document.getElementById("title");

async function searchImages(){
    inputData = input.value;
    title.innerHTML = inputData;
    title.style.textTransform = "capitalize";
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=20&client_id=${accessKey}`;

    const response = await fetch(url);
    
    const data = await response.json();
    
    const results = data.results;
    console.log(results);
    if(page===1){
        searchResults.innerHTML = "";
    }

    // results.map((results) => {
    //     const searchResult = document.createElement("div");
    //     searchResult.classList.add("search-result");

    //     const imgDiv = document.createElement("div");
    //     imgDiv.classList.add("img");

    //     const a_img =document.createElement("a");
    //     a_img.href = results.links.html;
    //     a_img.target  = "_blank";
    //     a_img.textContent = results.alt_description;

    //     const img = document.createElement("img");
    //     img.src = results.url;
    //     img.alt = results.alt_description;

    //     const info = document.createElement("div");
    //     info.classList.add("info");

    //     const info_a = document.createElement("a")
    //     info_a.href = a_img;

    //     const info_p = document.createElement("p");
    //     info_p.textContent = img.alt;
        
    //     imgDiv.appendChild(a_img);
    //     imgDiv.appendChild(info);
    //     a_img.appendChild(img);
    //     info.appendChild(info_a);
    //     info_a.appendChild(info_p);
    //     searchResult.appendChild(imgDiv);

    // })

    results.map((result) => {
        const searchResult = document.createElement("div");
        searchResult.classList.add("search-result");
    
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img");
    
        const a_img = document.createElement("a");
        a_img.href = result.links.html;  // Corrected: result, not results
        a_img.target = "_blank";
        // a_img.textContent = result.alt_description;
    
        const img = document.createElement("img");
        img.src = result.urls.small;  // Updated: Use 'urls.small' for the image source
        img.alt = result.alt_description;
    
        const info = document.createElement("div");
        info.classList.add("info");
    
        const info_a = document.createElement("a")
        info_a.href = result.links.html;
        info_a.target = "_blank";  // Add target attribute for opening in a new tab
    
        const info_p = document.createElement("p");
        info_p.textContent = result.alt_description;

        const info_likes_div = document.createElement("div");
        info_likes_div.classList.add("likes")

        const info_p_likes = document.createElement("p");
        info_p_likes.textContent = "Likes: " + result.likes;
        
        // info.style.display ="flex";
        // info.style.flexDirection ="column";
        
        searchResults.appendChild(searchResult); 
        searchResult.appendChild(imgDiv);
        imgDiv.appendChild(a_img);
        a_img.appendChild(img);
        searchResult.appendChild(info); 
        info.appendChild(info_a)
        info_a.appendChild(info_p);
        info_a.appendChild(info_likes_div);
        info_likes_div.appendChild(info_p_likes);
        
    });

    page++;

    if(page > 1){
        showMore.style.display = "block";
    }
}

form.addEventListener("submit",(event) =>{
    event.preventDefault()
    page = 1;
    searchImages();
})

showMore.addEventListener("click",() =>{
    searchImages();
})
