document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('flower-picker-theme');
    
    // Apply saved theme or default
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    // Theme toggle event listener with anti-glitch protection
    let isTransitioning = false;
    themeToggle.addEventListener('change', () => {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        if (themeToggle.checked) {
            // Switch to Dark Mode
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('flower-picker-theme', 'dark');
        } else {
            // Switch to Light Mode
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('flower-picker-theme', 'light');
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 300); // Add proper transition duration (300ms is standard)
    });
    
    // Flower selection functionality
    const flowerImages = document.querySelectorAll('.flower-img');
    const confirmBtn = document.querySelector('.ConfirmBtn');
    const deleteBtn = document.querySelector('.DeleteBtn');
    const flowerContainer = document.querySelector('.flower-container');
    const btnGroup = document.querySelector('.button-group');
    const mainContainer = document.querySelector('.main');
    
    // Maximum number of flowers that can be selected
    const MAX_SELECTIONS = 3;
    let selectedFlowers = [];
    
    // Array of compliments
    const compliments = [
        "These flowers are as beautiful as your smile!",
        "What a wonderful selection! They complement each other perfectly.",
        "Your taste in flowers is exquisite!",
        "These blooms will brighten anyone's day!",
        "A gorgeous bouquet that reflects your lovely personality!",
        "Such a delightful combination of colors and shapes!",
        "Your flower choices are simply magical!",
        "What a beautiful arrangement you've created!",
        "These flowers together create pure beauty!",
        "Your selection shows your eye for natural beauty!"
    ];
    
    // Create selection message element
    const selectionMessage = document.createElement('p');
    selectionMessage.className = 'selection-message';
    selectionMessage.textContent = `Select up to ${MAX_SELECTIONS} flowers (0/${MAX_SELECTIONS} selected)`;
    flowerContainer.insertAdjacentElement('beforeend', selectionMessage);
    
    // Add ID and click event listeners to each flower image
    flowerImages.forEach((img, index) => {
        // Add ID if it doesn't already have one
        if (!img.id) {
            img.id = `flower-${index + 1}`;
        }
        
        img.addEventListener('click', () => {
            // If image is already selected, deselect it
            if (img.classList.contains('selected')) {
                img.classList.remove('selected');
                selectedFlowers = selectedFlowers.filter(flower => flower.id !== img.id);
            } 
            // If not selected and haven't reached max, select it
            else if (selectedFlowers.length < MAX_SELECTIONS) {
                img.classList.add('selected');
                selectedFlowers.push({
                    id: img.id,
                    src: img.src,
                    alt: img.alt
                });
            }
            
            // Update selection message
            selectionMessage.textContent = `Select up to ${MAX_SELECTIONS} flowers (${selectedFlowers.length}/${MAX_SELECTIONS} selected)`;
        });
    });
    
    // Confirm button click event
    confirmBtn.addEventListener('click', () => {
        if (selectedFlowers.length === 0) {
            alert('Please select at least one flower!');
            return;
        }
        
        // Hide the flower selection container and buttons
        flowerContainer.style.display = 'none';
        btnGroup.style.display = 'none';
        
        // Create result container
        const resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';
        resultContainer.style.display = 'block';
        
        // Create heading
        const heading = document.createElement('h2');
        heading.textContent = 'Your Beautiful Selection';
        heading.className = 'title';
        heading.style.fontSize = '30px';
        resultContainer.appendChild(heading);
        
        // Create container for selected flowers
        const selectedFlowersContainer = document.createElement('div');
        selectedFlowersContainer.className = 'selected-flowers';
        
        // Add selected flowers to the container
        selectedFlowers.forEach(flower => {
            const img = document.createElement('img');
            img.src = flower.src;
            img.alt = flower.alt;
            img.className = 'flower-img';
            selectedFlowersContainer.appendChild(img);
        });
        
        resultContainer.appendChild(selectedFlowersContainer);
        
        // Add random compliment
        const compliment = document.createElement('p');
        compliment.className = 'compliment';
        compliment.textContent = compliments[Math.floor(Math.random() * compliments.length)];
        resultContainer.appendChild(compliment);
        
        // Add back button
        const backBtn = document.createElement('button');
        backBtn.className = 'BackBtn';
        backBtn.textContent = 'Pick Again';
        backBtn.addEventListener('click', () => {
            // Show the original containers
            flowerContainer.style.display = 'flex';
            btnGroup.style.display = 'flex';
            
            // Remove the result container
            resultContainer.remove();
            
            // Deselect all flowers
            selectedFlowers = [];
            flowerImages.forEach(img => {
                img.classList.remove('selected');
            });
            
            // Reset selection message
            selectionMessage.textContent = `Select up to ${MAX_SELECTIONS} flowers (0/${MAX_SELECTIONS} selected)`;
        });
        
        resultContainer.appendChild(backBtn);
        
        // Add result container to the main container
        mainContainer.appendChild(resultContainer);
    });
    
    // Delete button click event
    deleteBtn.addEventListener('click', () => {
        // Deselect all flowers
        selectedFlowers = [];
        flowerImages.forEach(img => {
            img.classList.remove('selected');
        });
        
        // Update selection message
        selectionMessage.textContent = `Select up to ${MAX_SELECTIONS} flowers (0/${MAX_SELECTIONS} selected)`;
    });
});