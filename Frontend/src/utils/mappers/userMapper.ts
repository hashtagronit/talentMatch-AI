export const userMapper = (user: any) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email
    }
}