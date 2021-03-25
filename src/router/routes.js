const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () =>
                    import ('pages/Index.vue') },
            { path: '/todo/create', component: () =>
                    import ('pages/CreateTodo.vue') },
            { path: '/note/create', component: () =>
                    import ('pages/CreateNote.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes
