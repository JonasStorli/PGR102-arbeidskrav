// Function to update the health bars and health text
function updateHealthBars() {
    // Update health bar width and ensure HP doesn't go below zero
    healerHealthBar.style.width = Math.max((heroesArray[0].currentHP / heroesArray[0].maxHP) * 300, 0) + 'px';
    archerHealthBar.style.width = Math.max((heroesArray[1].currentHP / heroesArray[1].maxHP) * 300, 0) + 'px';
    warriorHealthBar.style.width = Math.max((heroesArray[2].currentHP / heroesArray[2].maxHP) * 300, 0) + 'px';
    dragonHealthBar.style.width = Math.max((dragonStats.currentHP / dragonStats.maxHP) * 300, 0) + 'px';
  
    // Update health text
    healerHealthTxt.textContent = `${heroesArray[0].currentHP} / ${heroesArray[0].maxHP} HP`;
    archerHealthTxt.textContent = `${heroesArray[1].currentHP} / ${heroesArray[1].maxHP} HP`;
    warriorHealthTxt.textContent = `${heroesArray[2].currentHP} / ${heroesArray[2].maxHP} HP`;
    dragonHealthTxt.textContent = `${dragonStats.currentHP} / ${dragonStats.maxHP} HP`;
  
    // Function to update health bar color based on current health
    function updateHealthBarColor(healthBar, currentHP, maxHP) {
      const healthPercentage = currentHP / maxHP; // Calculate health percentage (0 to 1)
      const red = Math.round((1 - healthPercentage) * 255); // Red value increases as health decreases
      const green = Math.round(healthPercentage * 255); // Green value decreases as health decreases
      healthBar.style.backgroundColor = `rgb(${red}, ${green}, 0)`; // Set background color
    }
  
    // Update health bar colors
    updateHealthBarColor(healerHealthBar, heroesArray[0].currentHP, heroesArray[0].maxHP);
    updateHealthBarColor(archerHealthBar, heroesArray[1].currentHP, heroesArray[1].maxHP);
    updateHealthBarColor(warriorHealthBar, heroesArray[2].currentHP, heroesArray[2].maxHP);
    updateHealthBarColor(dragonHealthBar, dragonStats.currentHP, dragonStats.maxHP);
  }
  
  // Function to show the reset button
  function showResetButton() {
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.style.display = 'block'; // Make the reset button visible
  }
  
  // Function to handle hero attack
  function heroAttack(hero) {
    if (!hero.alive) return; // Return if the hero is dead
  
    dragonStats.currentHP -= hero.damage; // Subtract hero's damage from dragon's current HP
    if (dragonStats.currentHP <= 0) dragonStats.currentHP = 0; // Prevent negative health
  
    alert(`${hero.name} har gjort ${hero.damage} skade på ${dragonStats.name}!`);
    updateHealthBars(); // Update health bars after attack
  
    if (dragonStats.currentHP <= 0) {
      alert("Gratulerer, du har vunnet spillet!");
      showResetButton(); // Show reset button when the game is won
      return; // End the game
    }
  
    dragonAttack(); // Dragon counter-attack
  }
  
  // Function for dragon attack
  function dragonAttack() {
    const aliveHeroes = heroesArray.filter(hero => hero.alive); // Get alive heroes
    if (aliveHeroes.length === 0) return; // No heroes to attack
  
    const randomHero = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)]; // Randomly select an alive hero
    randomHero.currentHP -= dragonStats.damage; // Subtract dragon's damage from hero's current HP
    if (randomHero.currentHP <= 0) {
      randomHero.currentHP = 0; // Prevent negative health
      randomHero.alive = false; // Mark hero as dead
    }
  
    alert(`${dragonStats.name} har angrepet ${randomHero.name}!`);
    updateHealthBars(); // Update health bars immediately
  
    // Check if all heroes are dead
    const allHeroesDead = heroesArray.every(hero => !hero.alive);
    if (allHeroesDead && dragonStats.currentHP > 0) {
      alert(`Spillet er tapt! ${dragonStats.name} har vunnet!`);
      showResetButton(); // Show reset button when the game is lost
    }
  }
  
  // Function to reset the game
  function resetGame() {
    // Reset dragon stats
    dragonStats.currentHP = dragonStats.maxHP;
    dragonStats.alive = true;
  
    // Reset heroes stats
    heroesArray.forEach(hero => {
      hero.currentHP = hero.maxHP;
      hero.alive = true;
    });
  
    // Update UI
    updateHealthBars();
    resetBtn.style.display = 'none'; // Hide the reset button again
    alert("Spillet er tilbakestilt! Du kan begynne på nytt.");
  }
  
  // Event listener for reset button
  const resetBtn = document.getElementById('reset-btn');
  resetBtn.addEventListener('click', resetGame);
  
  // Attach click event to heroes
  healer.addEventListener("click", () => heroAttack(heroesArray[0]));
  archer.addEventListener("click", () => heroAttack(heroesArray[1]));
  warrior.addEventListener("click", () => heroAttack(heroesArray[2]));
  
  // Initial health bar update
  updateHealthBars();
  resetBtn.style.display = 'none'; // Initially hide the reset button
  