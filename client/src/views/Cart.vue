<script>
import { mapActions, mapState } from "pinia";
import Card from "../components/Card.vue";
import { useClientStore } from "../stores/client";

export default {
  name: "Cart",
  data() {
    return {
      // totalPriceAll: 0,
      totalPriceInCart: 0,
    };
  },
  components: { Card },
  computed: {
    ...mapState(useClientStore, ["datasInCart", "totalAllPriceInCart"]),
  },
  methods: {
    ...mapActions(useClientStore, ["fetchProductInCart", "updateQuantity"]),
  },
  async created() {
    await this.fetchProductInCart();
  },
};
</script>

<template>
  <section id="dashboard" class="p-8 bg-gray-100 w-100">
    <h1>CART</h1>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">Product name</th>
            <th scope="col" class="py-3 px-6">Harga Satuan</th>
            <th scope="col" class="py-3 px-6">Kuantitas</th>
            <th scope="col" class="py-3 px-6">Total Harga</th>
            <th scope="col" class="py-3 px-6">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in datasInCart"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-1/2"
          >
            <td class="p-5 flex flex-row">
              <img class="w-2/12 rounded" :src="data.Product.imageUrl" alt="" />
              <h1 class="items-center justify-center">
                {{ data.Product.name }}
              </h1>
            </td>

            <td class="py-4 px-6">Rp.{{ data.Product.price }}</td>
            <td class="py-4 px-6 flex felx-row">
              <button
                class="p-4 border border-orange-600"
                @click.prevent="
                  updateQuantity(data.quantity - 1, data.Product.id)
                "
              >
                -
              </button>
              <label class="p-4 border border-orange-600">{{
                data.quantity
              }}</label>
              <button
                class="p-4 border border-orange-600"
                @click.prevent="
                  updateQuantity(data.quantity + 1, data.Product.id)
                "
              >
                +
              </button>
            </td>
            <td class="py-4 px-6">
              Rp. {{ data.Product.price * data.quantity }}
            </td>
            <td class="py-4 px-6">
              <a
                href="#"
                class="font-medium text-red-600 dark:text-blue-500 hover:underline"
              >
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-full sticky bottom-0 bg-white">
      <div
        class="border rounded overflow-hidden flex flex-row justify-between h-6/12 p-4"
      >
        <h1>Total Harga</h1>
        <div class="flex flex-row w-3/12">
          <p class="justify-center items-center text-center">
            Rp.{{ totalAllPriceInCart }}
          </p>
          <button
            class="p-3 w-full border-none border-slate-300 rounded-sm mt-3 text-neutral-50 bg-orange-500 hover:bg-orange-600"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
