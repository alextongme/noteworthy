// our ajax calls to our backend routes
export const signup = (user) => {
    // debugger
    return $.ajax({
        method: 'POST',
        url: '/api/user',
        data: { user }
    })
};

export const login = (user) => (
    $.ajax({
        method: 'POST',
        url: '/api/session',
        data: { user }
    })
);
  
  export const logout = () => (
    $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
);
  