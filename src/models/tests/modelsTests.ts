import { product, products } from "../productsModel";

const store = new products()

describe("Products Model exist", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
}); 