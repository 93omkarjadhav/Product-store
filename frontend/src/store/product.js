import { create } from "zustand";

const BACKEND_URL = "https://product-store-k7ak.onrender.com";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),

	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			const res = await fetch(`${BACKEND_URL}/api/products`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});
			const data = await res.json();
			set((state) => ({ products: [...state.products, data.data] }));
			return { success: true, message: "Product created successfully" };
		} catch (error) {
			console.error("Create error:", error);
			return { success: false, message: "Server error while creating product." };
		}
	},

	fetchProducts: async () => {
		try {
			const res = await fetch(`${BACKEND_URL}/api/products`);
			const data = await res.json();
			set({ products: data.data });
		} catch (error) {
			console.error("Fetch error:", error);
			set({ products: [] });
		}
	},

	deleteProduct: async (pid) => {
		try {
			const res = await fetch(`${BACKEND_URL}/api/products/${pid}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };

			set((state) => ({
				products: state.products.filter((product) => product._id !== pid),
			}));
			return { success: true, message: data.message };
		} catch (error) {
			console.error("Delete error:", error);
			return { success: false, message: "Server error while deleting product." };
		}
	},

	updateProduct: async (pid, updatedProduct) => {
		try {
			const res = await fetch(`${BACKEND_URL}/api/products/${pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProduct),
			});
			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };

			set((state) => ({
				products: state.products.map((product) =>
					product._id === pid ? data.data : product
				),
			}));
			return { success: true, message: data.message };
		} catch (error) {
			console.error("Update error:", error);
			return { success: false, message: "Server error while updating product." };
		}
	},
}));
