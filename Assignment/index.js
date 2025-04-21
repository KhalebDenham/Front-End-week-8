class Ork {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }


    describe() {
        return `${this.name} fights with ${this.weapon}`;
    }


}

class warBand {
    constructor(name) {
        this.name = name;
        this.orks = [];
    }

    addOrk(ork) {
        if (ork instanceof Ork) {
            this.orks.push(ork)
        } else {
            throw new Error(`You can only add an instance of Ork. Argument is not an ork: ${ork}`);
        }
    }

    describe() {
        return `${this.name} ${this.orks.length} orks.`;
    }
}


class Menu {
    constructor() {
        this.warBands = [];
        this.selectedWarBand = null;

    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createWarBand();
                    break;
                case '2':
                    this.viewWarBand();
                    break;
                case '3':
                    this.deleteWarBand();
                    break;
                case '4':
                    this.displayWarBands();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();

        }

        alert('Goodbye!');
    }
    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New WarBand
            2) View WarBand
            3) Delete WarBand
            4) Display All WarBands
            `);
    }

    showWarBandMenuOptions(bandInfo) {
        return prompt(`
            0) back
            1) create a Ork
            2) delete a Ork
            ------------------
            ${bandInfo}
            `);
    }

    displayWarBands() {
        let bandString = '';
        for (let i = 0; i < this.warBands.length; i++) {
            bandString += i + ') ' + this.warBands[i].name + '\n'; //concats index I into warband string, which shows warband index and warband name, then gives new line
        } 
        alert(bandString);
    }
    
    createWarBand() {
        let name = prompt('Enter name for your new Warband');
        this.warBands.push(new warBand(name)); //creates warband and takes constructor of name, then adds it to the team list
    }

    viewWarBand() {
        let index = prompt('Enter the index of the WarBand you wish to view');
        if (index > -1 && index < this.warBands.length) { //validate user input
            this.selectedWarBand = this.warBands[index];
            let description = 'WarBand name: ' + this.selectedWarBand.name + "\n"; //concatinates the name under the selected band into the description then prints a new line

            for (let i = 0; i < this.selectedWarBand.orks.length; i++) {
                description += i + ') ' + this.selectedWarBand.orks[i].name + " - " + this.selectedWarBand.orks[i].weapon + "\n";
            }

            let selection = this.showWarBandMenuOptions(description);
            switch(selection) {
                case "1":
                    this.createOrk();
                    break;
                case '2':
                    this.deleteOrk();    
            }

        }


    }
    
    deleteWarBand() {
        let index = prompt("Enter the index of the team you wish to delete: ");
        if(index > -1 && index < this.warBands.length) {
            this.warBands.splice(index, 1);
        }
    }

    createOrk () {
        let name = prompt("Enter the name of the ork: ");
        let weapon = prompt("Enter weapon of the ork: ");
        this.selectedWarBand.orks.push(new Ork(name, weapon));
    }

    deleteOrk() {
        let index = prompt("Enter index of the ork you wish to delete: ");
        if (index > -1 && index < this.selectedWarBand.orks.length) {
            this.selectedWarBand.orks.splice(index, 1);
        }
    }

} //Menu Class End

let menu = new Menu();

menu.start();