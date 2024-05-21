const event = {
    name: "party",
    gustList: ["amjad", "omar", "ahmad"],
    printGustList() {
        console.log(this.name);
        this.gustList.forEach((gust) => {
            console.log(gust + " is invite " + this.name);
        })
    }
}
event.printGustList()