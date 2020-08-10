
export default class ItemManager {

    constructor(itemList) {
        this.itemList = itemList.slice();
    };


    addItem(item) {
        this.itemList.push(item);

        return this.itemList;
    };

    deleteItem(index) {
        if (index > -1) {
            this.itemList.splice(index, 1);
        }

        return this.itemList;
    };

    getItem(index) {
        if (index > -1) {
            return this.itemList[index];
        }
        return null;
    }
    updateItem(data, index) {
        if (index > -1) {
            this.itemList[index]["Name"] = data.Name;
            this.itemList[index]["Gender"] = data.Gender;
            this.itemList[index]["Age"] = data.Age;
        }
        return this.itemList;
    }
    clearAll() {
        return [];
    }

}