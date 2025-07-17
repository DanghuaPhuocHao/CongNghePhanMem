class IndexController {
    getIndex(req, res) {
        res.status(200).json({ message: "Welcome to Ada Fastfood API!" });
    }

    async getItems(req, res) {
        // Logic to get items
        res.status(200).json({ message: "Get items" });
    }

    async createItem(req, res) {
        // Logic to create an item
        res.status(201).json({ message: "Item created" });
    }

    async updateItem(req, res) {
        // Logic to update an item
        res.status(200).json({ message: "Item updated" });
    }

    async deleteItem(req, res) {
        // Logic to delete an item
        res.status(204).send();
    }
}

module.exports = { IndexController };