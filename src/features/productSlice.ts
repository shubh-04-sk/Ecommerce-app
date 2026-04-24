import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCTS_PER_PAGE = 9;

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ProductsState = {
  list: Product[];
  loading: boolean;
  error: string;
  currentPage: number;
  total: number;
  limit: number;
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (page: number = 1) => {
    const skip = (page - 1) * PRODUCTS_PER_PAGE;
    const res = await axios.get<ProductsResponse>(
      `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
    );

    return {
      ...res.data,
      currentPage: page,
    };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    error: "",
    currentPage: 1,
    total: 0,
    limit: PRODUCTS_PER_PAGE,
  } as ProductsState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload.products;
      state.total = action.payload.total;
      state.limit = action.payload.limit;
      state.currentPage = action.payload.currentPage;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to load products.";
    });
  },
});

export const { setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
