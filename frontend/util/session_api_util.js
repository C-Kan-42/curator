export const postUser = user => (
    $.ajax({
        url: 'api/users',
        method: 'POST',
        data: { user }
    })
);

export const createDemoUser = () => (
    $.ajax({
        url: 'api/users',
        method: 'POST',
        data: {
            user: {
                email: `demo-user-${Math.floor(Math.random() * 1000000)}-${Math.floor(Math.random() * 1000000)}@demo.com`,
                name: 'Demo User',
                password: `password`
            }
        }
    })
);

export const postSession = user => (
    $.ajax({
        url: 'api/session',
        method: 'POST',
        data: { user }
    })
);

export const deleteSession = () => (
    $.ajax({
        url: 'api/session',
        method: 'DELETE'
    })
);  