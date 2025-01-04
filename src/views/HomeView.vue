<script>
import NavBarComponent from "@/components/general/NavBarComponent.vue";

export default {
  name: "HomeView",
  components: {
    NavBarComponent


  }
}
</script>

<template>
  <div class="flex flex-col justify-center content-center">
    <!--    navbar-->
    <nav-bar-component/>
    <!--    scene 1 -->
    <div class="grid md:px-6 laptop:grid-cols-2 md:py-6 laptop:pt-32">

      <div class="laptop:pl-32  flex flex-col justify-center">
        <div class="w-full">
          <p class="font-bold laptop:text-5xl md:text-lg">Connect and Simplify Your Real Estate Needs in One Link</p>
        </div>
        <div class="col-span-2 pt-2.5 laptop:w-[390px] md:w-full">
          <p class="laptop:text-xs md:text-[12px] text-black">Join countless realtors using ProplinX to centralize their
            online presence.
            One link to showcase all your listings, social media profiles, client testimonials, and contact
            information.</p>
        </div>
        <div class="flex flex-row mt-3">
          <div class="border-2 border-black rounded-lg p-2.5">
            <p class="text-black font-bold">proplinx/username</p>
          </div>
          <router-link to="/user/sign-up">
            <div class="border-2 border-black bg-black rounded-3xl ml-3 pl-5 pr-5 pt-2.5 pb-2.5 ">
              <p class="text-white">Create your now</p>
            </div>
          </router-link>
        </div>
      </div>

      <div class="w-full">
        <img src="./../assets/scene1.png" alt="">
      </div>
    </div>
    <!--    scene 2-->

    <div class="grid laptop:grid-cols-2  laptop:h-[800px] laptop:py-24 md:pt-6 bg-indigo-50">
      <div class="laptop:px-12 md:px-4 laptop:w-full">
        <img src="./../assets/scene2.png" alt="">
      </div>

      <div class="laptop:px-12 md:px-4 w-full flex flex-col content-center justify-center">
        <div class=" w-full">
          <p class="font-bold laptop:text-5xl md:text-lg">Create and Customize Your Realtor Hub in Minutes</p>
        </div>
        <div class="w-full">
          <p class="pt-2.5 laptop:text-sm md:text-[12px] text-black">Connect your property listings, social media
            profiles, website,
            contact info, client testimonials, virtual tours, and more. It all comes together in a single, sleek landing
            page designed to convert potential clients.</p>
        </div>
        <div class="mt-3">
          <router-link to="/user/sign-up">
            <div
                class="flex content-center justify-center border-2 border-black bg-black w-full rounded-3xl px-5 py-2.5 ">
              <p class="text-white">Create yours now</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!--    scene3-->
    <div class="grid laptop:grid-cols-2 md:px-6 laptop:py-28 md:py-16">
      <div class="laptop:px-16 flex flex-col justify-center">
        <div class="w-full">
          <p class="font-bold laptop:text-5xl md:text-lg">Connect Your Listings to Major Platforms</p>
        </div>
        <div class="col-span-2 w-full">
          <p class="text-xs pt-4 text-black">Add your unique Hub URL to your Zillow, Redfin, and LoopNet profiles. Use
            your personalized QR code to drive offline traffic directly to your property listings across these major
            real estate platforms.</p>
        </div>
        <div class="flex flex-row mt-3">
          <router-link to="/user/sign-up">
            <div class="border-2 border-black bg-black rounded-3xl pl-5 pr-5 pt-2.5 pb-2.5 ">
              <p class="text-white">Create yours now</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class=" laptop:px-16  w-full">
        <img src="./../assets/scene3.png" alt="">
      </div>

    </div>
    <!--    scene4-->
    <div class="grid laptop:grid-cols-2 bg-indigo-50">
      <div class=" w-full">
        <img src="./../assets/scene4.png" alt="">
      </div>
      <div class="laptop:px-14 md:px-6 w-full flex flex-col md:pt-6 content-center justify-center">
        <div class="w-full font-bold laptop:text-5xl md:text-lg">
          <p class="inline">Join top real estate professionals on Proplin</p>
          <p class="inline text-red-700">X</p>
          <p class="inline">.</p>
        </div>
        <div class="w-full">
          <p class="pt-2.5 text-xs text-black">Add your unique Hub URL to your Zillow, Redfin, and LoopNet profiles. Use
            your personalized QR code to drive offline traffic directly to your property listings across these major
            real estate platforms.</p>
        </div>
        <div class="mt-3">
          <router-link to="/user/sign-up">
            <div
                class="flex content-center justify-center border-2 border-black bg-black w-full rounded-3xl px-5 py-2.5">
              <p class="text-white">Create yours now</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>