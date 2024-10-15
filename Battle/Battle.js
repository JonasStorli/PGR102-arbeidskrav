// Function to update the health bars and health text
function updateHealthBars() {
  healerHealthBar.style.width = (heroesArray[0].currentHP / heroesArray[0].maxHP) * 300 + 'px';
  archerHealthBar.style.width = (heroesArray[1].currentHP / heroesArray[1].maxHP) * 300 + 'px';
  warriorHealthBar.style.width = (heroesArray[2].currentHP / heroesArray[2].maxHP) * 300 + 'px';
  dragonHealthBar.style.width = (dragonStats.currentHP / dragonStats.maxHP) * 300 + 'px';

  healerHealthTxt.textContent = `${heroesArray[0].currentHP} / ${heroesArray[0].maxHP} HP`;
  archerHealthTxt.textContent = `${heroesArray[1].currentHP} / ${heroesArray[1].maxHP} HP`;
  warriorHealthTxt.textContent = `${heroesArray[2].currentHP} / ${heroesArray[2].maxHP} HP`;
  dragonHealthTxt.textContent = `${dragonStats.currentHP} / ${dragonStats.maxHP} HP`;
}

// Function to handle hero attack
function heroAttack(hero) {
  if (!hero.alive) return; // Return if the hero is dead

  dragonStats.currentHP -= hero.damage; // Subtract hero's damage from dragon's current HP
  alert(`${hero.name} har gjort ${hero.damage} skade på ${dragonStats.name}!`);
  updateHealthBars(); // Update health bars after attack

  if (dragonStats.currentHP <= 0) {
      alert("Gratulerer, du har vunnet spillet!");
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
  alert(`${dragonStats.name} har angrepet ${randomHero.name}!`);

  if (randomHero.currentHP <= 0) {
      randomHero.alive = false; // Mark hero as dead
      updateHealthBars(); // Update health bars

      // Check if all heroes are dead
      const allHeroesDead = heroesArray.every(hero => !hero.alive);
      if (allHeroesDead && dragonStats.currentHP > 0) {
          alert(`Spillet er tapt! ${dragonStats.name} har vunnet!`);
      }
  }
}

// Attach click event to heroes
healer.addEventListener("click", () => heroAttack(heroesArray[0]));
archer.addEventListener("click", () => heroAttack(heroesArray[1]));
warrior.addEventListener("click", () => heroAttack(heroesArray[2]));

// Initial health bar update
updateHealthBars();
