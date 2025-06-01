<script setup lang="ts">
import {LayoutDashboard,TextSearch,ShoppingCart, Users, NotebookPen, NotepadText, Facebook, Instagram, Linkedin, Github} from 'lucide-vue-next';
import {ref,onMounted,onUnmounted} from 'vue';

const hamburgerIsActive = ref<boolean>(false);

const navrbarFixed = ref<boolean>(false);
const handleScroll = () => {
  navrbarFixed.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>

<!--  Header Start-->
  <header class="flex items-center bg-transparent absolute z-10 w-full top-0 left-0" :class="{'navbar-fixed':navrbarFixed}">
    <div class="container">
      <div class="flex items-center justify-between relative py-3 lg:mx-16">
        <a href="#beranda">
          <div class="flex items-center gap-2 mt-4 ">
            <div class="w-8 h-8 rounded-full border border-1 border-black">
              <img src="../../../public/images/kasirin.png" alt="Kasirin Logo">
            </div>
            <h6 class="font-bold text-md">KASIRIN.ME</h6>
          </div>
        </a>

        <div class="flex items-center  ">
          <button @click="hamburgerIsActive=!hamburgerIsActive"  type="button" :class="{'hamburger-active':hamburgerIsActive}" class=" block bg-[#D2FF72] absolute p-1 rounded-md border border-3 border-[#5c7326] right-4 shadow-[4px_4px_0_rgb(92,115,38)] lg:hidden">
            <span class="justify-center hamburger-line transition duration-300 ease-in-out origin-top-left"></span>
            <span class="hamburger-line transition duration-300 ease-in-out"></span>
            <span class="hamburger-line transition duration-300 ease-in-out origin-bottom-left"></span>
          </button>
          <nav id="nav-menu" class="absolute right-4 top-16 bg-white rounded-md shadow-lg border border-gray-200 p-4 z-50 lg:static lg:bg-transparent lg:w-full lg:shadow-none lg:rounded-none lg:border-none lg:block" :class=" [hamburgerIsActive ? 'block' : 'hidden']">
            <ul class="block lg:flex ">
              <li class="group">
                <a href="#beranda" class=" px-4 py-2 text-gray-800 group-hover:bg-gray group-hover:text-green-600 rounded flex  ">Beranda</a>
              </li>
              <li class="group">
                <a href="#fitur" class=" px-4 py-2 text-gray-800 group-hover:bg-gray group-hover:text-green-600 rounded flex ">Fitur</a>
              </li>
              <li class="group">
                <a href="#cuplikan" class=" px-4 py-2 text-gray-800 group-hover:bg-gray group-hover:text-green-600 rounded flex">Cuplikan</a>
              </li>
              <li class="group">
                <a href="#penggunaan" class=" px-4 py-2 text-gray-800 group-hover:bg-gray group-hover:text-green-600 rounded flex">Cara Penggunaan</a>
              </li>
              <li class="group">
                <a href="#kasirin" class=" px-4 py-2 text-gray-800 group-hover:bg-gray group-hover:text-green-600 rounded flex">Kenapa Kasirin?</a>
              </li>
              <li class="group lg:ml-4 mt-2 lg:mt-0">
                <div class="relative h-8 w-24 bg-black">
                  <a
                      href="/login"
                      class="absolute -left-1 bg-[#D2FF72]  -top-1 flex h-full w-full items-center justify-center text-xs font-semibold border border-black  transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    Login
                  </a>
                </div>
              </li>

            </ul>
          </nav>
        </div>

      </div>
    </div>
  </header>
<!--  Header End-->

<!--Hero Section Start-->
  <section id="beranda" class="pt-30 ">
    <div class="container ">
      <div class="flex flex-wrap lg:mx-16 ">
        <div class="w-full self-end px-6 lg:w-1/2 lg:order-last  md:w-1/2 md:order-last ">
          <div class="mb-10">
            <img src="../../../public/images/hero.png " alt="Hero Kasirin.me" class="max-w-full mx-auto">
          </div>
        </div>
        <div class="w-full self-center px-4 lg:w-1/2 md:w-1/2 ">
          <h3 class="text-xl  font-medium lg:text-2xl lg:w-xs md:w-full md:text-xl">Kelola Bisnis Lebih Mudah dengan Aplikasi POS Gratis</h3>
          <h1 class="text-3xl  font-bold my-8 lg:text-4xl md:w-full md:text-3xl ">Sales with Ease, Grow with Peace with <span class="text-[#00995E]">Kasirin.me</span></h1>
          <h3 class="text-lg  font-medium lg:text-2xl lg:w-md md:text-lg md:w-sm ">Aplikasi kasir berbasis web untuk UMKM, warung, kafe, dan toko. Tanpa instalasi, tanpa biaya, bisa langsung dipakai!</h3>
          <div class="flex flex-wrap gap-4 my-6 lg:flex">
            <div class="relative h-8 w-full bg-black lg:w-1/3 md:w-1/2">
              <a href="/register" class="  font-semibold absolute -left-1 bg-[#D2FF72]  -top-1 flex h-full w-full items-center justify-center gap-3 border border-black p-2 text-xs transition-all
              duration-200 hover:-left-0 hover:-top-0 hover:bg-[#D2FF72]  lg:cursor-pointer rounded-xs ">Daftar Sekarang</a>
            </div>
            <div class="relative h-8 w-full bg-black lg:w-1/4 md:w-1/3">
              <a href="mailto:naufalazizi.me@gmail.com" class="  font-semibold absolute -left-1 bg-white  -top-1 flex h-full w-full items-center justify-center gap-3 border border-black p-2 text-xs transition-all duration-200 hover:-left-0 hover:-top-0 hover:bg-white  lg:cursor-pointer rounded-xs "> Kontak</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
<!-- Hero Section End -->

<!--  Features Section Start-->
  <section id="fitur" class="pt-18 pb-10 bg-gray-100 ">
    <div class="container">
      <div class="flex flex-col lg:mx-18">
        <div class="text-center flex flex-col gap-2">
          <h2 class="text-3xl  font-bold"> Fitur Utama</h2>
          <h3 class="text-2xl  font-bold"> Yang Kamu Butuhkan, Ada di Satu Tempat</h3>
        </div>
        <div class="grid grid-cols-1 my-8 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            <div class="w-full bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-md shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-12 h-12 rounded-full bg-[#D2FF72] flex border border-1 border-black">
               <LayoutDashboard class="m-auto " />
            </span>
              <h5 class=" font-bold text-lg">Dashboard</h5>
              <h6 class=" font-medium text-md">Lihat ringkasan penjualan harian
                dan mingguan dalam satu tampilan
                yang sederhana.
              </h6>
            </div>

          <div class="w-full bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-md shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-12 h-12 rounded-full bg-[#FB7DA8] flex border border-1 border-black">
               <TextSearch class="m-auto "/>
            </span>
            <h5 class=" font-bold text-lg">Manajemen Produk & Kategori</h5>
            <h6 class=" font-medium text-md">Tambah, edit, dan atur produk
              serta kategori sesuai kebutuhan
              tokomu.
            </h6>
          </div>

          <div class="w-full bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-md shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-12 h-12 rounded-full bg-[#69D2E7] flex border border-1 border-black">
              <ShoppingCart class="m-auto " />
            </span>
            <h5 class=" font-bold text-lg">Transaksi & Keranjang</h5>
            <h6 class=" font-medium text-md">Selesaikan penjualan dengan cepat
              menggunakan fitur kasir yang mudah
              digunakan.
            </h6>
          </div>

          <div class="w-full bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-md shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-12 h-12 rounded-full bg-[#FF01F6] flex border border-1 border-black">
              <Users class="m-auto " />
            </span>
            <h5 class=" font-bold text-lg">Data Pelanggan</h5>
            <h6 class=" font-medium text-md">Simpan dan kelola data pelanggan
              untuk kebutuhan bisnismu.
            </h6>
          </div>

          <div class="w-full bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-md shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-12 h-12 rounded-full bg-[#FFEC00] flex border border-1 border-black">
             <NotebookPen class="m-auto " />
            </span>
            <h5 class=" font-bold text-lg">Cetak Transaksi</h5>
            <h6 class=" font-medium text-md">Berikan bukti transaksi dengan
              fitur cetak langsung.
            </h6>
          </div>

          <div class="w-full bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-md shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-12 h-12 rounded-full bg-[#FFA07A] flex border border-1 border-black">
              <NotepadText class="m-auto " />
            </span>
            <h5 class=" font-bold text-lg">Laporan Penjualan & Keuntungan</h5>
            <h6 class=" font-medium text-md">Pantau performa bisnis dengan laporan
              yang jelas dan rapi.
            </h6>
          </div>



        </div>
      </div>
    </div>
  </section>
<!--  Features Section End-->

<!--  Highlight Section Start-->
  <section id="cuplikan" class="pt-8 pb-28 bg-white overflow-x-hidden">
    <div class="container">
      <div class="flex flex-col lg:mx-18">
        <div class="text-center flex flex-col gap-2 mb-6">
          <h2 class=" text-3xl font-bold">Intip Tampilan Aplikasinya</h2>
          <h3 class="text-xl font-bold">Beberapa tampilan fitur-fitur utama aplikasi POS kami yang ramah digunakan oleh siapapun</h3>
        </div>

        <div class="grid grid-col-1 gap-8">
          <div class=" flex max-w-full  bg-white pl-4 pt-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(0,0,0)]  ">
            <div class="flex flex-col justify-center gap-2 w-1/2 ">
              <h3 class="text-xl font-bold lg:text-3xl">Dashboard</h3>
              <p class=" text-sm font-medium lg:text-2xl">Lihat ringkasan penjualan harian
                dan mingguan dalam satu tampilan
                yang sederhana.</p>
            </div>
            <div class="w-1/2">
              <img src="../../../public/images/fitur/dashboard.png" alt="Fitur Transaksi" class=" ">
            </div>
          </div>

          <div class=" flex max-w-full  bg-white pl-4 pt-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(0,0,0)]  ">
            <div class="flex flex-col justify-center gap-2 w-1/2 ">
              <h3 class="text-xl font-bold lg:text-3xl">Transaksi</h3>
              <p class=" text-sm font-medium lg:text-2xl">Catat dan cetak transaksi dalam
                satu kali klik.</p>
            </div>
            <div class="w-1/2">
              <img src="../../../public/images/fitur/fitur-transaksi.png" alt="Fitur Transaksi" class=" ">
            </div>
          </div>

          <div class=" flex max-w-full  bg-white pl-4 pt-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(0,0,0)]  ">
            <div class="flex flex-col justify-center gap-2 w-1/2 ">
              <h3 class="text-xl font-bold lg:3xl">Laporan</h3>
              <p class=" text-sm font-medium lg:2xl">Lihat catatan penjualan dan catatan
                keuntungan yang diperoleh.</p>
            </div>
            <div class="w-1/2">
              <img src="../../../public/images/fitur/fitur-laporan.png" alt="Fitur Laporan" class=" ">
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
<!--  Highlight Section End-->

<!--  Section Cara Penggunaan Start-->
  <section id="penggunaan" class="pt-10 pb-18 bg-gray-100 overflow-x-hidden">
    <div class="container">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2 text-center justify-center mb-10">
          <h2 class="font-bold text-2xl lg:3xl">Mulai Dalam Hitungan Menit</h2>
          <h3 class="font-bold text-xl lg:2xl">Mulai Kelola Penjualan Kamu Dengan Mudah dan Cepat</h3>
        </div>

        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2 mx-4 lg:mx-18">
          <div class="w-full  relative">
            <div class="bg-[#69D2E7] absolute -top-4 -left-4 w-full h-full rounded-sm z-0"></div>
            <div class="w-full relative bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-10 h-10 rounded-full bg-[#000] flex border border-1 border-black justify-center items-center">
               <h1 class="font-bold text-white text-2xl ">1</h1>
            </span>
              <h5 class=" font-bold text-lg">Daftar Gratis</h5>
              <h6 class=" font-medium text-md">Daftar akun secara gratis menggunakan
                email kamu, cukup isi Nama Usaha, Email,
                dan Password.
              </h6>
            </div>
          </div>

          <div class="w-full  relative">
            <div class="bg-[#E3A018] absolute -top-4 -left-4 w-full h-full rounded-sm z-0"></div>
            <div class="w-full h-full relative bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-10 h-10 rounded-full bg-[#000] flex border border-1 border-black justify-center items-center">
               <h1 class="font-bold text-white text-2xl ">2</h1>
            </span>
              <h5 class=" font-bold text-lg">Tambah Produk & Kategori</h5>
              <h6 class=" font-medium text-md">Tambahkan kategori produk, nama barang,
                dan harganya.
              </h6>
            </div>
          </div>

          <div class="w-full  relative">
            <div class="bg-[#FB7DA8] absolute -top-4 -left-4 w-full h-full rounded-sm z-0"></div>
            <div class="w-full h-full relative bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-10 h-10 rounded-full bg-[#000] flex border border-1 border-black justify-center items-center">
               <h1 class="font-bold text-white text-2xl ">3</h1>
            </span>
              <h5 class=" font-bold text-lg">Mulai Transaksi</h5>
              <h6 class=" font-medium text-md">Gunakan fitur tambahkan barang ke keranjang
                dan cetak transaksi.
              </h6>
            </div>
          </div>

          <div class="w-full  relative">
            <div class="bg-[#D2FF72] absolute -top-4 -left-4 w-full h-full rounded-sm z-0"></div>
            <div class="w-full relative bg-white gap-2 flex flex-col p-4 border border-1 border-[#BBBBBB] rounded-sm shadow-[5px_7px_0_rgb(187,187,187)]">
            <span class="w-10 h-10 rounded-full bg-[#000] flex border border-1 border-black justify-center items-center">
               <h1 class="font-bold text-white text-2xl ">4</h1>
            </span>
              <h5 class=" font-bold text-lg">Pantau Laporan</h5>
              <h6 class=" font-medium text-md">Lihat total penjualan & keuntungan harian
                dan mingguan.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- Section  Cara Penggunaan End-->

<!--  Section Kasirin Start-->
  <section id="kasirin" class="pt-18 pb-22 overflow-x-hidden ">
    <div class="container">
      <div class="w-full lg:p-10">
        <div class=" bg-[#D2FF72] p-2 w-full border border-black border-1 rounded-sm shadow-[5px_7px_0_rgb(0,0,0)]">
          <div class="text-center text-black font-bold text-xl my-6 md:text-2xl lg:text-3xl">
            <h1>Kenapa harus Pakai Apliaksi POS Ini?</h1>
          </div>
          <div class="flex gap-2 items-center p-2">
            <div class="w-1/2">
              <img src="../../../public/images/img-section-kasirin.png" alt="People IMG">
            </div>
            <div class="w-1/2 flex flex-col gap-4  justify-center  md:gap-8 md:items-center ">
              <h3 class="font-semibold text-sm md:text-xl lg:text-2xl ">100% gratis tanpa biaya</h3>
              <h3 class="font-semibold text-sm md:text-xl lg:text-2xl">Berbasis web, akses dari mana saja</h3>
              <h3 class="font-semibold text-sm md:text-xl lg:text-2xl">Cepat, ringan, & mudah digunakan</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
<!--  Section Kasirin End-->

<!--  Footer Start-->
  <footer class="bg-black pt-18 pb-12">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div class="col-span-2 lg:col-span-1 md:col-span-3">
          <div class="flex flex-col gap-2">
            <div class="flex gap-2 items-center">
              <div class="w-8 h-8 rounded-full border border-1 border-black">
                <img src="../../../public/images/kasirin.png" alt="Kasirin Logo">
              </div>
              <h6 class="font-bold text-sm text-white">KASIRIN.ME</h6>
            </div>
            <div>
              <p class="text-white text-xs ">Sebuah platform didekasikan untuk para pelaku usaha yang membutuhkan aplikasi POS</p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-white text-lg font-bold ">Tautan</h3>
          <a href="#beranda" class="text-gray-400 text-xs block hover:text-white">Beranda</a>
          <a href="#fitur" class="text-gray-400 text-xs block hover:text-white">Fitur</a>
          <a href="#cuplikan" class="text-gray-400 text-xs block hover:text-white">Cuplikan</a>
          <a href="#penggunaan" class="text-gray-400 text-xs block hover:text-white">Cara Penggunaan</a>
          <a href="#kasirin" class="text-gray-400 text-xs block hover:text-white">Kenapa kasirin?</a>
        </div>
        <div>
          <h3 class="text-white text-lg font-bold">Perusahaan</h3>
          <a href="#beranda" class="text-gray-400 text-xs hover:text-white">Tentang Kami</a>
        </div>
        <div>
          <h3 class="text-white text-lg font-bold">Alamat</h3>
          <p class="text-gray-400 text-xs">Pasir Wetan RT 1 RW 2, Karanglewas, Banyumas, Jawa Tengah</p>
          <p class="text-gray-400 text-xs">Kampus: Universitas Jenderal Soedirman, Teknik, Informatika</p>
        </div>
      </div>
      <hr class="my-6">
      <div class="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between lg:flex-row lg:justify-between ">
        <p class="text-gray-400 text-xs ">© 2025 kasirin.me. All rights reserved</p>
        <a href="https://github.com/Taufik-H" target="_blank" rel="noopener noreferrer" class="text-gray-400 text-xs hover:text-white">This style is inspired by Taufik Hidayatulloh</a>
        <div class="flex gap-4">
          <a href="https://www.facebook.com/naufal.azizi.378/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
            <Facebook class="w-4 h-4" />
          </a>
          <a href="https://www.instagram.com/naufal_azizii/" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
            <Instagram class="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/naufal-azizi" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
            <Linkedin class="w-4 h-4"/>
          </a>
          <a href="https://github.com/azizinaufal" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white">
            <Github class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
<!--  Footer End-->
</template>

<style scoped>


.hamburger-active > span:nth-child(1) {
  @apply  rotate-45
}
.hamburger-active > span:nth-child(2) {
  @apply scale-0
}
.hamburger-active > span:nth-child(3) {
  @apply  -rotate-45
}

</style>