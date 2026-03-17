import { UserModel } from "../models/user.model";

export class UserService {
    static getUsers(): UserModel[] {
        if (!localStorage.getItem('icr_users')) {
            localStorage.setItem('icr_users', JSON.stringify([
                {
                    firstName: 'User',
                    lastName: 'Example',
                    email: 'user@example.com',
                    phone: "+381695158500",
                    password: 'user123',
                    data: []
                }
            ]))
        }
        return JSON.parse(localStorage.getItem('icr_users')!)

    }

    static findUserByEmail(email: string) {
        const users = this.getUsers()
        const selectedUser = users.find(u => u.email === email)

        if (!selectedUser)
            throw new Error('USER_NOT_FOUND')

        return selectedUser
    }
    static login(email: string, password: string) {
        try {
            const user = this.findUserByEmail(email)
            return user.password === password

        }
        catch {
            return false
        }
    }
}