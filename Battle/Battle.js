// Character class to create character objects
class Character {
    constructor(name, health, attackPower) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
    }

    // Method to attack another character
    attack(target) {
        console.log(`${this.name} attacks ${target.name} for ${this.attackPower} damage!`);
        target.takeDamage(this.attackPower);
    }

    // Method to take damage
    takeDamage(damage) {
        this.health -= damage;
        console.log(`${this.name} now has ${this.health} health left.`);
        
        if (this.health <= 0) {
            console.log(`${this.name} has been defeated!`);
        }
    }
}

// Create two characters
const character1 = new Character('Warrior', 100, 20);
const character2 = new Character('Mage', 80, 15);

// Character 1 attacks Character 2
character1.attack(character2);
