const routers = [
    {
        path: '/',
        meta: {
            title: 'login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    }
];
export default routers;