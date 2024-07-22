document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.getElementById('news-container');

    async function fetchNews() {
        try {
            const response = await fetch('https://gnews.io/api/v4/top-headlines?category=sports&lang=en&token=api_key_here');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Sorry, we could not load the news at this time.</p>';
        }
    }

    function displayNews(articles) {
        newsContainer.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'article';

            const title = document.createElement('h2');
            title.textContent = article.title;
            articleElement.appendChild(title);

            const description = document.createElement('p');
            description.textContent = article.description || 'No description available';
            articleElement.appendChild(description);

            if (article.image) {
                const image = document.createElement('img');
                image.src = article.image;
                image.alt = article.title;
                articleElement.appendChild(image);
            }

            newsContainer.appendChild(articleElement);
        });
    }

    fetchNews();
});
