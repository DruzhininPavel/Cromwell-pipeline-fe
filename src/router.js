import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import AuthService from "./services/auth.service"
// lazy-loaded
const Home = () => import("./components/Home.vue")
const ProjectDetails = () => import("./components/projects/ProjectDetails.vue")
const Profile = () => import("./components/profile/Profile.vue")
const EditProfile = () => import("./components/profile/EditProfile.vue")
const ChangePassword = () => import("./components/profile/ChangePassword.vue")
const ConfigurationDetail = () => import("./components/projectConfiguration/ConfigurationDetail.vue")
const ProjectAdd = () => import("./components/projects/ProjectAdd.vue")
const ProjectEditName = () => import("./components/projects/ProjectEditName.vue")
const BoardProjects = () => import("./components/BoardProjects.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const ValidateFile = () => import("./components/configurationFiles/ValidateFile.vue")
const UploadFile = () => import("./components/configurationFiles/UploadFile.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/profile/edit",
    name: "edit-profile",
    // lazy-loaded
    component: EditProfile,
  },
  {
    path: "/profile/password",
    name: "edit-password",
    // lazy-loaded
    component: ChangePassword,
  },
  {
    path: "/projects/:projectId/configuration",
    name: "configuration",
    // lazy-loaded
    component: ConfigurationDetail,
  },
  {
    path: "/projects/:projectId",
    name: "project",
    // lazy-loaded
    component: ProjectDetails,
  },
  {
    path: "/projects/:projectId/edit",
    name: "project-edit",
    // lazy-loaded
    component: ProjectEditName,
  },
  {
    path: "/projects/add",
    name: "projects-add",
    // lazy-loaded
    component: ProjectAdd,
  },
  {
    path: "/projects",
    name: "projects",
    // lazy-loaded
    component: BoardProjects,
  },
  {
    path: "/users",
    name: "users",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/files/validate",
    name: "validate-file",
    // lazy-loaded
    component: ValidateFile,
  },
  {
    path: "/projects/:projectId/files/upload",
    name: "upload-file",
    // lazy-loaded
    component: UploadFile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register' ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else if(authRequired && loggedIn && JSON.parse(loggedIn).tokenExpiration < (Date.now()/1000)){
      AuthService.refreshToken();
    }
    next();
  });

export default router;