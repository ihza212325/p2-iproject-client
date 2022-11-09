import { defineStore } from "pinia";
import axios from "../apis/axios";

export const useClientStore = defineStore("client", {
  state: () => {
    return {
      isLogin: false,
      products: [],
      datasInCart: [],
      totalAllPriceInCart: 0,
      totalProductInCart: 0,
    };
  },
  actions: {
    sweetAlert(icon, title) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: icon,
        title: title,
      });
    },
    async fetchProductInCart() {
      const { data } = await axios.get("/cart", {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      this.totalAllPriceInCart = 0;
      data.forEach((e) => {
        this.totalAllPriceInCart += e.price;
      });
      this.totalProductInCart = data.length;
      console.log(this.totalAllPriceInCart);
      this.datasInCart = data;
      console.log(data);
    },
    async fetchDataProduct(page, search) {
      try {
        console.log("ihza");
        let find = "";
        let pages = 0;
        if (search) {
          find = search;
        }
        if (page) {
          pages = page - 1;
        }
        console.log(pages);
        const { data } = await axios.get(
          `/products?page=${pages}&search=${find}`
        );
        this.products = data;
        // console.log(this.movies);
        this.router.push({
          name: "home",
          query: { page: `${pages + 1}` },
        }),
          console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async register(email, password) {
      try {
        // console.log("ihzaaaasss");
        // console.log(payload);
        const { data } = await axios.post(`/register`, {
          email,
          password,
        });
        console.log("berhasil daftar");
        this.router.push({ name: "login" });
        this.sweetAlert("success", `Register successfully`);
      } catch (err) {
        // console.log(err);

        this.sweetAlert("error", `${err.response.data.msg[0]}`);
      }
    },
    async updateQuantity(quantity, ProductId) {
      try {
        console.log(quantity, ProductId);
        const { data } = await axios.post(
          `/cart/${ProductId}`,
          { quantity },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        console.log(data);
        console.log("berhasil tambah dari cart");
        this.fetchProductInCart();
        this.router.push({ name: "cart" });
      } catch (err) {
        console.log(err);
      }
    },
    async addQuantity(quantity, ProductId) {
      try {
        console.log("adammm");
        console.log(quantity, ProductId);
        const { data } = await axios.post(
          `/cart/${ProductId}`,
          { quantity },
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        console.log(data);

        console.log("berhasil tambah dari dashboard");
        // this.fetchProductInCart();
        // this.router.push({ name: "cart" });
      } catch (err) {
        console.log(err);
      }
    },
    async login(email, password) {
      // console.log(email, password);
      console.log("ihza");
      try {
        const { data } = await axios.post("/login", {
          email,
          password,
        });
        // console.log("ihzzza");
        console.log(data);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username);
        // console.log(data);
        this.isLogin = true;
        this.router.push({ name: "home" });
        this.sweetAlert("success", `Success Login`);
      } catch (err) {
        console.log(err);
        this.sweetAlert("error", `${err.response.data.msg}`);
      }
    },
    async deleteFromCart(ProductId) {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
    },
    async logout() {
      localStorage.clear();
      this.isLogin = false;
      this.router.push({ name: "login" });
      this.sweetAlert("success", `Log Out Successfully`);
    },
  },
});
