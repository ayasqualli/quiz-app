<template>
    <div class="profile-view">
      <UserProfile />
    </div>
  </template>
  
  <script>
  import UserProfile from "@/components/UserProfile.vue";
  
  export default {
    name: "Profile",
    components: {
      UserProfile
    }
  };
  </script>
  