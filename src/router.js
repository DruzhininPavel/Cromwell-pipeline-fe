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
const BoardUser = () => import("./components/BoardUser.vue")
const BoardProjects = () => import("./components/BoardProjects.vue")
const ValidateFile = () => import("./components/configurationFiles/ValidateFile.vue")
const UploadFile = () => import("./components/configurationFiles/UploadFile.vue")
const ConfigureFile = () => import("./components/configurationFiles/ConfigureFile.vue")
const ProjectFiles = () => import("./components/configurationFiles/Files.vue")
const ProjectFile = () => import("./components/configurationFiles/File.vue")

const routes = [
  {
    path: "/",
    name: "home",
    meta: {layout: 'main', auth: true},
    component: Home,
  },
  {
    path: "/home",
    meta: {layout: 'main', auth: true},
    component: Home,
  },
  {
    path: "/login",
    meta: {layout: 'empty'},
    component: Login,
  },
  {
    path: "/register",
    meta: {layout: 'empty'},
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/profile/edit",
    name: "edit-profile",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: EditProfile,
  },
  {
    path: "/profile/password",
    name: "edit-password",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ChangePassword,
  },
  {
    path: "/projects/:projectId/configuration",
    name: "configuration",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ConfigurationDetail,
  },
  {
    path: "/projects/:projectId",
    name: "project",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ProjectDetails,
  },
  {
    path: "/projects/:projectId/edit",
    name: "project-edit",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ProjectEditName,
  },
  {
    path: "/projects/add",
    name: "projects-add",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ProjectAdd,
  },
  {
    path: "/projects",
    name: "projects",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: BoardProjects,
  },
  {
    path: "/users",
    name: "users",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: BoardUser,
  },
  {
    path: "/files/validate",
    name: "validate-file",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ValidateFile,
  },
  {
    path: "/projects/:projectId/files/upload",
    name: "upload-file",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: UploadFile,
  },
  {
    path: "/projects/:projectId/files/configure/:path",
    name: "configure-file",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ConfigureFile,
  },
  {
    path: "/projects/:projectId/files",
    name: "project-files",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ProjectFiles,
  },
  {
    path: "/projects/:projectId/files/:path",
    name: "project-file",
    meta: {layout: 'main', auth: true},
    // lazy-loaded
    component: ProjectFile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
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