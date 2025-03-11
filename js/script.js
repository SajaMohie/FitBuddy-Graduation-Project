const slider = document.getElementById("slider");
const items = slider.innerHTML;
for (let i = 0; i < 10; i++) {
slider.innerHTML += items; 
}

const sliderTwo = document.getElementById("sliderTwo");
const itemsTwo = sliderTwo.innerHTML;
for (let i = 0; i < 10; i++) {
    sliderTwo.innerHTML += items; 
}

// const sampleData = [
//     { name: 'trainee-one', score: 250, img: 'assets/miguel hernandez.jpg' },
//     { name: 'trainee-two', score: 200, img: 'assets/14a44ee9-c75a-4f22-8850-eaa300cf1623.jpg' },
//     { name: 'trainee-three', score: 150, img: 'assets/download.jpg' },
//     { name: 'trainee-four', score: 800, img: 'assets/ImogenPic.jpg' },
//     { name: 'trainee-five', score: 890, img: 'assets/04aaeee2-237d-488b-b006-4256687eae50.jpg' },
// ];

async function fetchDataAndCreateChart() {
    try {
        const response = await fetch('http://fitbuddy.runasp.net/api/Ranking'); 
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json(); 

        const formattedData = data.map(item => ({
            name: item.name,
            score: item.score,
            img: item.image || 'assets/PicDefault.png', 
        }));

        createChart(formattedData); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


const maxHeights = [250, 200, 150, 100, 50, 30]; 

function createChart(data) {
    const chartContainer = document.querySelector('.bars');
    chartContainer.innerHTML = ''; 

    const sortedData = data.sort((a, b) => b.score - a.score);
    sortedData.forEach((item, index) => {
        const barWrapper = document.createElement('div'); 
        barWrapper.style.textAlign = 'center';

        const bar = document.createElement('div'); 
        bar.className = 'bar'; 
        const barHeight = maxHeights[index] || 30;
        bar.style.height = `${barHeight}px`; 

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;

        const scoreLabel = document.createElement('span'); 
        scoreLabel.className = 'label';
        scoreLabel.textContent = item.score;

        bar.appendChild(img);
        bar.appendChild(scoreLabel);

        // إنشاء اسم المستخدم وإضافته خارج الشريط
        const nameLabel = document.createElement('div');
        nameLabel.className = 'name-label';
        nameLabel.textContent = item.name;

        // إضافة الشريط واسم المستخدم للحاوية
        barWrapper.appendChild(bar);
        barWrapper.appendChild(nameLabel);
        chartContainer.appendChild(barWrapper);
    });
}

// createChart(sampleData);
fetchDataAndCreateChart();

document.addEventListener("DOMContentLoaded", function () {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) { // يظهر بعد 200 بكسل
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    });
});